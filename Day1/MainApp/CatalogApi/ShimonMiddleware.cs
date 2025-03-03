using CatalogApi.Contracts;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace CatalogApi
{
    // You may need to install the Microsoft.AspNetCore.Http.Abstractions package into your project
    public class ShimonMiddleware
    {
        private readonly RequestDelegate _next;

        public ShimonMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext httpContext, IProductsRepository repository)
        {
            //await httpContext.Response.WriteAsync(" FROM SHIMON MID 1");
            await _next(httpContext);
            //await httpContext.Response.WriteAsync(" FROM SHIMON MID 2");
        }
    }

    // Extension method used to add the middleware to the HTTP request pipeline.
    public static class ShimonMiddlewareExtensions
    {
        public static IApplicationBuilder UseShimonMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<ShimonMiddleware>();
        }
    }
}
