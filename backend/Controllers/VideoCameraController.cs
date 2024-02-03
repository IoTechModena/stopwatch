using System.Diagnostics;
using System.Net.Http.Headers;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using backend.Models;
using System.Globalization;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
public class VideoCameraController : ControllerBase
{
    // Data needed to access the camera recording
    string authenticationString = "admin:mutina23";
    private string ip = "151.78.228.229";
    HttpClient client = new HttpClient();
    private readonly DataContext context;

    public VideoCameraController(DataContext context)
    {
        this.context = context;
    }

    [HttpGet("saveRecording/{chnid}")]
    public async Task<IActionResult> SaveRecording([FromQuery] string startDate, string startTime, string endDate, string endTime, int chnid) // Formatting: dates=yyyy-mm-dd  times=hh:mm:ss
    {
        // This method downloads videos from a camera.
        // It first retrieves the necessary information for the download request,
        // then sends the download request and checks if it was successful.

        // Checking if the chnid is valid
        if (chnid != 0 && chnid != 1)
        {
            return BadRequest("Invalid chnid, must be 0 to save CAM1 recordings or 1 for CAM2 recordings");
        }

        // get.playback.recordinfo request

        // Setting Authentication header
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(
        "Basic", Convert.ToBase64String(Encoding.ASCII.GetBytes(authenticationString)));

        string recordInfoURL = $"http://{ip}/sdk.cgi?action=get.playback.recordinfo&chnid={chnid}&stream=0&startTime={startDate}%20{startTime}&endTime={endDate}%20{endTime}";

        var recordInfoResponse = await client.GetAsync(recordInfoURL);

        if (recordInfoResponse.IsSuccessStatusCode)
        {
            var content = await recordInfoResponse.Content.ReadAsStringAsync();

            // Parsing the content of recordInfoResponse 
            Dictionary<string, string> recordInfoValues = Utility.ParseResponse(content);

            // Printing the values of recordInfoResponse

            Console.WriteLine("\nPrinting the keys and values of recordInfoResponse");
            foreach (KeyValuePair<string, string> entry in recordInfoValues)
            {
                Console.WriteLine($"{entry.Key}:{entry.Value}");
            }

            // Retrieving needed values for the get.playback.download request
            string sid = recordInfoValues["sid"];
            int cnt = int.Parse(recordInfoValues["cnt"]);

            string relativeFilePath = $"./public/recordings/";

            for (int i = 0; i < cnt; i++)
            {
                // get.playback.recordinfo requests through curl processes

                Console.WriteLine($"\nDownloading video {i + 1} of {cnt}");
                string cntStartDateTime = recordInfoValues[$"startTime{i}"];
                string cntEndDateTime = recordInfoValues[$"endTime{i}"];

                string recordDownloadURL = $"http://{ip}/sdk.cgi?action=get.playback.download&chnid={chnid}&sid={sid}&streamType=primary&videoFormat=mp4&streamData=1&startTime={cntStartDateTime}&endTime={cntEndDateTime}".Replace(" ", "%20");

                string fileName = $"CAM{chnid + 1}-S{Utility.FormatDate(startDate)}-{Utility.FormatTime(startTime)}-E{Utility.FormatDate(endDate)}-{Utility.FormatTime(endTime)}_{i + 1}.mp4";
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

                //Recording model generation
                try
                {
                    Recording recording = new Recording()
                    {
                        Name = fileName,
                        Path = Path.GetFullPath(relativeFilePath + fileName),
                        Description = "",
                        Size = new FileInfo(relativeFilePath + fileName).Length,
                        StartDateTime = DateTime.ParseExact(cntStartDateTime, "yyyy-MM-dd HH:mm:ss", CultureInfo.InvariantCulture).ToUniversalTime(),
                        EndDateTime = DateTime.ParseExact(cntEndDateTime, "yyyy-MM-dd HH:mm:ss", CultureInfo.InvariantCulture).ToUniversalTime(),
                    };
                    recording.Duration = recording.EndDateTime - recording.StartDateTime;

                    // adding recording to the database
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
        {
            return StatusCode((int)recordInfoResponse.StatusCode, recordInfoResponse.ReasonPhrase + "Unable to retrieve recording info");
        }
    }

    [HttpGet("downloadRecording/{id}")]
    public async Task<IActionResult> DownloadRecording(long id)
    {
        var record = await context.Recordings.FindAsync(id);

        if (record == null)
        {
            return NotFound("Record not found");
        }
        else
        {
            if (record.Path != null)
            {
                var recordingPath = record.Path;

                var fileBytes = await System.IO.File.ReadAllBytesAsync(recordingPath);

                var recordDownload = File(fileBytes, "application/octet-stream", Path.GetFileName(recordingPath));

                Response.Headers["Content-Disposition"] = "attachment; filename=" + Path.GetFileName(recordingPath);

                return recordDownload;
            }
            else
            {
                return BadRequest("Path is null");
            }
        }
    }

    [HttpGet("getRecordings")]
    public async Task<IActionResult> GetRecordings()
    {
        try
        {
            var recordings = await context.Recordings.ToListAsync();
            return Ok(recordings);
        }
        catch (Exception e)
        {
            return StatusCode(500, e.Message);
        }
    }

}
