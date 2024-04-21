namespace MultiTenantServer
{
    public class WeatherForecast
    {
        public DateOnly Date { get; set; }

        public int TemperatureC { get; set; }

        public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);

        public string? Summary { get; set; }
    }
    public record Tenant(int Id, string Host, bool IsActive, string ThemeName);
    public class SubdomainRequest
    {
        public string Subdomain { get; set; }
    }
}
