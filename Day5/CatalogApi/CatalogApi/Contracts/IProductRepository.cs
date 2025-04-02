using CatalogApi.Models;

namespace CatalogApi.Contracts;

public interface IProductRepository
{
    Task Delete(int productId);
    Task<Product> Update(int productId, Product p);
    Task<Product> Insert(Product p);
    Task<List<Product>> GetAll();
   
}
