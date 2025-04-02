using Microsoft.AspNetCore.SignalR;

namespace CatalogApi.Hubs;

public class ProductsHub : Hub
{
    public void SendMessage(string userName, string message)
    {
        Clients.All.SendAsync("messageHere",message);
    }
}
