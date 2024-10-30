using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data;

public class DataContext(DbContextOptions<DataContext> options) : DbContext(options)
{
    public DbSet<Recording> Recordings { get; set; }
    public DbSet<Event> Events { get; set; }
    public DbSet<Camera> Cameras { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Camera>().HasData(
            new Camera
            {
                Id = 1,
                Channel = 0,
                Name = "Telecamera 1",
                Location = "Mutinanet - Sala Riunioni"
            },
            new Camera
            {
                Id = 2,
                Channel = 1,
                Name = "Telecamera 2",
                Location = "Mutinanet - Uffici"
            }
        );
    }
}
