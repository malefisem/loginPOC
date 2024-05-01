using Microsoft.AspNetCore.Http;
using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

public class AuthenticationMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<AuthenticationMiddleware> _logger;

    public AuthenticationMiddleware(RequestDelegate next, ILogger<AuthenticationMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context, IAuthenticationService authenticationService)
    {
        if (!authenticationService.IsAuthenticated() && !context.Request.Path.Equals("/"))
        {
            _logger.LogInformation("User is not authenticated. Redirecting to login page.");
            context.Response.Redirect("/");
            return;
        }

        await _next(context);
    }
}