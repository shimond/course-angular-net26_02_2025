var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.AddServiceDefaults();
var app = builder.Build();
    app.UseSwagger();
    app.UseSwaggerUI();

app.MapGet("time", ()=> DateTime.Now.ToUniversalTime());
app.Run();
