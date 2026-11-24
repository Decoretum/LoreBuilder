
using DBContext;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Npgsql;

namespace Controllers;

[Route("api/AccountController")]
[ApiController]
public class AccountController
{
    private readonly IConfigurationRoot config;
    private readonly AppDbContext context;

    public AccountController(IConfigurationRoot config, AppDbContext context)
    {
        this.config = config;
        this.context = context;
    }

    [HttpGet("RetrieveAccount")]
    async public Task<Account> RetrieveAccount()
    {
        Account acc = new Account();
        acc.username = null;
        var data = context.Database.SqlQueryRaw<Account>($"SELECT * FROM \"Accounts\" WHERE \"loggedIn\" = TRUE").ToList();
        if (data.Count == 0)
        {
                Console.WriteLine("No Account has logged in!");
        }
        return acc;
    }
}

