using CatalogApi.Contracts;
using CatalogApi.Model;
using CatalogApi.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OutputCaching;

namespace CatalogApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController(IProductsRepository productsRepository) : ControllerBase
    {
        [HttpGet]
        [OutputCache(PolicyName = "5sec")]
        public async Task<List<Product>> GetProducts()
        {
            await Task.Delay(5000);
            var result = await productsRepository.GetAll();
            return result;
        }
    }
}
