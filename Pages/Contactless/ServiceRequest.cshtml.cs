using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Authorization;

namespace loginPOC2.Pages;

// [Authorize(Policy = "RequireLoggedIn")]

public class ServiceRequestModel : PageModel
{
    private readonly ILogger<ServiceRequestModel> _logger;

    public ServiceRequestModel(ILogger<ServiceRequestModel> logger)
    {
        _logger = logger;
    }

    public void OnGet()
    {

    }
}
