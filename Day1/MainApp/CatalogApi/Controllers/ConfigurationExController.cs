using CatalogApi.Model.Config;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration.Json;
using Microsoft.Extensions.Options;

namespace CatalogApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConfigurationExController(IConfiguration configuration, IOptions<RedisConfig> config) : ControllerBase
    {
        [HttpGet("GetValue")]
        public string GetFromConfig()
        {
            var connectionKey = "ConnectionStrings__shimonConnection";
            var c = configuration.GetConnectionString("shimonConnection");
            return configuration["shimonObject:shimonValue"];
        }

        [HttpGet("GetValueAsObject")]
        public RedisConfig GetRedisConfig()
        {
            return config.Value;
        }
    }
}
