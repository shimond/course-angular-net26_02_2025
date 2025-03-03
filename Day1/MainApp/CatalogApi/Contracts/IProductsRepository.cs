using CatalogApi.Model;

namespace CatalogApi.Contracts
{
    public interface IProductsRepository
    {
        Task<List<Product>> GetAll();
    }
}
