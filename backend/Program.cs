using backend.Configurations;

var builder = WebApplication.CreateBuilder();

builder.ConfigureStorage();
builder.ConfigureAuthentication();
builder.ConfigureCors();
builder.ConfigureValidation();
builder.ConfigureScalar();
builder.ConfigureControllers();

var app = builder.Build();

app.Migrate();
app.UseForwarding();
app.UseCors();
app.UseScalar();
app.MapControllers();

app.Run("http://0.0.0.0:5000");
