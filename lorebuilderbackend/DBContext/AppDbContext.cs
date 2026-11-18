namespace DBContext;
using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public AppDbContext() : base() {}
    public AppDbContext(DbContextOptions options) : base(options) {}
    public DbSet<Accessory> Accessories { get; set; }
    public DbSet<Character> Characters { get; set; }
    public DbSet<Account> Accounts { get; set; }

    // public DbSet<Character.WeaponInfo> WeaponInfos { get; set; }
    // public DbSet<Character.BasicInfo> BasicInfos { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Character>()
            .OwnsOne(c => c.weaponMainhand, d =>
            {
                d.ToJson();
                d.OwnsMany(d => d.data);
            });
        
        modelBuilder.Entity<Character>()
            .OwnsOne(c => c.weaponOffHand, d =>
            {
                d.ToJson();
                d.OwnsMany(d => d.data);
            });

        modelBuilder.Entity<Character>()
            .OwnsOne(c => c.occupationDetails, d =>
            {
                d.ToJson();
                d.OwnsMany(d => d.data);
            });
    }
}