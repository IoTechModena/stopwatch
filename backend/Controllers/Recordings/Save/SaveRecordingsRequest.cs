using System.ComponentModel.DataAnnotations;

namespace backend.Controllers.Recordings.Save;

public class SaveRecordingsRequest
{
    [Required]
    public required string StartDate { get; set; }

    [Required]
    public required string StartTime { get; set; }

    [Required]
    public required string EndDate { get; set; }

    [Required]
    public required string EndTime { get; set; }
}
