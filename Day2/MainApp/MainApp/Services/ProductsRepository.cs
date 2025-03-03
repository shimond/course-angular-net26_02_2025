using MainApp.Contracts;
using MainApp.Model;

namespace MainApp.Services;

public class ProductsRepository : IProductsRepository
{
    public async Task DeleteAsync(int id)
    {
        await Task.Delay(1000);
    }

    public async Task<List<Product>> GetAllAsync()
    {
        await Task.Delay(1000);
        return new List<Product>(); 
    
    }

    public async Task<Product> GetByIdAsync(int id)
    {
        await Task.Delay(1000);
        return new Product(1, "Bisli", "asdasd", 123);

    }

    public async Task InsertAsync(Product product)
    {
        await Task.Delay(1000);

    }

    public async Task UpdateAsync(Product product)
    {
        await Task.Delay(1000);

    }
}
