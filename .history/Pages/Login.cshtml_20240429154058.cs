using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Runtime.InteropServices;
using System.Security;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace loginPOC2.Pages
{
    public class LoginModel : PageModel
    {
        private readonly ILogger<LoginModel> _logger;
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IConfiguration _configuration;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public LoginModel(ILogger<LoginModel> logger, IHttpClientFactory httpClientFactory, IConfiguration configuration, IHttpContextAccessor httpContextAccessor)
        {
            _logger = logger;
            _httpClientFactory = httpClientFactory;
            _configuration = configuration;
            _httpContextAccessor = httpContextAccessor;
        }

        public void OnGet()
        {
            // This method handles HTTP GET requests to the page
        }

        public async Task<IActionResult> OnPostAsync(string username, string password)
        {
            using (var securePassword = new SecureString())
            {
                foreach (char c in password)
                {
                    securePassword.AppendChar(c);
                }

                securePassword.MakeReadOnly();

                // Log that the login action method is invoked
                _logger.LogInformation("Login action method invoked.");

                // Check if username and password are provided
                if (string.IsNullOrEmpty(username) || securePassword.Length == 0)
                {
                    // Log that the username or password is empty
                    _logger.LogInformation("Username or password is empty.");
                    return Content("Username or password is empty.");
                }

                // Authenticate with Keycloak
                var isAuthenticated = await AuthenticateWithKeycloak(username, securePassword);

                if (isAuthenticated)
                {
                    HttpContext.Session.SetString("Username", username);
                    // Log the authenticated user's name
                    _logger.LogInformation($"Authenticated user: {username}");

                    // Log that authentication is successful
                    _logger.LogInformation("Authentication successful.");

                    // Redirect to the "/home" page
                    return Redirect("/home");
                }
                else
                {
                    // Log that authentication failed
                    _logger.LogInformation("Authentication failed: Invalid username or password.");
                    // return Redirect("/");
                    ErrorMessage = "Invalid username or password.";
                    return Page();
                }
            }
        }

        private async Task<bool> AuthenticateWithKeycloak(string username, SecureString password)
        {
            try
            {
                var keycloakUrl = _configuration["Keycloak:auth-server-url"];
                var realm = _configuration["Keycloak:realm"];
                var clientId = _configuration["Keycloak:resource"];

                var tokenEndpoint = $"{keycloakUrl}/realms/{realm}/protocol/openid-connect/token";

                var httpClient = _httpClientFactory.CreateClient();
                httpClient.BaseAddress = new Uri(keycloakUrl);

                // Log that the authentication request is being sent
                _logger.LogInformation("Sending authentication request to Keycloak...");

                var formContent = new FormUrlEncodedContent(new Dictionary<string, string>
                {
                    ["grant_type"] = "password",
                    ["client_id"] = clientId,
                    ["username"] = username,
                    ["password"] = ConvertSecureStringToString(password)
                });

                var response = await httpClient.PostAsync(tokenEndpoint, formContent);

                // Log the token endpoint response data in pretty JSON format
                var responseData = await response.Content.ReadAsStringAsync();
                _logger.LogInformation("Token endpoint response data:");
                _logger.LogInformation(JsonConvert.SerializeObject(JsonConvert.DeserializeObject(responseData), Formatting.Indented));

                // Log that the authentication request was sent
                _logger.LogInformation("Authentication request sent.");

                if (response.IsSuccessStatusCode)
                {
                    try
                    {
                        // Parse the JSON response to extract the access token
                        var tokenResponse = JsonConvert.DeserializeObject<TokenResponse>(responseData);
                        var accessToken = tokenResponse.access_token;

                        if (!string.IsNullOrEmpty(accessToken))
                        {
                            // Store access token in session
                            _httpContextAccessor.HttpContext.Session.SetString("AccessToken", tokenResponse.access_token);

                            // Log that the access token is stored in the session
                            _logger.LogInformation("Access token stored in session.");

                            // Check if access token is stored in session correctly
                            var storedAccessToken = _httpContextAccessor.HttpContext.Session.GetString("AccessToken");
                            if (!string.IsNullOrEmpty(storedAccessToken))
                            {
                                // Log or inspect the access token
                                _logger.LogInformation($"Access token stored in session: {storedAccessToken}");
                            }
                            else
                            {
                                // Log or handle case where access token is not found in session
                                _logger.LogInformation("Access token not found in session.");
                            }
                            // Authentication successful
                            return true;
                        }
                        else
                        {
                            _logger.LogError("Access token is null or empty in the token response.");
                        }
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError("Error deserializing token response: " + ex.Message);
                    }
                }
                else
                {
                    // Log if authentication failed due to non-successful response
                    _logger.LogInformation($"Authentication failed: Keycloak response status code - {response.StatusCode}");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error occurred while authenticating with Keycloak: {ex.Message}");
            }

            // Authentication failed
            return false;
        }

        private string ConvertSecureStringToString(SecureString secureString)
        {
            IntPtr ptr = IntPtr.Zero;
            try
            {
                ptr = Marshal.SecureStringToGlobalAllocUnicode(secureString);
                return Marshal.PtrToStringUni(ptr);
            }
            finally
            {
                Marshal.ZeroFreeGlobalAllocUnicode(ptr);
            }
        }

        // Model for deserializing token response from Keycloak
        private class TokenResponse
        {
            public string access_token { get; set; }
            // Add other properties as needed
        }
    }
}
