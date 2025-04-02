using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.AddServiceDefaults();

//builder.Services.ConfigureHttpClientDefaults(static http =>
//{
//    http.AddServiceDiscovery();
//});
//builder.Services.AddServiceDiscovery();


var app = builder.Build();
app.MapDefaultEndpoints();
app.UseSwagger();
app.UseSwaggerUI();

app.MapGet("GetAll", async (HttpClient client) =>
{
    var resonse = await client.GetStringAsync("http://currencyapi/time");
    return new
    {
        MyTime = DateTime.Now,
        CurrrencyTime = resonse
    };

});
app.Run();
