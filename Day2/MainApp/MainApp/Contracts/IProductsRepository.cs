
using MainApp.Model;

namespace MainApp.Contracts;

public interface IProductsRepository
{
    Task<List<Product>> GetAllAsync();
    Task<Product?> GetByIdAsync(int id);
    Task<Product> InsertAsync(Product product);
    Task<Product> UpdateAsync(Product product);
    Task DeleteAsync(int id);
    Task<int> UpdateProductPrice(int productId, double newPrice);
}
