using System.Diagnostics;
using System.Net.Http.Headers;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using backend.Models;

namespace backend.Controllers;

[ApiController]
public class VideoCameraController : ControllerBase
{
    // Data needed to access the camera recording
    string authenticationString = "admin:mutina23";
    private string ip = "93.57.67.110";
    HttpClient client = new HttpClient();

    [HttpGet("saveRecording")]
    // Formatting: dates=yyyy-mm-dd  times=hh:mm:ss
    public async Task<IActionResult> SaveRecording([FromQuery] string startDate, string startTime, string endDate, string endTime)
    {
        // This method downloads a video from a camera.
        // It first retrieves the necessary information for the download request,
        // then sends the download request and checks if it was successful.

        // TODO: Add error handling for the request and the curl command
        // TODO: Add model validation for the query parameters

        // get.playback.recordinfo request

        // Setting Authentication header
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(
        "Basic", Convert.ToBase64String(Encoding.ASCII.GetBytes(authenticationString)));

        string recordInfoURL = $"http://{ip}/sdk.cgi?action=get.playback.recordinfo&chnid=0&stream=0&startTime={startDate}%20{startTime}&endTime={endDate}%20{endTime}";

        var recordInfoResponse = await client.GetAsync(recordInfoURL);

        if (recordInfoResponse.IsSuccessStatusCode)
        {
            var content = await recordInfoResponse.Content.ReadAsStringAsync();

            // Parsing the content of recordInfoResponse 
            Dictionary<string, string> recordInfoValues = Utility.ParseResponse(content);

            // Retrieving needed values for the get.playback.download request
            // Available keys: cnt, sid, chnid, allCnt, allSize, ch0, recordType0, port0, lock0 (chapter 1.6.2 in Milesight documentation)
            string chnid = recordInfoValues["chnid"];
            string sid = recordInfoValues["sid"];

            string recordDownloadURL = $"http://{ip}/sdk.cgi?action=get.playback.download&chnid={chnid}&sid={sid}&streamType=secondary&videoFormat=mp4&streamData=1&startTime={startDate}%20{startTime}&endTime={endDate}%20{endTime}";

            string fileName = $"NVR-CAM-S{Utility.FormatDate(startDate)}-{Utility.FormatTime(startTime)}-E{Utility.FormatDate(endDate)}-{Utility.FormatTime(endTime)}.mp4";

            // get.playback.recordinfo request through curl process

            // Create a new ProcessStartInfo object
            var startInfo = new ProcessStartInfo
            {
                // Set the FileName to "curl". This is the command that will be executed.
                FileName = "curl",

                // Set the Arguments for the curl command.
                // -o specifies the output file path and name.
                // -u specifies the username and password for authentication.
                // The last argument is the URL from which the recording will be downloaded.
                Arguments = $"-o ./Data/recordings/{fileName} -u admin:mutina23  {recordDownloadURL}",

                // Set UseShellExecute to false. This means the process will be executed in the same process, not a new shell.
                UseShellExecute = false,
            };

            // Create a new Process object and set its StartInfo property to the previously created startInfo object
            var process = new Process { StartInfo = startInfo };

            // Start the process. This will execute the curl command with the specified arguments.
            process.Start();

            // Wait for the process to exit asynchronously. This is necessary to ensure that the process has completed
            // its task (in this case, downloading the file) before the program continues. If we didn't wait, the program
            // might try to use the file before it's fully downloaded, which would cause errors.
            await process.WaitForExitAsync();

            return Ok("Video successfully downloaded"); // Not a good practice to check if everything went correctly, needs error handling
        }

        else
        {
            return StatusCode((int)recordInfoResponse.StatusCode, recordInfoResponse.ReasonPhrase + "Unable to retrieve recording info");
        }
    }

    [HttpGet("download-recordings/{id}")]
    public async Task<IActionResult> getFile(long id)
    {
        Recording file = new Recording();
        file.Id = 1;
        file.Duration = new TimeSpan(0, 2, 0);
        file.Path = "Aggiungi qui il percorso file";
        FileInfo fileInfo = new FileInfo(file.Path);
        file.Size = fileInfo.Length;
        file.Name = fileInfo.Name;
        Recording file2 = new Recording();

        file2.Id = 2;
        file2.Duration = new TimeSpan(0, 2, 0);
        file2.Path = "Aggiungi qui il percorso file";
        fileInfo = new FileInfo(file2.Path);
        file2.Size = fileInfo.Length;
        file2.Name = fileInfo.Name;

        string path = null;
        string fileName = null;

        switch (id)
        {
            case 1:
                path = file.Path;
                fileName = file.Name;
                break;
            case 2:
                path = file2.Path;
                fileName = file2.Name;
                break;

        };

        if (System.IO.File.Exists(path))
        {
            byte[] fileBytes = await System.IO.File.ReadAllBytesAsync(path);

            // Puoi personalizzare il tipo di contenuto e il nome del file nella risposta HTTP
            var fileContentResult = new FileContentResult(fileBytes, "application/octet-stream")
            {
                FileDownloadName = fileName // Sostituisci con il nome che desideri dare al file
            };

            return fileContentResult;
        }
        else
        {
            // Gestisci il caso in cui il file non esiste
            return NotFound();
        }
    }
}
