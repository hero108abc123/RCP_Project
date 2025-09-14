using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RCP.Authentication.Infrastructure;
using RCP.Shared.ApplicationService.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.Authentication.ApplicationService.Startup
{
    public static class AuthenticationStartup
    {
        public static void ConfigureAuth(this WebApplicationBuilder builder, string? assemblyName)
        {
            builder.Services.AddDbContext<AuthenticationDbContext>(
                options =>
                {
                    options.UseSqlServer(
                        builder.Configuration.GetConnectionString("Default"),
                        options =>
                        {
                            options.MigrationsAssembly(assemblyName);
                            options.MigrationsHistoryTable(
                                DbSchema.TableMigrationsHistory,
                                DbSchema.Authentication 
                            );
                        }
                    );
                },
                ServiceLifetime.Scoped
            );
        }
    }
}
