using MainApp.Contracts;
using MainApp.Model;
using MainApp.Model.DiModel;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace MainApp.Apis;

public static class ProductsApis
{
    public static void MapProductsApis(this IEndpointRouteBuilder app)
    {
        var productsGroup = app.MapGroup("products")
            //.RequireAuthorization()
            .WithTags("products");

        productsGroup.MapGet("", GetAllProducts);
        productsGroup.MapGet("{id}", GetById);
        productsGroup.MapPost("", () => { }).AllowAnonymous();
        productsGroup.MapPut("{id}", () => { });
        productsGroup.MapDelete("{id}", () => { });


        //DirectoryInfo directoryInfo = new("c:\\");
        //var files = directoryInfo.GetFiles("*.txt"); ;
        

    }

    static async Task<Ok<List<Product>>> GetAllProducts(IProductsRepository repository)
    {
        var res = await repository.GetAllAsync();
        return TypedResults.Ok(res);
    }

    static async Task<Results<Ok<Product>, NotFound<string>>> GetById(int id, [AsParameters] ProductsApiServices services)
    {
        var item = await services.ProductsRepository.GetByIdAsync(id);
        if (item is not null)
        {
            return TypedResults.Ok(item);
        }
        return TypedResults.NotFound($"item : {id}  cannot be found");
    }

}
