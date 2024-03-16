using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Models
{
    public class Event
    {
        [Key]
        public long Id { get; set; }

        [InverseProperty("Event")]
        public ICollection<Recording>? Recordings { get; set; }

        [Required]
        public string? Name { get; set; }

        [Required]
        public DateTime StartDateTime { get; set; }

        [Required]
        public DateTime EndDateTime { get; set; }

        [ForeignKey("Camera")]
        public long CameraId { get; set; }

        [JsonIgnore]
        public Camera Camera { get; set; }
    }
}
