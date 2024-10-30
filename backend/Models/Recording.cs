using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Models;

public class Recording
{
    [Key]
    public long Id { get; set; }

    [Required]
    public string Path { get; set; } = string.Empty;

    [Required]
    public string Name { get; set; } = string.Empty;

    [MaxLength(500)]
    public string Description { get; set; } = string.Empty;

    [Required]
    public DateTime StartDateTime { get; set; }

    [Required]
    public DateTime EndDateTime { get; set; }

    [Required]
    public TimeSpan Duration { get; set; }

    [Required]
    public long Size { get; set; }

    [ForeignKey("Event")]
    public long EventId { get; set; }

    [JsonIgnore]
    public Event? Event { get; set; }
}
