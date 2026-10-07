var builder = WebApplication.CreateBuilder(args);

// Add the Directories
var parentDirectory = Directory.GetParent(Directory.GetCurrentDirectory());
var userEquipmentImageDirectory = parentDirectory + "\\equipment\\";
if (!Directory.Exists(userEquipmentImageDirectory)) {
    Directory.CreateDirectory(userEquipmentImageDirectory);
}

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
    "weaponMainHand",
    "weaponOffHand"

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
            builder.WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
            Console.WriteLine("App: Enabled CORS from .NET to React-Electron");
        }
    );

});
var app = builder.Build();

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

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
