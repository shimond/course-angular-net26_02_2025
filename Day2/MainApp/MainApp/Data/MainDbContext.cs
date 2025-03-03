using MainApp.Model;
using Microsoft.EntityFrameworkCore;

namespace MainApp.Data;

public class MainDbContext : DbContext
{
    public DbSet<Product> Products { get; set; }
    public MainDbContext(DbContextOptions<MainDbContext> options): base(options)
    {
            
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }
}
