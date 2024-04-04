using Microsoft.AspNetCore.Authentication.JwtBearer; // Import JwtBearer namespace
using Microsoft.Extensions.Logging;
using Serilog;
using Serilog.Formatting.Compact;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();

builder.Logging.AddConsole();
builder.Logging.AddDebug();
builder.Services.AddAuthentication("Bearer")
    .AddJwtBearer("Bearer", options =>
    {
        options.Authority = builder.Configuration["Keycloak:AuthServerUrl"];
        options.Audience = builder.Configuration["Keycloak:Resource"];

        // Disable HTTPS requirement for development
        options.RequireHttpsMetadata = false;
        options.Events = new JwtBearerEvents
        {
            OnChallenge = context =>
            {
                var logger = context.HttpContext.RequestServices.GetRequiredService<ILoggerFactory>().CreateLogger("JwtBearer");
                logger.LogInformation("Authentication challenge occurred.");
                context.Response.Redirect("/");
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
builder.Services.AddSession();
builder.Host.UseSerilog((hostingContext, loggerConfiguration) =>
{
    loggerConfiguration
        .WriteTo.File(new CompactJsonFormatter(), "logs/log-.txt", rollingInterval: RollingInterval.Day)
        .ReadFrom.Configuration(hostingContext.Configuration);
});

var app = builder.Build();

app.UseSession();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapRazorPages();

app.Run();
