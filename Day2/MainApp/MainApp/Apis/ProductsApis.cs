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
            .WithTags("products");

        productsGroup.MapGet("", GetAllProducts);
        productsGroup.MapGet("{id}", GetById);
        productsGroup.MapPost("", AddNewProduct);
        productsGroup.MapPut("{id}", UpdateProduct);
        productsGroup.MapPatch("{id}", UpdateProductPrice);

        productsGroup.MapDelete("{id}", async (int id, IProductsRepository repository)=> {
            await repository.DeleteAsync(id);
            return TypedResults.NoContent();
        });
    }

    static async Task<Ok<Product>> UpdateProduct(Product p, IProductsRepository productsRepository)
    {
        var productsAfterUpdate = await productsRepository.UpdateAsync(p);
        return  TypedResults.Ok(productsAfterUpdate );
    }

    static async Task<Ok<int>> UpdateProductPrice(int id, UpdatePriceRequest req, IProductsRepository productsRepository)
    {
        var rowsAffected = await productsRepository.UpdateProductPrice(id, req.NewPrice);
        return TypedResults.Ok(rowsAffected);
    }

    static async Task<Ok<List<Product>>> GetAllProducts(IProductsRepository repository)
    {
        var res = await repository.GetAllAsync();
        return TypedResults.Ok(res);
    }

    static async Task<Created<Product>> AddNewProduct(Product product, [AsParameters] ProductsApiServices services)
    {
        var res = await services.ProductsRepository.InsertAsync(product);
        return TypedResults.Created($"products/{res.Id}", res);
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
