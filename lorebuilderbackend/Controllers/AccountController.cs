
using System.Globalization;
using System.Text.RegularExpressions;
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
        var data = await context.Database.SqlQueryRaw<Account>($"SELECT * FROM \"Accounts\" WHERE \"loggedIn\" = TRUE").ToListAsync();
        if (data.Count == 0)
        {
                Console.WriteLine("No Account has logged in!");
        }
        else acc = data.First();
        return acc;
    }

    [HttpPost("Login")]
    async public Task<Dictionary<string, Account>> Login([FromBody] LoginDTO dto)
    {
        var acc = new Account();
        var hashmap = new Dictionary<string, Account>();
        string result;
        acc.username = null;
        var data = await context.Database.SqlQueryRaw<Account>($"""
            SELECT *
            FROM "Accounts"
            WHERE 
                "username" = '{dto.username}'
                AND "password" = '{dto.password}'
        """).ToListAsync();

        if (data.Count == 0)
        {
            result = $"Account \"{dto.username}\" does not exist";
        } else result = "Success";
        
        hashmap.Add(result, acc);
        return hashmap;
    }

    // Date Properties are converted from string to DateTime
    // DateTime string must be formatted to: { mm/dd/yyyy h:mm AM/PM }
    [HttpPost("Register")]
    async public Task Register([FromBody] RegisterDTO dto)
    {
        // Convert DateTime properties to DateTime
        // var dateOfBirth = DateTime.Parse(dto.dateOfBirth, CultureInfo.CreateSpecificCulture("en-US"));
        var loggedIn = false;

        // Validation for username and password
        /*
            Start of string must:
            - not start with: any characters + characters that aren't letters and one space
            
            string must
            - not have any characters + 2 consecutive space literals
            - have at least 4 letter characters
        */
        var regexNoWordChar = "^(?!.*[^a-zA-Z ]{3})(?!.* {2})[a-zA-Z]{4}.*$";
        var onlyNumbersAndSpecialCharacters = !Regex.Match(dto.username, regexNoWordChar).Success || !Regex.Match(dto.password, regexNoWordChar).Success;
        var isEmptyString = dto.username.Trim() == string.Empty || dto.password.Trim() == string.Empty;

    }
}

