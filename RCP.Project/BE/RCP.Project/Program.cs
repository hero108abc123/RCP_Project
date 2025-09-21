using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using NLog;
using NLog.Web;
using OpenIddict.Abstractions;
using RCP.Authentication.ApplicationService.Common;
using RCP.Authentication.ApplicationService.Startup;
using RCP.Authentication.ApplicationService.UserModule.Abstracts;
using RCP.Authentication.ApplicationService.UserModule.Implements;
using RCP.Authentication.Domain;
using RCP.Authentication.Infrastructure;
using RCP.Authentication.Infrastructure.Seeder;

using RCP.Shared.ApplicationService.Database;
using RCP.Shared.Constant.Constants.Auth;
using System.Text;


var logger = LogManager.Setup().LoadConfigurationFromAppSettings().GetCurrentClassLogger();
logger.Info("Starting application...");
var builder = WebApplication.CreateBuilder(args);

builder.Logging.ClearProviders();
builder.Host.UseNLog();



#region db
string connectionString = builder.Configuration.GetConnectionString("RCP_DB_DEV")
    ?? throw new InvalidOperationException("Không tìm thấy connection string \"RCP_DB_DEV\" trong appsettings.json");

string hangfireConnectionString = builder.Configuration.GetConnectionString("HANGFIRE")
    ?? throw new InvalidOperationException("Không tìm thấy connection string \"HANGFIRE\" trong appsettings.json");

builder.Services.AddDbContext<AuthenticationDbContext>(options =>
{
    options.UseSqlServer(connectionString, options =>
    {
        options.MigrationsAssembly(typeof(Program).Assembly.GetName().Name);
        options.MigrationsHistoryTable(DbSchemas.TableMigrationsHistory, DbSchemas.Authentication);
    });
    options.UseOpenIddict(); // Register OpenIddict entities
}, ServiceLifetime.Scoped);
#endregion

#region cors
string allowOrigins = builder.Configuration.GetSection("AllowedHosts")!.Value!;
//File.WriteAllText("cors.now.txt", $"CORS: {allowOrigins}");;/'\,
Console.WriteLine($"CORS: {allowOrigins}");
var origins = allowOrigins
    .Split(';')
    .Where(s => !string.IsNullOrWhiteSpace(s))
    .ToArray();
builder.Services.AddCors(options =>
{
    options.AddPolicy(
        ProgramExtensions.CorsPolicy,
        builder =>
        {
            builder
                .WithOrigins(origins)
                .AllowAnyMethod()
                .AllowAnyHeader()
                //.AllowCredentials()
                .WithExposedHeaders("Content-Disposition");
        }
    );
});
#endregion
#region identity
// 2. Add Identity
builder.Services.AddIdentity<AppUser, IdentityRole>()
    .AddEntityFrameworkStores<AuthenticationDbContext>()
    .AddDefaultTokenProviders();
#endregion
#region mapper
// Build mapper configuration
builder.Services.AddAutoMapper(cfg => { }, typeof(MappingProfile));
#endregion
#region auth
string secretKey = builder.Configuration.GetSection("AuthServer:SecretKey").Value!;

builder.Services.AddOpenIddict()
    .AddCore(opt =>
    {
        opt.UseEntityFrameworkCore()
           .UseDbContext<AuthenticationDbContext>();
    })
    .AddServer(options =>
    {
        options.SetTokenEndpointUris("connect/token")
            .SetAuthorizationEndpointUris("/connect/authorize");

        options.AllowClientCredentialsFlow()
                .AllowPasswordFlow()
                .AllowRefreshTokenFlow()
                .AllowAuthorizationCodeFlow()
                .RequireProofKeyForCodeExchange();

        options.AcceptAnonymousClients();
        options.DisableAccessTokenEncryption();

        options.RegisterScopes(OpenIddictConstants.Scopes.OpenId, OpenIddictConstants.Scopes.OfflineAccess, OpenIddictConstants.Scopes.Profile);

        options.AddEphemeralEncryptionKey()
               .AddEphemeralSigningKey();

        var secret = Encoding.UTF8.GetBytes(secretKey);
        options.AddEncryptionKey(new SymmetricSecurityKey(secret));
        options.AddSigningKey(new SymmetricSecurityKey(secret));

        options.UseAspNetCore()
                .EnableAuthorizationEndpointPassthrough()
               .EnableTokenEndpointPassthrough()
               .DisableTransportSecurityRequirement();
    });

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
})
    .AddJwtBearer(
        options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero,

                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(secretKey)
                ),

                ValidTypes = new[] { "JWT", "at+jwt" }
            };
            options.RequireHttpsMetadata = false;
        }
    )
    .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme);

builder.Services.AddAuthorization();
#endregion


#region service
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IRoleService, RoleService>();
builder.Services.AddScoped<IPermissionService, PermissionService>();
builder.Services.AddHostedService<thongbao.be.Workers.AuthWorker>();
#endregion
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "My API", Version = "v1" });

    c.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = Microsoft.OpenApi.Models.SecuritySchemeType.ApiKey,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = Microsoft.OpenApi.Models.ParameterLocation.Header,
        Description = "Enter 'Bearer' [space] and then your valid token.\r\n\r\nExample: \"Bearer eyJhbGciOiJIUzI1NiIs...\"",
    });

    c.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
    {
        {
            new Microsoft.OpenApi.Models.OpenApiSecurityScheme
            {
                Reference = new Microsoft.OpenApi.Models.OpenApiReference
                {
                    Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

builder.ConfigureAuth(typeof(Program).Namespace);

var app = builder.Build();
#region Seed data
// Run seeding inside scope
using (var scope = app.Services.CreateScope())
{
    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<AppUser>>();
    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

    await SeedUser.SeedAsync(userManager, roleManager);
    await SeedRole.SeedAsync(roleManager);

}
#endregion
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(ProgramExtensions.CorsPolicy);
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
//app.UseHangfireDashboard();
//app.MapHealthChecks("/health");

app.Run();
