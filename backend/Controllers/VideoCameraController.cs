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
    readonly string authenticationString = "admin:mutina23";
    private readonly string ip = "151.78.228.229";
    private readonly string retryTime = "60";
    private string relativeFilePath = $"./public/recordings/";
    readonly HttpClient client = new();
    private readonly DataContext context = context;

    [HttpPost("saveRecording/{chnid}")]
    public async Task<IActionResult> SaveEventAndRecordings([FromRoute, Required, Range(0, 1)] byte chnid, [FromQuery] SaveRecordingParams p)
    {
        var recordingsInfo = await GetRecordingsInfo(chnid, p);
        if (recordingsInfo == null)
        {
            ServiceUnavailable();
        }

        byte cnt = byte.Parse(recordingsInfo["cnt"]);
        string sid = recordingsInfo["sid"];

        for (int i = 0; i < cnt; i++)
        {
            string cntStartDateTime = recordingsInfo[$"startTime{i}"];
            string cntEndDateTime = recordingsInfo[$"endTime{i}"];

            string fileName = $"CAM{chnid + 1}-" +
                              $"S{UtilityMethods.FormatDate(p.StartDate)}-{UtilityMethods.FormatTime(p.StartTime)}-" +
                              $"E{UtilityMethods.FormatDate(p.EndDate)}-{UtilityMethods.FormatTime(p.EndTime)}_" +
                              $"{i + 1}.mp4";

            var isDownloadSuccess = await DownloadRecordingProcess(i, cnt, sid, chnid, cntStartDateTime, cntEndDateTime, fileName);
            if (!isDownloadSuccess)
            {
                ServiceUnavailable();
            }

            Event currEvent = new()
            {
                Channel = chnid,
                Name = $"Event_{sid}",
                StartDateTime = DateTime.ParseExact($"{p.StartDate} {p.StartTime}", "yyyy-MM-dd HH:mm:ss", CultureInfo.InvariantCulture).ToUniversalTime(),
                EndDateTime = DateTime.ParseExact($"{p.EndDate} {p.EndTime}", "yyyy-MM-dd HH:mm:ss", CultureInfo.InvariantCulture).ToUniversalTime(),
            };

            var isEventSaved = await SaveEvent(i, currEvent);
            if (!isEventSaved)
            {
                ServiceUnavailable();
            }

            var recordingSaved = await SaveRecording(cntStartDateTime, cntEndDateTime, fileName, currEvent);
            if (!recordingSaved)
            {
                ServiceUnavailable();
            }
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
        Dictionary<string, string> recordingsInfo;

        string url = $"http://{ip}/sdk.cgi?action=get.playback.recordinfo&chnid={chnid}&stream=0&startTime={p.StartDate}%20{p.StartTime}&endTime={p.EndDate}%20{p.EndTime}";

        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(
        "Basic", Convert.ToBase64String(Encoding.ASCII.GetBytes(authenticationString)));

        var response = await client.GetAsync(url);
        var content = await response.Content.ReadAsStringAsync();

        if (!response.IsSuccessStatusCode)
        {
            throw new Exception($"Failed to get recordings info from the NVR, response code {response.StatusCode}");
        }

        try
        {
            recordingsInfo = UtilityMethods.ParseResponse(content);
        }
        catch
        {
            return null;
        }
        return recordingsInfo;
    }

    private async Task<bool> DownloadRecordingProcess(int i, byte cnt, string sid, byte chnid, string cntStartDateTime, string cntEndDateTime, string fileName)
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

        if (i == 0)
        {
            var fileInfo = new FileInfo($"{relativeFilePath}{fileName}");
            if (fileInfo.Length < 50)
            {
                return false;
            }
        }
        return true;
    }

    private async Task<bool> SaveEvent(int i, Event e)
    {
        if (i == 0)
        {
            await context.AddAsync(e);
            await context.SaveChangesAsync();

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

        await context.AddAsync(recording);
        await context.SaveChangesAsync();

        return true;
    }

    private IActionResult ServiceUnavailable()
    {
        Response.Headers.Append("Retry-After", retryTime);
        return StatusCode(503);
    }
}
