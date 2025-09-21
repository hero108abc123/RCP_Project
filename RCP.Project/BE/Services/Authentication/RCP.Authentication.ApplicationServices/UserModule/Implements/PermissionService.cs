using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using RCP.Authentication.ApplicationService.Common;
using RCP.Authentication.ApplicationService.UserModule.Abstracts;
using RCP.Authentication.Domain;
using RCP.Authentication.Dtos.Permission;
using RCP.Authentication.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace RCP.Authentication.ApplicationService.UserModule.Implements
{
    public class PermissionService : BaseAuthService, IPermissionService
    {
        private static readonly TimeZoneInfo VietnamTimeZone = TimeZoneInfo.FindSystemTimeZoneById("SE Asia Standard Time");

        public PermissionService(
            AuthenticationDbContext authDbContext,
            ILogger<PermissionService> logger,
            IHttpContextAccessor httpContextAccessor,
            IMapper mapper)
            : base(authDbContext, logger, httpContextAccessor, mapper)
        {

     
        }


        public void Create(CreatePermissionDto dto)
        {
            _logger.LogInformation($"{nameof(Create)} dto = {JsonSerializer.Serialize(dto)}");
            var vietnameNow = GetVietnamTime();
            var permission = new Permission
            {
                Name = dto.Name,
                Key = dto.Key,
                Description = dto.Description,
                Category = dto.Category,
            };
            _authDbContext.Permissions.Add(permission);
            _authDbContext.SaveChanges();

        }
        private static DateTime GetVietnamTime()
        {
            return TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, VietnamTimeZone);
        }

    }
}
