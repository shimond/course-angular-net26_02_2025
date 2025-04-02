using CatalogApi.Apis;
using CatalogApi.Contracts;
using CatalogApi.Data;
using CatalogApi.Hubs;
using CatalogApi.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IProductsNotifier, ProductsNotifier>();
builder.Services.AddDbContext<CatalogDbContext>(x=>x.UseInMemoryDatabase("catalog"));
builder.Services.AddOpenApi();
builder.Services.AddCors(x => x.AddDefaultPolicy(o => o.AllowAnyHeader()
                .SetIsOriginAllowed(o => true).AllowAnyMethod().AllowCredentials()));

builder.Services.AddSignalR();

var app = builder.Build();
app.UseCors();
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.MapHub<ProductsHub>("products-hub");
app.MapProducts();
app.Run();