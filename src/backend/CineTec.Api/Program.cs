var builder = WebApplication.CreateBuilder(args);

// Controllers remain the single entry point for HTTP traffic, so we register them first.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
    {
        // These origins cover the usual Vite dev and preview URLs the team uses locally.
        policy
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

// CORS must run before controllers so the browser can complete frontend requests cleanly.
app.UseCors("Frontend");
app.UseAuthorization();
app.MapControllers();

app.Run();
