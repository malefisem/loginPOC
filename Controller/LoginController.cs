using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Threading.Tasks;
using IdentityModel.Client;

public class LoginController : Controller
{
    private readonly IHttpClientFactory _httpClientFactory;

    public LoginController(IHttpClientFactory httpClientFactory)
    {
        _httpClientFactory = httpClientFactory;
    }

    public IActionResult Index()
    {
        return View();
    }

    [HttpPost]
    public async Task<IActionResult> Index(string username, string password)
    {
        var client = _httpClientFactory.CreateClient();

        // Discover endpoints from metadata
        var disco = await client.GetDiscoveryDocumentAsync("http://localhost:8080/auth/realms/loginPOC");
        if (disco.IsError)
        {
            Console.WriteLine("Discovery document error: " + disco.Error);
            ViewBag.ErrorMessage = disco.Error;
            return View("Error");
        }

        Console.WriteLine("Discovery document successful.");

        // Request token
        var tokenResponse = await client.RequestPasswordTokenAsync(new PasswordTokenRequest
        {
            Address = disco.TokenEndpoint,
            ClientId = "myclient",
            UserName = username,
            Password = password,
            Scope = "openid"
        });

        if (tokenResponse.IsError)
        {
            Console.WriteLine("Token request error: " + tokenResponse.Error);
            ViewBag.ErrorMessage = tokenResponse.Error;
            return View("Error");
        }

        Console.WriteLine("Token request successful.");

        // Store token in session or other storage if needed
        HttpContext.Session.SetString("access_token", tokenResponse.AccessToken);

        Console.WriteLine("Access token stored in session.");
        Console.WriteLine("Authentication logic executed.");

        // Redirect to home page or any other desired page after successful authentication
        return RedirectToAction("Index", "/home");
    }
}
