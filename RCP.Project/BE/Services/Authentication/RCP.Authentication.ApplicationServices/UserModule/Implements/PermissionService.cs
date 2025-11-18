using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RCP.Authentication.ApplicationService.Common;
using RCP.Authentication.ApplicationService.UserModule.Abstracts;
using RCP.Authentication.Dtos.Permission;
using RCP.Authentication.Infrastructure;
using RCP.Project.HttpRequest.AppException;
using RCP.Project.HttpRequest.BaseRequest;
using RCP.Shared.Constant.Constants.Auth;
using RCP.Shared.Constant.HttpRequest.Error;
using System.Security.Claims;
using System.Text.Json;

namespace RCP.Authentication.ApplicationService.UserModule.Implements
{
    public class PermissionService : BaseAuthService, IPermissionService
    {
        public PermissionService(
            AuthenticationDbContext authDbContext,
            ILogger<PermissionService> logger,
            IHttpContextAccessor httpContextAccessor,
            IMapper mapper
            ) : base(authDbContext, logger, httpContextAccessor, mapper)
        {
        }
        public List<ViewPermissionDto> GetAllPermissions()
        {
            _logger.LogInformation($"{nameof(GetAllPermissions)}");

            var query = PermissionKeys.All.OrderBy(p => p).Select(x => new ViewPermissionDto
            {
                Key = x.Key,
                Name = x.Name,
                Category = x.Category
            }).ToList();

            return query;
        }


    }
}
