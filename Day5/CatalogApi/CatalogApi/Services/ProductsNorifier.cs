using CatalogApi.Contracts;
using CatalogApi.Hubs;
using CatalogApi.Models;
using Microsoft.AspNetCore.SignalR;

namespace CatalogApi.Services;


public class ProductsNotifier(IHubContext<ProductsHub> hubContext) : IProductsNotifier
{

    public async Task OnProductChanged(Product p)
    {
        await hubContext.Clients.All.SendAsync("ProductChanged", p);
    }

    public async Task OnProductAdded(Product p)
    {
        await hubContext.Clients.All.SendAsync("ProductAdded", p);
    }

    public async Task OnProductDeleted(int p)
    {
        await hubContext.Clients.All.SendAsync("ProductDeleted", p);
    }

}
