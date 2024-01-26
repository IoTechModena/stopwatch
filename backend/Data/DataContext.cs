using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend;

public class DataContext : IdentityDbContext
{
    public DbSet<Recording> Recordings { get; set; }

    public DataContext(DbContextOptions<DataContext> options) : base(options) { }
}
