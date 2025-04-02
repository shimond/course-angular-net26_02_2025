using CatalogApi.Models;
using Microsoft.EntityFrameworkCore;

namespace CatalogApi.Data
{
    public class CatalogDbContext : DbContext
    {
        public DbSet<Product> Products { get; set; }
        public CatalogDbContext(DbContextOptions<CatalogDbContext> contextOptions): base(contextOptions) { }
    }
}
