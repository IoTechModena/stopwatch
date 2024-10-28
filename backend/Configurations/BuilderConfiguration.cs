using backend.Data;
using DotNetEnv.Configuration;
using Microsoft.EntityFrameworkCore;

namespace backend.Configurations;

public static class BuilderConfiguration
{
    public static void ConfigureStorage(this WebApplicationBuilder builder)
    {
        builder.Configuration.AddDotNetEnv();

        var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
        + builder.Configuration["POSTGRES_PASSWORD"];
        builder.Services.AddDbContext<DataContext>(options => options.UseNpgsql(connectionString));
    }

    public static void ConfigureAuthentication(this WebApplicationBuilder builder)
    {
        builder.Services.AddAuthentication("Bearer").AddJwtBearer(options =>
        {
            options.Authority = "https://manuelcampi.eu.auth0.com/";
            options.Audience = "https://localhost/API";
        });
    }

    public static void ConfigureCors(this WebApplicationBuilder builder)
    {
        builder.Services.AddCors(options =>
        {
            options.AddDefaultPolicy(policy =>
            {
                policy.WithOrigins("https://localhost:5173").AllowAnyHeader();
            });
        });
    }

    public static void ConfigureScalar(this WebApplicationBuilder builder)
    {
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
    }
}
