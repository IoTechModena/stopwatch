using System.ComponentModel.DataAnnotations;
using backend.Utility.Validation;

namespace backend.Models;

public class SaveRecordingParams
{
    [Required]
    [Date]
    public string? StartDate { get; set; }

    [Required]
    [Time]
    public string? StartTime { get; set; }

    [Required]
    [Date]
    public string? EndDate { get; set; }

    [Required]
    [Time]
    public string? EndTime { get; set; }
}
