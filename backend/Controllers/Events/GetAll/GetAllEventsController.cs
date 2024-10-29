using backend.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers.Events.GetAll;

[Authorize]
[ApiController]
[Route("events")]
[Tags("Events")]
public class GetAllEventsController(DataContext _context) : ControllerBase
{
    private readonly DataContext context = _context;

    [HttpGet]
    [ProducesResponseType<IEnumerable<GetAllEventsResponse>>(200)]
    public async Task<IActionResult> GetAllEventsAsync()
    {
        var events = await context.Events
            .Include(e => e.Recordings)
            .Include(e => e.Camera)
            .Select(e => new GetAllEventsResponse
            {
                Id = e.Id,
                Name = e.Name!,
                StartDateTime = e.StartDateTime,
                EndDateTime = e.EndDateTime,
                Channel = e.Camera!.Channel,
                Recordings = e.Recordings!
                    .OrderBy(r => r.StartDateTime)
                    .ToList()
            })
            .AsNoTracking()
            .ToListAsync();

        return Ok(events);
    }
}
