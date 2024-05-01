using Microsoft.AspNetCore.Http;
using System;

public interface IAuthenticationService
{
    string GetAccessToken();
    bool IsAuthenticated();
    // Add more methods as needed
}

public class AuthenticationService : IAuthenticationService
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public AuthenticationService(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor ?? throw new ArgumentNullException(nameof(httpContextAccessor));
    }

    public string GetAccessToken()
    {
        return _httpContextAccessor.HttpContext?.Session.GetString("AccessToken");
    }

    public bool IsAuthenticated()
    {
        return !string.IsNullOrEmpty(GetAccessToken());
    }
}
