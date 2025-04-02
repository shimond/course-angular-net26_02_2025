using CatalogApi.Models;

namespace CatalogApi.Contracts
{
    public interface IProductsNotifier
    {
        Task OnProductAdded(Product p);
        Task OnProductChanged(Product p);
        Task OnProductDeleted(int id);
    }

}
