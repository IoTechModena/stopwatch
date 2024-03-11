using backend.Models;
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
                var cameras = await context.Cameras.ToListAsync();

                var camerasWithEventCount = cameras.Select(camera => new
                {
                    Camera = camera,
                    EventCount = context.Events.Count(e => e.CameraId == camera.Id)
                }).ToList();

                return Ok(camerasWithEventCount);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

    }
}
