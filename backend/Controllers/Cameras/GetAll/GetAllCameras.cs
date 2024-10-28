using backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers.Cameras.GetAll;

[ApiController]
[Route("cameras")]
[Tags("Cameras")]
public class GetAllCamerasController(DataContext context) : Controller
{
    private readonly DataContext context = context;

    [HttpGet]
    [ProducesResponseType<IEnumerable<GetAllCamerasResponse>>(200)]
    public async Task<IActionResult> GetAllCamerasAsync()
    {
        var cameras = await context.Cameras
            .Select(c => new GetAllCamerasResponse
            {
                Id = c.Id,
                Channel = c.Channel,
                Name = c.Name!,
                Location = c.Location!,
                EventsCount = context.Events.Count(e => e.CameraId == c.Id),
            })
            .AsNoTracking()
            .ToListAsync();

        return Ok(cameras);
    }
}
