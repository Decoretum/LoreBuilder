namespace DBContext;
using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public AppDbContext() : base() {}
    public AppDbContext(DbContextOptions options) : base(options) {}
    public DbSet<Accessory> Accessories { get; set; }
}