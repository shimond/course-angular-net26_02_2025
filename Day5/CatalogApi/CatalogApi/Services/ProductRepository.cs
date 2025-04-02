using CatalogApi.Contracts;
using CatalogApi.Data;
using CatalogApi.Models;
using Microsoft.EntityFrameworkCore;

namespace CatalogApi.Services;

public class ProductRepository(CatalogDbContext catalogDb, IProductsNotifier productsNotifier) : IProductRepository
{
    public async Task Delete(int productId)
    {
        catalogDb.Entry(new Product(productId, "", "", 0)).State = EntityState.Deleted;
        await catalogDb.SaveChangesAsync();
        await productsNotifier.OnProductDeleted(productId);
    }

    public async Task<List<Product>> GetAll()
    {
        var res = await catalogDb.Products.ToListAsync();
        return res;
    }

    public async Task<Product> Insert(Product p)
    {
        await catalogDb.Products.AddAsync(p);
        await catalogDb.SaveChangesAsync();
        await productsNotifier.OnProductAdded(p);
        return p;
    }

    public async Task<Product> Update(int productId, Product p)
    {
        catalogDb.Entry(p).State = EntityState.Modified;
        await catalogDb.SaveChangesAsync();
        await productsNotifier.OnProductChanged(p);
        return p;
    }
}
