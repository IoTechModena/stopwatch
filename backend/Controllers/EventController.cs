using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    public class EventController(DataContext context) : Controller
    {
        private readonly DataContext context = context;

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

        [HttpGet("getEventsCount")]
        public async Task<IActionResult> GetEventsCount()
        {
            try
            {
                var eventsCount = await context.Events
                .GroupBy(e => e.Channel)
                .Select(g => new { Channel = g.Key, EventsCount = g.Count() })
                .ToListAsync();
                return Ok(eventsCount);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
    }
}
