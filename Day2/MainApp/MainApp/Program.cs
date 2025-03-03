using MainApp.Apis;
using MainApp.Contracts;
using MainApp.Data;
using MainApp.Model;
using MainApp.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<MainDbContext>(x => x.UseInMemoryDatabase("shimonDb"));
builder.Services.Configure<FileOptionsConfig>(builder.Configuration.GetSection("FileOptions"));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IProductsRepository, ProductsRepository>();
builder.Services.AddScoped<ITimeManager, ShimonTimeManager>();
builder.Services.AddHttpContextAccessor();
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.MapProductsApis();
var fileConfig = app.Services.GetRequiredService<IOptions<FileOptionsConfig>>();
app.MapFileBrowserApis(fileConfig.Value);

app.Run();


interface ITimeManager
{

    Task<string> GetTime();
}

class ShimonTimeManager : ITimeManager
{
    public Task<string> GetTime()
    {
        return Task.FromResult(DateTime.Now.ToLongTimeString());
    }
}

