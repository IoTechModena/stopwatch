using backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    public class CameraController(DataContext context) : Controller
    {
        private readonly DataContext context = context;

        [HttpGet("getCameras")]
        public async Task<IActionResult> GetCameras()
        {
            try
            {
                var cameras = await context.Cameras
                .Select(c => new
                {
                    c.Id,
                    c.Channel,
                    c.Name,
                    c.Location,
                    eventsCount = context.Events.Count(e => e.CameraId == c.Id)
                }).ToListAsync();
                return Ok(cameras);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
    }
}
