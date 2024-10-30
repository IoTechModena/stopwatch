using backend.Data;
using backend.Controllers.Recordings.Save;
using DotNetEnv.Configuration;
using FluentValidation;
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

    public static void ConfigureValidation(this WebApplicationBuilder builder)
    {
        builder.Services
            .AddValidatorsFromAssemblyContaining<SaveRecordingsRequestValidator>();
    }

    public static void ConfigureScalar(this WebApplicationBuilder builder)
    {
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
    }

    public static void ConfigureControllers(this WebApplicationBuilder builder)
    {
        builder.Services.AddControllers(options =>
            options.ReturnHttpNotAcceptable = true
        );
    }
}
