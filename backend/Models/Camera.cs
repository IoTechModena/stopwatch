using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Camera
    {
        [Key]
        public long Id { get; set; }

        [Required]
        public string? Name { get; set; }

        [Required]
        public string? Location { get; set; }

    }


}
