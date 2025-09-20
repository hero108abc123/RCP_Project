using Microsoft.EntityFrameworkCore;
using OpenIddict.Abstractions;
using RCP.Authentication.Infrastructure;
using static OpenIddict.Abstractions.OpenIddictConstants;

namespace thongbao.be.Workers
{
    public class AuthWorker : IHostedService
    {
        private readonly IServiceProvider _serviceProvider;

        public AuthWorker(IServiceProvider serviceProvider)
            => _serviceProvider = serviceProvider;

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            using var scope = _serviceProvider.CreateScope();

            var context = scope.ServiceProvider.GetRequiredService<AuthenticationDbContext>();
            await context.Database.EnsureCreatedAsync();

            var manager = scope.ServiceProvider.GetRequiredService<IOpenIddictApplicationManager>();

            if (await manager.FindByClientIdAsync("service-worker") is null)
            {
                await manager.CreateAsync(new OpenIddictApplicationDescriptor
                {
                    ClientId = "service-worker",
                    ClientSecret = "388D45FA-B36B-4988-BA59-B187D329C207",
                    Permissions =
                {
                    Permissions.Endpoints.Token,
                    Permissions.GrantTypes.ClientCredentials,
                    Permissions.GrantTypes.Password,           // ✅ Thêm dòng này
                    Permissions.GrantTypes.RefreshToken,       // ✅ Thêm dòng này
                    Permissions.Scopes.Email,                  // ✅ Thêm dòng này
                    Permissions.Scopes.Profile,                // ✅ Thêm dòng này
                    Permissions.Scopes.Roles
                }
                });
            }

            /* if (await manager.FindByClientIdAsync("client-web") is null)
             {
                 await manager.CreateAsync(new OpenIddictApplicationDescriptor
                 {
                     ClientId = "client-web",
                     ClientSecret = "mBSQUHmZ4be5bQYfhwS7hjJZ2zFOCU2e",
                     RedirectUris =
                     {
                         new Uri("http://localhost:8081/auth/callback")
                     },
                     Permissions =
                     {
                         Permissions.Endpoints.Token,
                         Permissions.Endpoints.Authorization,
                         Permissions.Endpoints.Revocation,
                         Permissions.GrantTypes.Password,
                         Permissions.GrantTypes.RefreshToken,
                         Permissions.GrantTypes.AuthorizationCode,
                         Permissions.ResponseTypes.Code,
                         Permissions.Scopes.Roles,

                     }
                 });
             }

             if (await manager.FindByClientIdAsync("client-web2") is null)
             {
                 await manager.CreateAsync(new OpenIddictApplicationDescriptor
                 {
                     ClientId = "client-web2",
                     RedirectUris =
                     {
                         new Uri("http://localhost:8081/auth/callback")
                     },
                     Permissions =
                     {
                         Permissions.Endpoints.Token,
                         Permissions.Endpoints.Authorization,
                         Permissions.Endpoints.Revocation,
                         Permissions.GrantTypes.Password,
                         Permissions.GrantTypes.RefreshToken,
                         Permissions.GrantTypes.AuthorizationCode,
                         Permissions.ResponseTypes.Code,
                         Permissions.Scopes.Roles,

                     }
                 });
             }*/
        }

        public Task StopAsync(CancellationToken cancellationToken) => Task.CompletedTask;
    }
}
