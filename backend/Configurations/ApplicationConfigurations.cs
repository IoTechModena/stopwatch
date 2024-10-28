using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

namespace backend.Configurations;

public static class ApplicationConfigurations
{
    public static void Migrate(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<DataContext>();
        db.Database.Migrate();
    }

    public static void UseForwarding(this WebApplication app)
    {
        app.UseForwardedHeaders(new ForwardedHeadersOptions
        {
            ForwardedHeaders = ForwardedHeaders.XForwardedFor
            | ForwardedHeaders.XForwardedProto
        });
    }

    public static void UseScalar(this WebApplication app)
    {
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger(options =>
            {
                options.RouteTemplate = "openapi/{documentName}.json";
            });

            app.MapScalarApiReference(options =>
            {
                options
                    .WithTitle("stopwatch API reference")
                    .WithDarkMode(false)
                    .WithTheme(ScalarTheme.Solarized);
            });
        }
    }
}
