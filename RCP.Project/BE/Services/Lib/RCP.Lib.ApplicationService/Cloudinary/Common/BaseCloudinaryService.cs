using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using RCP.Cinema.Infrastructure;
using RCP.Shared.Constant.Constants.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using static OpenIddict.Abstractions.OpenIddictConstants;


namespace RCP.Lib.ApplicationService.Cloudinary.Common
{
    public class BaseCloudinaryService
    {
        private static readonly TimeZoneInfo VietnamTimeZone = TimeZoneInfo.FindSystemTimeZoneById("SE Asia Standard Time");
        public readonly CinemaDbContext _cinemaDbContext;

        public readonly ILogger<BaseCloudinaryService> _logger;
        public readonly IHttpContextAccessor _httpContextAccessor;
      

        public BaseCloudinaryService(
            CinemaDbContext cinemaDbContext,
            ILogger<BaseCloudinaryService> logger,
            IHttpContextAccessor httpContextAccessor
     
        )
        {
            _cinemaDbContext = cinemaDbContext;
            _logger = logger;
            _httpContextAccessor = httpContextAccessor;
           
        }
        protected string getCurrentUserId()
        {
            var data = _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(data))
            {
                data = _httpContextAccessor.HttpContext?.User.FindFirstValue(Claims.Subject);
            }
            //_logger.LogInformation($"getCurrentUserId: {data}");
            return data!;
        }
        protected string getCurrentName()
        {
            var data = _httpContextAccessor.HttpContext?.User.FindFirstValue(Claims.Name);
            return data!;
        }
        protected bool IsAdmin()
        {
            var roles = _httpContextAccessor.HttpContext?.User.FindAll(ClaimTypes.Role).ToList();
            var isSuperAdmin = roles?.Any(r => r.Value == RoleConstants.ROLE_ADMIN) ?? false;
            return isSuperAdmin;
        }
        protected static DateTime GetVietnamTime()
        {
            return TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, VietnamTimeZone);
        }
    }
}