using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    public class CameraController(DataContext context) : Controller
    {

        private readonly DataContext context = context;
        


        [HttpGet("getCameras")]
        public async Task<IActionResult> GetEvents()
        {
            try
            {
                var cameras = await context.Cameras //Including the related recordings, feature called "Eager loading"
                .ToListAsync();
                return Ok(cameras);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }


        [HttpGet("getEventsCount")]
        public async Task<IActionResult> GetEventsCount(long cameraId)
        {
            try
            {

                var eventCount = await context.Events
                    .Where(e => e.CameraId == cameraId)
                    .CountAsync();

                return Ok(eventCount);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
    }
}
