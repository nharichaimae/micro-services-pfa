using pfa__.net.Repositories;
using Microsoft.EntityFrameworkCore;
using pfa__.net.Data;
using pfa__.net.Helpers;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// Ajouter le DbContext pour EF Core
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(connectionString,
        ServerVersion.AutoDetect(connectionString)));

// ✅ Ajouter les repositories
builder.Services.AddScoped<IPieceRepository, PieceRepository>();
builder.Services.AddScoped<IEquipementRepository, EquipementRepository>();

// Ajouter les controllers
builder.Services.AddControllers();

// ✅ Ajouter CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular", policy =>
    {
        policy.WithOrigins("http://localhost:4200") // ton Angular
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// ✅ Middleware JWT
app.UseMiddleware<JwtMiddleware>();

// ✅ Activer CORS
app.UseCors("AllowAngular");

// Map controllers
app.MapControllers();

app.Run();
