using Microsoft.AspNetCore.Mvc;

namespace MultiTenantServer.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;
        private Microsoft.AspNetCore.Hosting.IHostingEnvironment Environment;


        public WeatherForecastController(ILogger<WeatherForecastController> logger, Microsoft.AspNetCore.Hosting.IHostingEnvironment _environment)
        {
            _logger = logger;
            Environment = _environment;

        }

        [HttpGet(Name = "GetWeatherForecast")]
        public IEnumerable<WeatherForecast> Get()
        {
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }

        [HttpPost]
        [Route("[action]")]
        public IActionResult GetTheme([FromBody] SubdomainRequest request)
        {
            List<Tenant> tenants = new List<Tenant>();

            tenants.Add(new Tenant(1, "blue", true, "Tenant1Theme"));
            tenants.Add(new Tenant(2, "red", false, "Tenant2Theme"));
            string subdomain = request.Subdomain;
            string themePage = GetThemePage(subdomain, tenants);

            if (themePage != null)
            {
                return Ok(new { ThemePage = themePage });
            }
            else
            {
                return NotFound();
            }
        }

        // Dummy implementation for demonstration purposes
        private string GetThemePage(string subdomain, List<Tenant> tenants)
        {
            var retTheme = "DefaultTheme";
            var themeData = tenants.FirstOrDefault(x => x.Host == subdomain);
            if (themeData != null)
                retTheme = themeData.ThemeName;
            return retTheme;
        }

        [HttpGet]
        [Route("[action]")]
        public IActionResult GetImage(string subdomain)
        {
            string[] files = Directory.GetFiles(this.Environment.WebRootPath+"/images/" +subdomain+"/header/");
            return Ok(new { bannerUrl = "/images/" + subdomain + "/header/" + Path.GetFileName(files[0]) });
        }

        [HttpGet]
        [Route("[action]")]
        public IActionResult GetFaviconImage(string subdomain)
        {
            string[] files = Directory.GetFiles(this.Environment.WebRootPath + "/images/" + subdomain + "/favicon/");
            return Ok(new { bannerUrl = "/images/" + subdomain + "/favicon/" + Path.GetFileName(files[0]) });
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> UploadImages(string subdomain, IFormFile? headerImage = null, IFormFile? faviconImage = null)
        {
            try
            {
                var rootDirectory = this.Environment.WebRootPath + "/images/" + subdomain;
                var HeaderImageUploadDirectory = rootDirectory + "/header";
                var faviconImageUploadDirectory = rootDirectory + "/favicon";
                // Ensure the Uploads directory exists
                if (!Directory.Exists(HeaderImageUploadDirectory))
                {
                    Directory.CreateDirectory(HeaderImageUploadDirectory);
                }

                if (!Directory.Exists(faviconImageUploadDirectory))
                {
                    Directory.CreateDirectory(faviconImageUploadDirectory);
                }

                // Save header image
                if (headerImage != null)
                {
                    Directory.GetFiles(HeaderImageUploadDirectory).ToList().ForEach(file => System.IO.File.Delete(file));
                    var headerImagePath = Path.Combine(HeaderImageUploadDirectory, $"{subdomain}_header.jpg");
                    using (var stream = new FileStream(headerImagePath, FileMode.Create))
                    {
                        await headerImage.CopyToAsync(stream);
                    }
                }

                // Save favicon image
                if (faviconImage != null)
                {
                    Directory.GetFiles(faviconImageUploadDirectory).ToList().ForEach(file => System.IO.File.Delete(file));
                    var faviconImagePath = Path.Combine(faviconImageUploadDirectory, $"{subdomain}_favicon.ico");
                    using (var stream = new FileStream(faviconImagePath, FileMode.Create))
                    {
                        await faviconImage.CopyToAsync(stream);
                    }
                }

                return Ok(new { Message = "Images uploaded successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = $"Error uploading images: {ex.Message}" });
            }
        }
    }
}
