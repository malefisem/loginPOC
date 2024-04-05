using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Authorization;

namespace loginPOC2.Pages;

// [Authorize(Policy = "RequireLoggedIn")]

public class ContactDetailsModel : PageModel
{
    private readonly ILogger<ContactDetailsModel> _logger;

    public ContactDetailsModel(ILogger<ContactDetailsModel> logger)
    {
        _logger = logger;
    }

    public void OnGet()
    {

    }
}
