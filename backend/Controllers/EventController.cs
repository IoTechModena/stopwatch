using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    public class EventController : Controller
    {
        private readonly DataContext context;

        public EventController(DataContext context)
        {
            this.context = context;
        }

        [Authorize]
        [HttpGet("getEvents")]
        public async Task<IActionResult> GetEvents()
        {
            try
            {
                var events = await context.Events
                .Include(e => e.Recordings) //Including the related recordings, feature called "Eager loading"
                .ToListAsync();
                return Ok(events);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
    }
}
