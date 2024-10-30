using backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers.Recordings.Download;

[Authorize]
[ApiController]
[Route("recordings/{id}")]
[Tags("Recordings")]
public class DownloadRecordingController(DataContext _context) : ControllerBase
{
    private readonly DataContext context = _context;

    [HttpGet]
    [ProducesResponseType<FileContentResult>(200)]
    [ProducesResponseType(400)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> DownloadRecordingAsync(long id, CancellationToken cancellationToken)
    {
        var record = await context.Recordings.FindAsync(id, cancellationToken);

        if (record is null)
            return NotFound("Recording not found");

        if (record.Path is null)
            return BadRequest("Recording path is null");

        var recordingPath = record.Path;
        var fileBytes = await System.IO.File.ReadAllBytesAsync(recordingPath, cancellationToken);

        Response.Headers.ContentDisposition = "attachment; filename=" + Path.GetFileName(recordingPath);
        var recordDownload = File(fileBytes, "application/octet-stream", Path.GetFileName(recordingPath));

        return recordDownload;
    }
}
