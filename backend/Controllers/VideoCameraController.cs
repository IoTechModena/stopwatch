using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Net.Http.Headers;
using System.Text;
using System.Globalization;
using System.Diagnostics;
using Microsoft.AspNetCore.Authorization;
using backend.Models;
using backend.Utility;

namespace backend.Controllers;

[ApiController]
public class VideoCameraController(DataContext context) : ControllerBase
{
    private static bool isBusy;
    private readonly string apiKey = "hnGFNkAHFtB2ubQSaz3whHNgXwN2f4fcT3F3rdjMZ2HCLIGl8dcWBpoKDjx2pAb89lKxubJFdMvIrMLKq84zrweP3qjoztbTFJ0nVuTHzmHsMhiY78LvXxYL2ZLRhSnb";
    private readonly string authenticationString = "admin:mutina23";
    private readonly string ip = "151.78.228.229";
    private readonly string retryTime = "60";
    private readonly string relativeFilePath = $"./public/recordings/";
    private readonly HttpClient client = new();
    private readonly DataContext context = context;

    [HttpPost("saveRecording/{chnid}")]
    public async Task<IActionResult> SaveEventAndRecordings([FromHeader(Name = "Authorization")] string apiKey, [FromRoute, Required, Range(0, 1)] byte chnid, [FromQuery] SaveRecordingParams p)
    {
        bool? apiKeyCheck = CheckApiKey(apiKey);
        if (apiKeyCheck == null)
        {
            return BadRequest("The Authorization header value does not start with 'APIKey '");
        }
        else if (apiKeyCheck == false)
        {
            return Unauthorized();
        }

        if (isBusy)
        {
            return ServiceBusy();
        }

        isBusy = true;
        try
        {
            var recordingsInfo = await GetRecordingsInfo(chnid, p);
            if (recordingsInfo == null)
            {
                return ServiceUnavailable("The NVR is unreachable.");

            }
            else if (recordingsInfo.Count == 0)
            {
                return ServiceUnavailable("The NVR response is not valid.");
            }

            byte cnt = byte.Parse(recordingsInfo["cnt"]);
            string sid = recordingsInfo["sid"];

            Event currEvent = new()
            {
                Channel = chnid,
                Name = $"Event_{sid}",
                StartDateTime = DateTime.ParseExact($"{p.StartDate} {p.StartTime}", "yyyy-MM-dd HH:mm:ss", CultureInfo.InvariantCulture).ToUniversalTime(),
                EndDateTime = DateTime.ParseExact($"{p.EndDate} {p.EndTime}", "yyyy-MM-dd HH:mm:ss", CultureInfo.InvariantCulture).ToUniversalTime(),
            };
            for (int i = 0; i < cnt; i++)
            {
                string cntStartDateTime = recordingsInfo[$"startTime{i}"];
                string cntEndDateTime = recordingsInfo[$"endTime{i}"];
                int expectedSize = int.Parse(recordingsInfo[$"size{i}"]);

                string fileName = $"CAM{chnid + 1}-" +
                                  $"{sid}_" +
                                  $"{i + 1}.mp4";

                var isDownloadSuccess = await DownloadRecordingProcess(i, cnt, sid, chnid, cntStartDateTime, cntEndDateTime, fileName, expectedSize);
                if (!isDownloadSuccess)
                {
                    return ServiceUnavailable("There was an error while downloading a recording from the NVR.");
                }

                if (i == 0)
                {
                    var isEventSaved = await SaveEvent(currEvent);
                    if (!isEventSaved)
                    {
                        return ServiceUnavailable("There was an error while saving the Event.");
                    }
                }

                var isRecordingSaved = await SaveRecording(cntStartDateTime, cntEndDateTime, fileName, currEvent);
                if (!isRecordingSaved)
                {
                    return ServiceUnavailable("There was an error while saving a Recording.");
                }
            }
        }
        finally
        {
            isBusy = false;
        }
        return Ok();
    }

    [Authorize]
    [HttpGet("downloadRecording/{id}")]
    public async Task<IActionResult> DownloadRecording(long id)
    {
        var record = await context.Recordings.FindAsync(id);

        if (record == null)
            return NotFound("Record not found");
        else
            if (record.Path != null)
        {
            var recordingPath = record.Path;

            var fileBytes = await System.IO.File.ReadAllBytesAsync(recordingPath);

            var recordDownload = File(fileBytes, "application/octet-stream", Path.GetFileName(recordingPath));

            Response.Headers["Content-Disposition"] = "attachment; filename=" + Path.GetFileName(recordingPath);

            return recordDownload;
        }
        else
            return BadRequest("Path is null");
    }

