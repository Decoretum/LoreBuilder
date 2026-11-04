using DBContext;
using Extensions;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage;
using Npgsql;

var builder = WebApplication.CreateBuilder(args);

// Add the Directories
var parentDirectory = Environment.GetEnvironmentVariable("LOREBUILDER_DATA_DIR") 
    ?? Directory.GetParent(Directory.GetCurrentDirectory())!.ToString();
var userEquipmentImageDirectory = Path.Combine(parentDirectory + "equipment");
if (!Directory.Exists(userEquipmentImageDirectory)) {
    Directory.CreateDirectory(userEquipmentImageDirectory);
}

// Get User credentials file From txt File
// - ReadToEnd() interprets a logical newline as 1 non-identifiable data that looks like an empty char just before 1 classic \n
// Initialize the PostgreSQL DB Connection
var connectionString = builder.Configuration.GetConnectionString("Default")!;
var proxyConnectionString = builder.Configuration.GetConnectionString("Proxy")!;

var credentialsPath = Path.Combine(Directory.GetCurrentDirectory(), "credentials", "dbcreds.txt");
if (File.Exists(credentialsPath))
{
    using (StreamReader sr = new StreamReader(credentialsPath))
    {
        var streamResult = sr.ReadToEnd();
        var newlineIndex = streamResult.IndexOf('\n');
        var contentOne = streamResult.Substring(0, newlineIndex - 1);
        var contentTwo = streamResult.Substring(newlineIndex).Replace("\n", string.Empty);
        var contentArr = new string[] { contentOne, contentTwo };

        // Parse the strings
        var hashmapStrings = new Dictionary<string, string>()
        {
            {"Default", contentArr.Where(content => content.Contains("Default")).First().Split("=")[1]},
            {"Proxy", contentArr.Where(content => content.Contains("Proxy")).First().Split("=")[1]}
        };

        // Inject Parsed strings to connection strings
        var connectionStringArr = connectionString.Split(";");
        connectionStringArr[2] = connectionStringArr[2] + hashmapStrings["Default"];
        connectionString = string.Join(";", connectionStringArr);

        var proxyConnectionStringArr = proxyConnectionString.Split(";");
        proxyConnectionStringArr[2] = proxyConnectionStringArr[2] + hashmapStrings["Proxy"];
        proxyConnectionString = string.Join(";", proxyConnectionStringArr);
    }
}
else
{
    Console.WriteLine("\nC# Error: File under the path of 'LoreBuilder/credentials/dbcreds.txt' does not exist. Please create this file by following the instructions on the Github Repository's README\n");
}

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
} else {
    Console.WriteLine("C#: lorebuilder DB Tables are already present in the target machine");
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