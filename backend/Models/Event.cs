using System.ComponentModel.DataAnnotations;


namespace backend.Models
{
    public class Event
    {
        [Key]
        public long Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public DateTime StartDateTime { get; set; }
        
        [Required]
        public DateTime EndDateTime { get; set; }
        public Event()
        {
        }



    }
}
