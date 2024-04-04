using Microsoft.AspNetCore.Mvc;
using System;
using System.Net.Http;
using System.Threading.Tasks;
using IdentityModel.Client;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

public class LoginController : Controller
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IConfiguration _configuration;

    public LoginController(IHttpClientFactory httpClientFactory, IConfiguration configuration)
    {
        _httpClientFactory = httpClientFactory;
        _configuration = configuration;
    }

    public IActionResult Index()
    {
        return View();
    }

    [HttpPost]
    public async Task<IActionResult> Index(string username, string password, [FromServices] ILogger<LoginController> logger, [FromServices] IHttpContextAccessor httpContextAccessor)
    {
        var client = _httpClientFactory.CreateClient();

        // Discover endpoints from metadata
        var disco = await client.GetDiscoveryDocumentAsync($"{_configuration["Keycloak:AuthServerUrl"]}realms/{_configuration["Keycloak:Realm"]}/.well-known/openid-configuration");
        if (disco.IsError)
        {
            logger.LogError("Discovery document error: {Error}", disco.Error);
            ViewBag.ErrorMessage = disco.Error;
            return View("Error");
        }

        logger.LogInformation("Discovery document successful.");

        // Request token
        var tokenResponse = await client.RequestPasswordTokenAsync(new PasswordTokenRequest
        {
            Address = disco.TokenEndpoint,
            ClientId = _configuration["Keycloak:Resource"],
            UserName = username,
            Password = password,
            Scope = "openid"
        });

        if (tokenResponse.IsError)
        {
            logger.LogError("Token request error: {Error}", tokenResponse.Error);
            ViewBag.ErrorMessage = tokenResponse.Error;
            return View("Error");
        }

        logger.LogInformation("Token request successful.");

        // Store token in session or other storage if needed
        httpContextAccessor.HttpContext.Session.SetString("access_token", tokenResponse.AccessToken);

        logger.LogInformation("Access token stored in session.");
        logger.LogInformation("Authentication logic executed.");

        // Redirect to /home page after successful authentication
        return Redirect("/home");
    }
}
