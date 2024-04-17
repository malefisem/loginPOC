using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace loginPOC2.Pages;

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
