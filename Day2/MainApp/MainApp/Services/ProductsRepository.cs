using MainApp.Contracts;
using MainApp.Data;
using MainApp.Model;
using Microsoft.EntityFrameworkCore;


namespace MainApp.Services;

public class ProductsRepository(MainDbContext context) : IProductsRepository
{
    public async Task<List<Product>> GetAllAsync()
    {
        var result = await context.Products.ToListAsync();
        return result;
    }

    public async Task<Product?> GetByIdAsync(int id)
    {
        var result = await context.Products.FirstOrDefaultAsync(x=>x.Id == id);
        return result;
    }

    public async Task<Product> InsertAsync(Product product)
    {
        context.Products.Add(product);  
        await context.SaveChangesAsync();
        return product;
    }

    public async Task DeleteAsync(int id)
    {
        //await context.Products.Where(x=>x.Id == id).ExecuteDeleteAsync();
        //context.Entry(new Product(id, null , null, 0)).State = EntityState.Deleted;

        var p = await context.Products.FirstOrDefaultAsync(x => x.Id == id);
        context.Products.Remove(p);
        await context.SaveChangesAsync();
    }


    public async Task<int> UpdateProductPrice(int productId, double newPrice)
    {
        var item = await context.Products.FirstAsync(x => x.Id == productId);
        var itemAfterUpdate = item with {  Price = newPrice };
        context.Entry(item).CurrentValues.SetValues(itemAfterUpdate);
        var res = await context.SaveChangesAsync();
        return res;

    }

    public async Task<Product> UpdateAsync(Product product)
    {
        context.Products.Update(product);
        await context.SaveChangesAsync();
        return product;
    }
}
