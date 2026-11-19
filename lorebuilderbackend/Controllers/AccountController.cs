
using Microsoft.AspNetCore.Mvc;
using Npgsql;

namespace Controllers;

[Route("api/AccountController")]
[ApiController]
public class AccountController
{
    private readonly IConfigurationRoot config;

    public AccountController(IConfigurationRoot config)
    {
        this.config = config;
    }

    [HttpGet("RetrieveAccount")]
    async public void RetrieveAccount()
    {
        Console.WriteLine(config["connectionString"]);
        await using var conn = new NpgsqlConnection(config["connectionString"]);
        await conn.OpenAsync();

        await using (var cmd = new NpgsqlCommand("SELECT * FROM \"Accounts\" WHERE \"loggedIn\" = TRUE", conn))
        await using (var reader = await cmd.ExecuteReaderAsync())
        {
            var hasRows = reader.HasRows;
            if (!hasRows) Console.WriteLine("No Account has logged in!");
        }
        await conn.CloseAsync();
    }
}

