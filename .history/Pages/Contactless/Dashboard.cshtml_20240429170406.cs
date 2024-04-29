using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace loginPOC2.Pages;

public class DashboardModel : PageModel
{
    private readonly ILogger<DashboardModel> _logger;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public DashboardModel(ILogger<DashboardModel> logger, IHttpContextAccessor httpContextAccessor)
    {
        _logger = logger;
        _httpContextAccessor = httpContextAccessor;
    }

    public void OnGet()
    {
            // Retrieve the username from session
            string username = _httpContextAccessor.HttpContext.Session.GetString("Username");
            // Pass the username to the view
            ViewData["Username"] = username;
    }
}
