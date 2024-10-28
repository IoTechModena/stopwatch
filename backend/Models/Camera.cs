using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class Camera
{
    [Key]
    public long Id { get; set; }

    [Required]
    public byte Channel { get; set; }

    [Required]
    public string? Name { get; set; }

    [Required]
    public string? Location { get; set; }
}
