using CatalogApi.Model.Config;

var builder = WebApplication.CreateBuilder(args);

// DI
builder.Services.Configure<RedisConfig>(builder.Configuration.GetSection("RedisDetails"));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddOutputCache(x=>
{ 
    x.AddPolicy("5sec", o => o.Expire(TimeSpan.FromSeconds(5))); 
});
builder.Services.AddScoped<IProductsRepository, ProductsRepository>();
//builder.Services.AddSingleton<IProductsRepository, ProductsRepository>();
//builder.Services.AddTransient<IProductsRepository, ProductsRepository>();
//builder.Services.AddTransient<ProductsRepository>(); // without interface


var app = builder.Build();
//app.Environment.IsDevelopment();
app.UseOutputCache();
// Middlewares
//app.UseShimonMiddleware();
app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();







