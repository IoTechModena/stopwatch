using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Event
    {
        [Key]
        public long Id { get; set; }
        
        [InverseProperty("Event")]
        public ICollection<Recording> Recordings { get; set; }

        [Required]
        public byte Channel {  get; set; }

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
