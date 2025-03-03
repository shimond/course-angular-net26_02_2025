using MainApp.Apis;
using MainApp.Contracts;
using MainApp.Services;

var builder = WebApplication.CreateBuilder(args);

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

