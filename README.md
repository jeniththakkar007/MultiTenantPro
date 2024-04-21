# MultiTenantPro
Create a GitHub Repository for the code
Create a new project using Visual Studio and the React and ASP.NET template. Commit this starting point and push to the master branch
For the sake of simplicity here, you can create a hard coded TenantService with a list of tenants. NOTE: When developing locally you should add one or more aliases to your hosts file so that you can have a domain like foo or bar that points to 127.0.0.1 thus allowing you to test multi-tenancy.
public record Tenant(int Id, string Host, bool IsActive, string ThemeName)
Add at least 2 React Themes. You can download some free themes for any website. NOTE: Remember that Themes should NOT know about each other. This means that for any file that may be common which would need to provide information on which resources to load. This should be resolved by the API. You will need to create a minimal API similar to the WeatherAPI created by the template.
Create any services and APIs that may be required to ensure that each tenant can return different assets such as the favicon even when using the same theme.
Each tenant should have the following: 6.1. Be able to upload an image for the favicon 6.2. Be able to upload an image to display for a home banner 6.3. Use the Weather API that is part of the template 6.4. Display either a default image asset or the user uploaded image for the Home Banner / Favicon that is unique to the tenant. If TenantA uploads an asset it should not be available for TenantB.
