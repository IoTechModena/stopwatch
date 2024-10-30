using backend.Data;
using backend.Models;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using System.Globalization;
using System.Net.Http.Headers;
using System.Text;
using System.Diagnostics;
using FluentValidation.AspNetCore;

namespace backend.Controllers.Recordings.Save;

[ApiController]
[Route("recordings/save/{chnid}")]
[Tags("Recordings")]
public class SaveRecordingsController(
    IConfiguration _configuration,
    DataContext _context,
    SaveRecordingsRequestValidator _validator
) : ControllerBase
{
    private static bool isBusy;
    private readonly string ip = "151.78.228.229";
    private readonly string retryTime = "60";
    private readonly string relativeFilePath = $"./public/videos/";
    private readonly IConfiguration configuration = _configuration;
    private readonly DataContext context = _context;
    private readonly SaveRecordingsRequestValidator validator = _validator;

    [HttpPost]
    [ProducesResponseType(200)]
    [ProducesResponseType(400)]
    [ProducesResponseType(401)]
    [ProducesResponseType(503)]
    public async Task<IActionResult> SaveRecordingsAsync(
        [FromHeader(Name = "X-API-Key")] string apiKey,
        [FromRoute, Required, Range(0, 1)] byte chnid,
        [FromQuery] SaveRecordingsRequest request,
        CancellationToken cancellationToken
    )
    {
        if (!apiKey.Equals(configuration["API_KEY"]))
            return Unauthorized();

        var validationResult = await validator.ValidateAsync(request, cancellationToken);
        validationResult.AddToModelState(ModelState);

        if (!ModelState.IsValid)
            return ValidationProblem();

        if (isBusy)
            return ServiceBusy();

        isBusy = true;

        try
        {
            var recordingsInfo = await GetRecordingsInfoAsync(chnid, request, cancellationToken);

            if (recordingsInfo is null)
                return ServiceUnavailable("The NVR is unreachable.");

            if (recordingsInfo.Count == 0)
                return ServiceUnavailable("The NVR response is not valid.");

            byte cnt = byte.Parse(recordingsInfo["cnt"]);
            string sid = recordingsInfo["sid"];

            Event currEvent = new()
            {
                CameraId = chnid + 1,
                Name = $"Event_{sid}",
                StartDateTime = DateTime.ParseExact(
                    $"{request.StartDate} {request.StartTime}",
                    "yyyy-MM-dd HH:mm:ss",
                    CultureInfo.InvariantCulture
                ).ToUniversalTime(),
                EndDateTime = DateTime.ParseExact(
                    $"{request.EndDate} {request.EndTime}",
                    "yyyy-MM-dd HH:mm:ss",
                    CultureInfo.InvariantCulture
                ).ToUniversalTime(),
            };

            for (int i = 0; i < cnt; i++)
            {
                string cntStartDateTime = recordingsInfo[$"startTime{i}"];
                string cntEndDateTime = recordingsInfo[$"endTime{i}"];
                int expectedSize = int.Parse(recordingsInfo[$"size{i}"]);

                string fileName = $"CAM{chnid + 1}-" +
                    $"{sid}_" +
                    $"{i + 1}.mp4";

                var isDownloadSuccess = await DownloadRecordingProcessAsync(
                    i,
                    cnt,
                    sid,
                    chnid,
                    cntStartDateTime,
                    cntEndDateTime,
                    fileName,
                    expectedSize,
                    cancellationToken
                );

                if (!isDownloadSuccess)
                    return ServiceUnavailable("There was an error while downloading a recording from the NVR.");

                if (i == 0)
                {
                    var isEventSaved = await SaveEventAsync(currEvent, cancellationToken);
                    if (!isEventSaved)
                        return ServiceUnavailable("There was an error while saving the Event.");
                }

                var isRecordingSaved = await SaveRecordingAsync(
                    cntStartDateTime,
                    cntEndDateTime,
                    fileName,
                    currEvent,
                    cancellationToken
                );

                if (!isRecordingSaved)
                    return ServiceUnavailable("There was an error while saving a Recording.");
            }
        }
        finally
        {
            isBusy = false;
        }

        return Ok();
    }

    private async Task<Dictionary<string, string>?> GetRecordingsInfoAsync(
        byte chnid,
        SaveRecordingsRequest p,
        CancellationToken cancellationToken
    )
    {
        Dictionary<string, string> d;
        HttpClient client = new();

        string url = $"http://{ip}/sdk.cgi?action=get.playback.recordinfo&chnid={chnid}&stream=0&startTime={p.StartDate}%20{p.StartTime}&endTime={p.EndDate}%20{p.EndTime}";

        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(
        "Basic", Convert.ToBase64String(Encoding.ASCII.GetBytes(configuration["NVR_CREDENTIALS"]!)));

        try
        {
            var response = await client.GetAsync(url, cancellationToken);
            var content = await response.Content.ReadAsStringAsync(cancellationToken);

            d = ParseResponse(content);

            Console.WriteLine("\nKeys and values of the recordings info response:");
            foreach (var pair in d)
                Console.WriteLine($"{pair.Key}: {pair.Value}");
        }
        catch
        {
            return null;
        }

        if (!d.ContainsKey("sid"))
            d.Clear();

        return d;
    }

    private static Dictionary<string, string> ParseResponse(string response)
    {
        var lines = response.Split(["\r\n", "\r", "\n"], StringSplitOptions.None);
        var values = new Dictionary<string, string>();

        foreach (var line in lines)
        {
            var parts = line.Split('=');
            if (parts.Length == 2)
                values[parts[0]] = parts[1];
        }
        return values;
    }

    private async Task<bool> DownloadRecordingProcessAsync(
        int i,
        byte cnt,
        string sid,
        byte chnid,
        string cntStartDateTime,
        string cntEndDateTime,
        string fileName,
        int expectedSize,
        CancellationToken cancellationToken
    )
    {
        string url = $"http://{ip}/sdk.cgi?action=get.playback.download&chnid={chnid}&sid={sid}&streamType=primary&videoFormat=mp4&streamData=1&startTime={cntStartDateTime}&endTime={cntEndDateTime}"
            .Replace(" ", "%20");

        Console.WriteLine($"\nDownloading video {i + 1} of {cnt}");

        var startInfo = new ProcessStartInfo
        {
            FileName = "curl",
            Arguments = $"--http1.0 --output {relativeFilePath}{fileName} -u {configuration["NVR_CREDENTIALS"]} -v {url}",
            UseShellExecute = false,
        };

        var process = new Process { StartInfo = startInfo };
        process.Start();
        await process.WaitForExitAsync(cancellationToken);

        var fileInfo = new FileInfo($"{relativeFilePath}{fileName}");

        Console.WriteLine($"\n Actual size: {fileInfo.Length} - Expected size: {expectedSize}");

        if (fileInfo.Length < expectedSize)
        {
            fileInfo.Delete();
            return false;
        }

        return true;
    }

    private async Task<bool> SaveEventAsync(Event e, CancellationToken cancellationToken)
    {
        try
        {
            await context.AddAsync(e, cancellationToken);
            await context.SaveChangesAsync(cancellationToken);
        }
        catch
        {
            return false;
        }

        return true;
    }

    private async Task<bool> SaveRecordingAsync(
        string cntStartDateTime,
        string cntEndDateTime,
        string fileName,
        Event e,
        CancellationToken cancellationToken
    )
    {
        Recording recording = new()
        {
            Name = fileName,
            Path = Path.GetFullPath(relativeFilePath + fileName),
            Description = "",
            Size = new FileInfo(relativeFilePath + fileName).Length,
            StartDateTime = DateTime.ParseExact(
                cntStartDateTime,
                "yyyy-MM-dd HH:mm:ss",
                CultureInfo.InvariantCulture
            ).ToUniversalTime(),
            EndDateTime = DateTime.ParseExact(
                cntEndDateTime,
                "yyyy-MM-dd HH:mm:ss",
                CultureInfo.InvariantCulture
            ).ToUniversalTime(),
            Event = e,
        };

        recording.Duration = recording.EndDateTime - recording.StartDateTime;
        e.Recordings!.Add(recording);

        try
        {
            await context.AddAsync(recording, cancellationToken);
            await context.SaveChangesAsync(cancellationToken);
        }
        catch
        {
            return false;
        }

        return true;
    }

    private ObjectResult ServiceBusy()
    {
        Response.Headers.Append("Retry-After", retryTime);
        return StatusCode(503, "Another request is being processed right now.");
    }

    private ObjectResult ServiceUnavailable(string m)
    {
        Response.Headers.Append("Retry-After", retryTime);
        isBusy = false;
        return StatusCode(503, "Service Unavailable: " + m);
    }
}
