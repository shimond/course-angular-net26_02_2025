using CatalogApi.Contracts;
using CatalogApi.Models;
using Microsoft.AspNetCore.SignalR;

namespace CatalogApi.Apis;

public static  class ProductsApi
{
    public static void MapProducts(this IEndpointRouteBuilder builder)
    {
        var products = builder.MapGroup("products");
        products.MapGet("", async (IProductRepository productRepository) => { 
            var res = await productRepository.GetAll();
            return TypedResults.Ok(res);
        });


        products.MapDelete("{id}", async (int id, IProductRepository productRepository) => {
            await productRepository.Delete(id);
            return TypedResults.Ok(id);
        });


        products.MapPut("{id}", async (int id, Product product, IProductRepository productRepository) => {
            var res = await productRepository.Update(id, product);
            return TypedResults.Ok(res);
        });


        products.MapPost("", async (Product  p,IProductRepository productRepository) => {
            var res = await productRepository.Insert(p);
            return TypedResults.Ok(res);
        });
    }

}
