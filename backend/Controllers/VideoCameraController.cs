using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Net.Http.Headers;
using System.Text;
using System.Globalization;
using System.Diagnostics;
using Microsoft.AspNetCore.Authorization;
using backend.Models;
using backend.Utilty;

namespace backend.Controllers;

[ApiController]
public class VideoCameraController(DataContext context) : ControllerBase
{
    // Data needed to access the camera recording
    readonly string authenticationString = "admin:mutina23";
    private readonly string ip = "151.78.228.229";
    readonly HttpClient client = new();
    private readonly DataContext context = context;

    [HttpGet("saveRecording/{chnid}")]
    public async Task<IActionResult> SaveRecording([FromRoute, Required, Range(0, 1)] byte chnid, [FromQuery] SaveRecordingParams p)
    {
        // This method downloads videos from a camera.
        // It first retrieves the necessary information for the download request,
        // then sends the download request and checks if it was successful.

        // get.playback.recordinfo request

        // Setting Authentication header
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(
        "Basic", Convert.ToBase64String(Encoding.ASCII.GetBytes(authenticationString)));

        string recordInfoURL = $"http://{ip}/sdk.cgi?action=get.playback.recordinfo&chnid={chnid}&stream=0&startTime={p.StartDate}%20{p.StartTime}&endTime={p.EndDate}%20{p.EndTime}";

        var recordInfoResponse = await client.GetAsync(recordInfoURL);

        if (recordInfoResponse.IsSuccessStatusCode)
        {
            var content = await recordInfoResponse.Content.ReadAsStringAsync();

            // Parsing the content of recordInfoResponse 
            Dictionary<string, string> recordInfoValues = UtilityMethods.ParseResponse(content);

            // Printing the values of recordInfoResponse
            Console.WriteLine("\nPrinting the keys and values of recordInfoResponse");
            foreach (KeyValuePair<string, string> entry in recordInfoValues)
                Console.WriteLine($"{entry.Key}:{entry.Value}");

            // Retrieving needed values for the get.playback.download request
            string sid = recordInfoValues["sid"];
            int cnt = int.Parse(recordInfoValues["cnt"]);

            string relativeFilePath = $"./public/recordings/";

            // Saving an Event
            Event currEvent = new Event()
            {
                Channel = chnid,
                Name = $"Event_{sid}",
                StartDateTime = DateTime.ParseExact($"{p.StartDate} {p.StartTime}", "yyyy-MM-dd HH:mm:ss", CultureInfo.InvariantCulture).ToUniversalTime(),
                EndDateTime = DateTime.ParseExact($"{p.EndDate} {p.EndTime}", "yyyy-MM-dd HH:mm:ss", CultureInfo.InvariantCulture).ToUniversalTime(),
            };

            // Adding Event to the database
            try
            {
                await context.AddAsync(currEvent);
                await context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }

            for (int i = 0; i < cnt; i++)
            {
                // get.playback.recordinfo requests through curl processes

                Console.WriteLine($"\nDownloading video {i + 1} of {cnt}");
                string cntStartDateTime = recordInfoValues[$"startTime{i}"];
                string cntEndDateTime = recordInfoValues[$"endTime{i}"];

                string recordDownloadURL = $"http://{ip}/sdk.cgi?action=get.playback.download&chnid={chnid}&sid={sid}&streamType=primary&videoFormat=mp4&streamData=1&startTime={cntStartDateTime}&endTime={cntEndDateTime}".Replace(" ", "%20");

                string fileName = $"CAM{chnid + 1}-S{UtilityMethods.FormatDate(p.StartDate)}-{UtilityMethods.FormatTime(p.StartTime)}-E{UtilityMethods.FormatDate(p.EndDate)}-{UtilityMethods.FormatTime(p.EndTime)}_{i + 1}.mp4";
                Console.WriteLine($"Video name: {fileName}");

                // Create a new ProcessStartInfo object
                var startInfo = new ProcessStartInfo
                {
                    FileName = "curl",
                    Arguments = $"--http1.0 --output {relativeFilePath}{fileName} -u {authenticationString}  -v {recordDownloadURL}",
                    // Set UseShellExecute to false. This means the process will be executed in the same process, not a new shell.
                    UseShellExecute = false,
                };

                // Create a new Process object and set its StartInfo property to the previously created startInfo object
                var process = new Process { StartInfo = startInfo };

                // Start the process. This will execute the curl command with the specified arguments.
                process.Start();
                await process.WaitForExitAsync();

                // Creating a Recording object and saving it in currEvent
                Recording recording = new Recording()
                {
                    Name = fileName,
                    Path = Path.GetFullPath(relativeFilePath + fileName),
                    Description = "",
                    Size = new FileInfo(relativeFilePath + fileName).Length,
                    StartDateTime = DateTime.ParseExact(cntStartDateTime, "yyyy-MM-dd HH:mm:ss", CultureInfo.InvariantCulture).ToUniversalTime(),
                    EndDateTime = DateTime.ParseExact(cntEndDateTime, "yyyy-MM-dd HH:mm:ss", CultureInfo.InvariantCulture).ToUniversalTime(),
                    Event = currEvent,
                };
                recording.Duration = recording.EndDateTime - recording.StartDateTime;

                currEvent.Recordings?.Add(recording);

                // Adding Recording to the database
                try
                {
                    await context.AddAsync(recording);
                    await context.SaveChangesAsync();
                }
                catch (Exception e)
                {
                    return StatusCode(500, e.Message);
                }
            }

            return Ok("Video successfully downloaded");
        }
        else
            return StatusCode((int)recordInfoResponse.StatusCode, recordInfoResponse.ReasonPhrase + "Unable to retrieve recordings info");
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
}
