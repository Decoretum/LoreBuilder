using DBContext;
using Extensions;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.OpenApi.Writers;

var builder = WebApplication.CreateBuilder(args);

// Add the Directories
var parentDirectory = Directory.GetParent(Directory.GetCurrentDirectory());
var userEquipmentImageDirectory = parentDirectory + "\\equipment\\";
if (!Directory.Exists(userEquipmentImageDirectory)) {
    Directory.CreateDirectory(userEquipmentImageDirectory);
}

// Get User credentials file From txt File
var connectionString = "";

// Add Dependencies
await builder.Services.AddCustomServices(builder);

// Equipment
var equipment = new string[] 
{
    "headGear",
    "rightArmGear",
    "leftArmGear",
    "chestGear",
    "leggingGear",
    "backGear",
    "footGear",
    "accessories",
    "mainHandWeapon",
    "offHandWeapon"

};

foreach (var e in equipment) {
    if (!Directory.Exists($"{userEquipmentImageDirectory}\\{e}")) {
        Directory.CreateDirectory($"{userEquipmentImageDirectory}\\{e}");
    }
}


// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddControllers();  

// Adding CORS Policy
var crossApplicationUsagePolicy = "_crossApplicationUsagePolicy";
builder.Services.AddCors(options => {
    options.AddPolicy(
        name: crossApplicationUsagePolicy,
        builder => {
            // builder.WithOrigins("http://localhost:5173")
            builder.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
            Console.WriteLine("C#: Enabled CORS from .NET to React-Electron");
        }
    );

});
var app = builder.Build();

// Generate DB Tables
using (var scope = app.Services.CreateScope())
{
    var service = scope.ServiceProvider;
    var context = service.GetService<AppDbContext>();
    var databaseCreator = (RelationalDatabaseCreator) context!.Database.GetService<IDatabaseCreator>();
    databaseCreator.CreateTables();
    Console.WriteLine("C#: DB Tables have been created!");
}

// Enable CORS Policy
app.UseCors(crossApplicationUsagePolicy);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseRouting();
app.UseAuthorization();
app.MapControllers();
app.UseStaticFiles();
app.Run();