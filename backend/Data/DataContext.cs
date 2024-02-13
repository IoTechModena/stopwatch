using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend;

public class DataContext(DbContextOptions<DataContext> options) : DbContext(options)
{
    public DbSet<Recording> Recordings { get; set; }
    public DbSet<Event> Events { get; set; }
}
