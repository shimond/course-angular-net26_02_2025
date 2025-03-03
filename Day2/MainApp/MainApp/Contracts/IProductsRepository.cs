
using MainApp.Model;

namespace MainApp.Contracts;

public interface IProductsRepository
{
    Task<List<Product>> GetAllAsync();
    Task<Product?> GetByIdAsync(int id);
    Task InsertAsync(Product product);
    Task UpdateAsync(Product product);
    Task DeleteAsync(int id);
}
