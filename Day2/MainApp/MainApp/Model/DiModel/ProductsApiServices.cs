using MainApp.Contracts;

namespace MainApp.Model.DiModel;

public class ProductsApiServices
{
    public required IProductsRepository  ProductsRepository { get; set; }
    public required IHttpContextAccessor  HttpContextAccessor { get; set; }
}
