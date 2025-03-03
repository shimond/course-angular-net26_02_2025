namespace CatalogApi.Model.Config;

public class RedisConfig
{
    public string Host { get; set; } = string.Empty;
    public int Port { get; set; }
    public string UserName { get; set; } = string.Empty;
    public string[] OptionalHeaders { get; set; } = [];
}

