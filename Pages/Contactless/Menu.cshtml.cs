using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Authorization;

namespace loginPOC2.Pages;

[Authorize(Policy = "RequireLoggedIn")]

public class ContactlessMenuModel : PageModel
{
    private readonly ILogger<ContactlessMenuModel> _logger;

    public ContactlessMenuModel(ILogger<ContactlessMenuModel> logger)
    {
        _logger = logger;
    }

    public void OnGet()
    {

    }
}
