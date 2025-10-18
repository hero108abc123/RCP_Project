using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using OpenIddict.Abstractions;
using OpenIddict.Server.AspNetCore;
using RCP.Authentication.Domain;
using RCP.Project.HttpRequest.AppException;
using RCP.Shared.Constant.HttpRequest.Error;
using System.Security.Claims;
using static OpenIddict.Abstractions.OpenIddictConstants;

namespace RCP.Project.Controller.Auth
{
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IOpenIddictApplicationManager _applicationManager;
        private readonly ILogger<AuthController> _logger;

        public AuthController(
            IOpenIddictApplicationManager applicationManager,
            ILogger<AuthController> logger)
        {
            _applicationManager = applicationManager;
            _logger = logger;
        }

        [HttpPost("~/connect/token"), Produces("application/json")]
        public async Task<IActionResult> Exchange([FromServices] UserManager<AppUser> userManager)
        {
            var request = HttpContext.GetOpenIddictServerRequest();
            _logger.LogInformation("Token exchange request received. Grant type: {GrantType}", request.GrantType);

            var identity = new ClaimsIdentity(
                TokenValidationParameters.DefaultAuthenticationType,
                Claims.Name,
                Claims.Role);

            try
            {
                if (request.IsClientCredentialsGrantType())
                {
                    _logger.LogInformation("Processing client credentials grant for client: {ClientId}", request.ClientId);

                    var application = await _applicationManager.FindByClientIdAsync(request.ClientId) ??
                        throw new InvalidOperationException("The application cannot be found.");

                    identity.SetClaim(Claims.Subject, await _applicationManager.GetClientIdAsync(application));
                    identity.SetClaim(Claims.Name, await _applicationManager.GetDisplayNameAsync(application));

                    identity.SetDestinations(static claim => claim.Type switch
                    {
                        Claims.Name when claim.Subject.HasScope(Scopes.Profile)
                            => [Destinations.AccessToken, Destinations.IdentityToken],
                        _ => [Destinations.AccessToken]
                    });

                    _logger.LogInformation("Client credentials grant successful for client: {ClientId}", request.ClientId);
                    return SignIn(new ClaimsPrincipal(identity), OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);
                }
                else if (request.IsAuthorizationCodeGrantType())
                {
                    _logger.LogInformation("Processing authorization code grant");

                    var result = await HttpContext.AuthenticateAsync(
                        OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);

                    string subject = result.Principal!.GetClaim(Claims.Subject)!;

                    var user = await userManager.FindByIdAsync(subject)
                        ?? throw new UserFriendlyException(ErrorCodes.AuthErrorUserNotFound);

                    _logger.LogInformation("Authorization code grant for user: {UserId}", user.Id);

                    identity.SetClaim(Claims.Subject, subject);
                    identity.SetClaim(Claims.Name, user.FullName);
                    identity.SetClaim(Claims.Username, user.UserName);
                    identity.SetClaim("user_type", "Customer");
                    var roles = await userManager.GetRolesAsync(user);
                    foreach (var role in roles)
                    {
                        identity.AddClaim(new Claim(ClaimTypes.Role, role));
                    }
                    identity.SetScopes(new[]
                    {
                        Scopes.OpenId,
                        Scopes.Email,
                        Scopes.Profile,
                        Scopes.Roles,
                        Scopes.OfflineAccess
                    }.Intersect(request.GetScopes()));

                    identity.SetDestinations(static claim => claim.Type switch
                    {
                        Claims.Name when claim.Subject.HasScope(Scopes.Profile)
                            => [Destinations.AccessToken, Destinations.IdentityToken],
                        _ => [Destinations.AccessToken]
                    });

                    _logger.LogInformation("Authorization code grant successful for user: {UserId}", user.Id);
                    return SignIn(new ClaimsPrincipal(identity), OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);
                }
                else if (request.IsPasswordGrantType())
                {
                    string username = request.Username!;
                    _logger.LogInformation("Processing password grant for user: {Username}", username);

                    var application = await _applicationManager.FindByClientIdAsync(request.ClientId) ??
                        throw new InvalidOperationException("The application cannot be found.");

                    string password = request.Password!;

                    var user = await userManager.FindByNameAsync(username) ??
                        throw new UserFriendlyException(ErrorCodes.NotFound, "Tài khoản không tồn tại");

                    bool isValid = await userManager.CheckPasswordAsync(user, password);
                    if (!isValid)
                    {
                        _logger.LogWarning("Invalid password attempt for user: {Username}", username);
                        throw new UserFriendlyException(ErrorCodes.AuthErrorInvalidPassword, "Mật khẩu không chính xác");
                    }

                    identity.SetClaim(Claims.Subject, user.Id);
                    identity.SetClaim(Claims.Name, user.FullName);
                    identity.SetClaim(Claims.Username, user.UserName);
                    var roles = await userManager.GetRolesAsync(user);
                    foreach (var role in roles)
                    {
                        identity.AddClaim(new Claim(ClaimTypes.Role, role));
                    }
                    identity.SetScopes(new[]
                    {
                        Scopes.OpenId,
                        Scopes.Email,
                        Scopes.Profile,
                        Scopes.Roles,
                        Scopes.OfflineAccess
                    }.Intersect(request.GetScopes()));

                    identity.SetDestinations(static claim => claim.Type switch
                    {
                        Claims.Name when claim.Subject.HasScope(Scopes.Profile)
                            => [Destinations.AccessToken, Destinations.IdentityToken],
                        _ => [Destinations.AccessToken]
                    });

                    _logger.LogInformation("Password grant successful for user: {Username}", username);
                    return SignIn(new ClaimsPrincipal(identity), OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);
                }
                else if (request.IsRefreshTokenGrantType())
                {
                    _logger.LogInformation("Processing refresh token grant");

                    var result = await HttpContext.AuthenticateAsync(
                        OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);

                    string userid = result.Principal!.GetClaim(Claims.Subject)!;
                    string username = result.Principal!.GetClaim(Claims.Username)!;

                    var application = await _applicationManager.FindByClientIdAsync(request.ClientId) ??
                        throw new InvalidOperationException("The application cannot be found.");

                    var user = await userManager.FindByIdAsync(userid)
                        ?? throw new UserFriendlyException(ErrorCodes.NotFound, "Tài khoản không tồn tại");

                    _logger.LogInformation("Refresh token grant for user: {UserId}", user.Id);

                    identity.SetClaim(Claims.Subject, user.Id);
                    identity.SetClaim(Claims.Name, user.FullName);
                    identity.SetClaim(Claims.Username, user.UserName);
                    var roles = await userManager.GetRolesAsync(user);
                    foreach (var role in roles)
                    {
                        identity.AddClaim(new Claim(ClaimTypes.Role, role));
                    }
                    identity.SetScopes(
                            new[]
                            {
                            Scopes.OpenId,
                            Scopes.Email,
                            Scopes.Profile,
                            Scopes.Roles,
                            Scopes.OfflineAccess
                            }.Intersect(request.GetScopes())
                        );

                    identity.SetDestinations(static claim => claim.Type switch
                    {
                        Claims.Name when claim.Subject.HasScope(Scopes.Profile)
                            => [Destinations.AccessToken, Destinations.IdentityToken],
                        _ => [Destinations.AccessToken]
                    });

                    _logger.LogInformation("Refresh token grant successful for user: {UserId}", user.Id);
                    return SignIn(new ClaimsPrincipal(identity), OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);
                }
            }
            catch (UserFriendlyException ex)
            {
                _logger.LogWarning("User friendly exception in token exchange: {Message}", ex.MessageLocalize);

                var properties = new AuthenticationProperties(
                    new Dictionary<string, string?>
                    {
                        [OpenIddictServerAspNetCoreConstants.Properties.Error] = Errors.InvalidGrant,
                        [OpenIddictServerAspNetCoreConstants.Properties.ErrorDescription] = ex.MessageLocalize
                    });
                return Forbid(properties, OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error in token exchange");

                var properties = new AuthenticationProperties(
                   new Dictionary<string, string?>
                   {
                       [OpenIddictServerAspNetCoreConstants.Properties.Error] = Errors.InvalidGrant,
                       [OpenIddictServerAspNetCoreConstants.Properties.ErrorDescription] = ex.Message
                   });
                return Forbid(properties, OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);
            }

            _logger.LogWarning("Unsupported grant type: {GrantType}", request.GrantType);
            return BadRequest(new OpenIddictResponse
            {
                Error = Errors.UnsupportedGrantType,
                ErrorDescription = "The specified grant type is not supported."
            });
        }
    }
}