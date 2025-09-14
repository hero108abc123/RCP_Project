using Microsoft.EntityFrameworkCore;
using NLog;
using NLog.Web;
using RCP.Authentication.ApplicationService.Startup;
using RCP.Authentication.Infrastructure;
using RCP.Shared.ApplicationService.Database;
using RCP.Shared.Constant;


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
        options.MigrationsHistoryTable(DbSchema.TableMigrationsHistory, DbSchema.Authentication);
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
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "My API", Version = "v1" });

    // 🔑 Add Bearer JWT Security Definition
    c.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = Microsoft.OpenApi.Models.SecuritySchemeType.ApiKey,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = Microsoft.OpenApi.Models.ParameterLocation.Header,
        Description = "Enter 'Bearer' [space] and then your valid token.\r\n\r\nExample: \"Bearer eyJhbGciOiJIUzI1NiIs...\"",
    });

    // 🔐 Add Security Requirement (apply globally to all endpoints)
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
