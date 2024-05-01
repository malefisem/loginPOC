using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Authentication;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();
builder.Services.AddControllers();
builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
builder.Services.AddSingleton<IAuthenticationService, AuthenticationService>();

builder.Services.AddLogging(logging =>
{
    logging.AddConsole();
});

builder.Services.AddSession();

builder.Services.AddHttpClient();

builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
})
.AddCookie()
.AddOpenIdConnect(options =>
{
    options.Authority = builder.Configuration["Keycloak:auth-server-url"];
    options.ClientId = builder.Configuration["Keycloak:resource"];
    options.ResponseType = "code";
    options.SaveTokens = true;

    options.RequireHttpsMetadata = false;

    options.Events = new OpenIdConnectEvents
    {
        OnRedirectToIdentityProvider = context =>
        {
            context.HandleResponse();
            return Task.CompletedTask;
        }
    };
});

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("RequireLoggedIn", policy =>
        policy.RequireAuthenticatedUser());
});

var app = builder.Build();

app.UseSession();
app.UseAuthentication();
app.UseAuthorization(); // Moved up
app.UseStaticFiles(); // Moved up
app.UseMiddleware<AuthenticationMiddleware>(); // After UseAuthorization

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseRouting();

app.MapRazorPages();

app.MapGet("/logout", async context =>
{
    var httpContextAccessor = context.RequestServices.GetRequiredService<IHttpContextAccessor>();
    var httpContext = httpContextAccessor.HttpContext;

    // Clear session
    httpContext.Session.Clear();

    // Sign out the user
    await httpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
    Console.WriteLine($"User logged out.");

    // Redirect to the login page
    context.Response.Redirect("/");
});

app.Run();