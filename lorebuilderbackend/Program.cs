using DBContext;
using Extensions;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage;
using Npgsql;

var builder = WebApplication.CreateBuilder(args);

// Add the Directories
var parentDirectory = Directory.GetParent(Directory.GetCurrentDirectory());
var userEquipmentImageDirectory = parentDirectory + "\\equipment\\";
if (!Directory.Exists(userEquipmentImageDirectory)) {
    Directory.CreateDirectory(userEquipmentImageDirectory);
}

// Get User credentials file From txt File
// Initialize the PostgreSQL DB Connection
var connectionString = builder.Configuration.GetConnectionString("Default")!;
var proxyConnectionString = builder.Configuration.GetConnectionString("Proxy")!;

await using var conn = new NpgsqlConnection(proxyConnectionString);
Task openConnection = conn.OpenAsync();

// Add Dependencies
await builder.Services.AddCustomServices(builder, connectionString, proxyConnectionString, conn, openConnection);

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
/** 
Select * 
	from information_schema.tables
 	WHERE table_schema='public'
 	AND table_catalog='lorebuilder'
	AND table_type='BASE TABLE';
**/
var hasRows = false;
await using var loreBuilderConn = new NpgsqlConnection(connectionString);
await loreBuilderConn.OpenAsync();
await using (var cmd = new NpgsqlCommand("Select table_name FROM information_schema.tables WHERE table_schema='public' AND table_catalog='lorebuilder'AND table_type='BASE TABLE'", loreBuilderConn))
await using (var reader = await cmd.ExecuteReaderAsync())
{
    hasRows = reader.HasRows;
}

if (!hasRows)
{
    using (var scope = app.Services.CreateScope())
    {
        var service = scope.ServiceProvider;
        var context = service.GetService<AppDbContext>();
        var databaseCreator = (RelationalDatabaseCreator) context!.Database.GetService<IDatabaseCreator>();
        databaseCreator.CreateTables();
        Console.WriteLine("C#: DB Tables have been created!");
    }
}

await conn.CloseAsync();
await loreBuilderConn.CloseAsync();

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