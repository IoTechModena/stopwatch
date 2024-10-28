using backend.Models;

namespace backend.Controllers.Events.GetAll;

public class GetAllEventsResponse
{
    public required long Id { get; init; }
    public required string Name { get; init; }
    public required DateTime StartDateTime { get; init; }
    public required DateTime EndDateTime { get; init; }
    public required byte Channel { get; init; }
    public required IEnumerable<Recording> Recordings { get; init; }
}
