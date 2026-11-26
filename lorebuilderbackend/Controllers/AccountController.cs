
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
        } else {
            result = "Success";
            acc = data.First();
        }
        
        hashmap.Add(result, acc);
        return hashmap;
    }

    // Date Properties are converted from string to DateTime
    // DateTime string must be formatted to: { mm/dd/yyyy h:mm AM/PM }
    [HttpPost("Register")]
    async public Task<Dictionary<string, Account>> Register([FromBody] RegisterDTO dto)
    {
        var stringValue = string.Empty;
        var acc = new Account();
        var hashmap = new Dictionary<string, Account>();
        var loggedIn = false;
        var hasError = false;

        // Convert DateTime properties to DateTime
        var dateOfBirth = DateTime.Parse(dto.dateOfBirth, CultureInfo.CreateSpecificCulture("en-US")).ToUniversalTime();

        // Validation for username
        /*
            Start of string must:
            - not start with: any characters + 3 consecutive characters that aren't letters, spaces, or underline
            
            string must
            - not have any characters + 2 consecutive space literals
            - not have any characters + 2 consecutive underscore literals
            - have at least 4 letter characters
        */
        var regexNoWordChar = "^(?!.*_{2})(?:[^ ]* ){0,3}(?!.* {2})([a-zA-Z]{3})[^ ]*$";
        var validUsername = Regex.IsMatch(dto.username, regexNoWordChar, RegexOptions.CultureInvariant);
        var isEmptyString = dto.username.Trim() == string.Empty || dto.password.Trim() == string.Empty;
        if (!validUsername || isEmptyString)
        {
            stringValue = "The username chosen does not follow this app's conventions";
            hasError = true;
        }

        if (!hasError)
        {
            // Query the Database
            var data = context.Accounts.Where(a => a.username == dto.username).ToList();

            if (data.Count >= 1)
            {
                stringValue = "An account already has this existing username";
            } else {
                stringValue = "Success";
                acc.username = dto.username;
                acc.password = dto.password;
                acc.dateOfBirth = dateOfBirth;
                acc.loggedIn = loggedIn;
                await context.Accounts.AddAsync(acc);
                await context.SaveChangesAsync();
            }
        }
        
        hashmap.Add(stringValue, acc);
        return hashmap;
    }
}

