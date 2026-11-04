using DBContext;
using FileSystemHandlers;
using Microsoft.EntityFrameworkCore;
using Npgsql;

namespace Extensions;

public static class ServiceCollectionExtensions 
{
    async public static Task createDB(NpgsqlConnection conn)
    {
        await using (var cmd2 = new NpgsqlCommand("CREATE DATABASE lorebuilder", conn))
        await cmd2.ExecuteReaderAsync();
    }
    async public static Task<IServiceCollection> AddCustomServices(
        this IServiceCollection services,
        WebApplicationBuilder builder,
        string connectionString,
        string proxyConnectionString,
        NpgsqlConnection conn,
        Task connection
    )
    {
        var dbExists = false;
        
        // Creating and opening a database connection
        await connection;

        await using (var cmd = new NpgsqlCommand("SELECT * FROM pg_database WHERE datname = 'lorebuilder'", conn))
        await using (var reader = await cmd.ExecuteReaderAsync())
        {
            var rowExists = reader.HasRows;
            if (rowExists)
            {
                while (await reader.ReadAsync())
                {
                    var dbName = reader.GetString(1);
                    Console.WriteLine(dbName);
                    if (!dbName.Equals("lorebuilder"))
                    {
                        await createDB(conn);
                    }
                    else
                    {
                        dbExists = true;
                        Console.WriteLine("C#: Database 'lorebuilder' exists in the target machine");
                    }
                }
            }
            else 
            {
                dbExists = false;
            }
        }

        if (!dbExists) 
        {
            await createDB(conn);
        };

        services.AddSingleton<IimageHandler, ImageHandler>();
        services.AddDbContextPool<AppDbContext>(options => 
            options.UseNpgsql (
                connectionString
            )
        );
        return services;
    }
}