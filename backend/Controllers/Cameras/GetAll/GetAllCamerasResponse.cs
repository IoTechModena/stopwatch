namespace backend.Controllers.Cameras.GetAll;

public class GetAllCamerasResponse
{
    public required long Id { get; init; }
    public required byte Channel { get; init; }
    public required string Name { get; init; }
    public required string Location { get; init; }
    public required int EventsCount { get; init; }
}
