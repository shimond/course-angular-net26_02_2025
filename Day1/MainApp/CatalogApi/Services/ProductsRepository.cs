using CatalogApi.Contracts;
using CatalogApi.Model;

namespace CatalogApi.Services;

public class ProductsRepository : IProductsRepository
{
    public ProductsRepository()
    {
            
    }
    public async Task<List<Product>> GetAll()
    {
        // Get all from db;
        await Task.Delay(1000);
        return new List<Product>()
        {
            new Product(1, "Bamba", 12.6)
        };
    }

}
