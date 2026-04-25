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
            .WithOrigins(
                "http://localhost:4000",
                "http://localhost:3000",
                "http://localhost:5173",
                "http://127.0.0.1:5173",
                "http://localhost:4173",
                "http://127.0.0.1:4173")
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