    private async Task<Dictionary<string, string>> GetRecordingsInfo(byte chnid, SaveRecordingParams p)
    {
        Dictionary<string, string> d;

        string url = $"http://{ip}/sdk.cgi?action=get.playback.recordinfo&chnid={chnid}&stream=0&startTime={p.StartDate}%20{p.StartTime}&endTime={p.EndDate}%20{p.EndTime}";

        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(
        "Basic", Convert.ToBase64String(Encoding.ASCII.GetBytes(authenticationString)));

        try
        {
            var response = await client.GetAsync(url);
            var content = await response.Content.ReadAsStringAsync();

            d = UtilityMethods.ParseResponse(content);

            Console.WriteLine("\nKeys and values of the recordings info response:");
            foreach (var pair in d)
            {
                Console.WriteLine($"{pair.Key}: {pair.Value}");
            }
        }
        catch
        {
            return null;
        }

        if (!d.ContainsKey("sid"))
        {
            d.Clear();
        }
        return d;
    }

    private async Task<bool> DownloadRecordingProcess(int i, byte cnt, string sid, byte chnid, string cntStartDateTime, string cntEndDateTime, string fileName, int expectedSize)
    {
        string url = $"http://{ip}/sdk.cgi?action=get.playback.download&chnid={chnid}&sid={sid}&streamType=primary&videoFormat=mp4&streamData=1&startTime={cntStartDateTime}&endTime={cntEndDateTime}".Replace(" ", "%20");

        Console.WriteLine($"\nDownloading video {i + 1} of {cnt}");

        var startInfo = new ProcessStartInfo
        {
            FileName = "curl",
            Arguments = $"--http1.0 --output {relativeFilePath}{fileName} -u {authenticationString} -v {url}",
            UseShellExecute = false,
        };

        var process = new Process { StartInfo = startInfo };

        process.Start();
        await process.WaitForExitAsync();

        var fileInfo = new FileInfo($"{relativeFilePath}{fileName}");

        Console.WriteLine($"\n Actual size: {fileInfo.Length} - Expected size: {expectedSize}");
        if (fileInfo.Length < expectedSize)
        {
            fileInfo.Delete();
            return false;
        }
        return true;
    }

    private async Task<bool> SaveEvent(Event e)
    {
        try
        {
            await context.AddAsync(e);
            await context.SaveChangesAsync();
        }
        catch
        {
            return false;
        }
        return true;
    }

    private async Task<bool> SaveRecording(string cntStartDateTime, string cntEndDateTime, string fileName, Event e)
    {
        Recording recording = new Recording()
        {
            Name = fileName,
            Path = Path.GetFullPath(relativeFilePath + fileName),
            Description = "",
            Size = new FileInfo(relativeFilePath + fileName).Length,
            StartDateTime = DateTime.ParseExact(cntStartDateTime, "yyyy-MM-dd HH:mm:ss", CultureInfo.InvariantCulture).ToUniversalTime(),
            EndDateTime = DateTime.ParseExact(cntEndDateTime, "yyyy-MM-dd HH:mm:ss", CultureInfo.InvariantCulture).ToUniversalTime(),
            Event = e,
        };
        recording.Duration = recording.EndDateTime - recording.StartDateTime;
        e?.Recordings?.Add(recording);

        try
        {
            await context.AddAsync(recording);
            await context.SaveChangesAsync();
        }
        catch
        {
            return false;
        }
        return true;
    }

    private IActionResult ServiceBusy()
    {
        Response.Headers.Append("Retry-After", retryTime);
        return StatusCode(503, "Another request is being processed right now.");
    }

    private IActionResult ServiceUnavailable(string m)
    {
        Response.Headers.Append("Retry-After", retryTime);
        isBusy = false;
        return StatusCode(503, "Service Unavailable: " + m);
    }

    private bool? CheckApiKey(string userApiKey)
    {
        const string prefix = "APIKey ";
        if (!userApiKey.StartsWith(prefix))
        {
            return null;
        }
        else if (!userApiKey.Substring(prefix.Length).Equals(apiKey))
        {
            return false;
        }
        return true;
    }
}
