using backend.Utility.Validation;

namespace backend.Controllers.Recordings.Save;

public class SaveRecordingsRequest
{
    [Date]
    public required string StartDate { get; set; }

    [Time]
    public required string StartTime { get; set; }

    [Date]
    public required string EndDate { get; set; }

    [Time]
    public required string EndTime { get; set; }
}
