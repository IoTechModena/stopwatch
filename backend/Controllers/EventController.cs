using Microsoft.AspNetCore.Mvc;
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


        [HttpGet("getEvents")]
        public async Task<IActionResult> GetRecordings()
        {
            try
            {
                var events = await context.Recordings.ToListAsync();
                return Ok(events);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }




    }
}
