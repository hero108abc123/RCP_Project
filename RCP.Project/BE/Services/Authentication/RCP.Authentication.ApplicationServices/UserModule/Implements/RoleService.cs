using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RCP.Authentication.ApplicationService.Common;
using RCP.Authentication.ApplicationService.UserModule.Abstracts;
using RCP.Authentication.Dtos.Role;
using RCP.Authentication.Infrastructure;
using RCP.Project.HttpRequest.BaseRequest;
using RCP.Shared.Constant.Constants.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace RCP.Authentication.ApplicationService.UserModule.Implements
{
    public class RoleService: BaseAuthService,IRoleService
    {
        private readonly RoleManager<IdentityRole> _roleManager;
        public RoleService(
            AuthenticationDbContext authDbContext,
            ILogger<RoleService> logger,
            IHttpContextAccessor httpContextAccessor,
            IMapper mapper,
            RoleManager<IdentityRole> roleManager
        ) : base(authDbContext, logger, httpContextAccessor, mapper)
        {
            _roleManager = roleManager;
        }
        public async Task<ViewRoleDto> FindById(string id)
        {
            _logger.LogInformation($"{nameof(FindById)} id={id}");

            var role = await _roleManager.FindByIdAsync(id);
            var data = _mapper.Map<ViewRoleDto>(role);

            if (role != null)
            {
                var claims = await _roleManager.GetClaimsAsync(role);
                data.PermissionKey = claims
                                        .Where(c => c.Type == CustomClaimTypes.Permission)
                                        .Select(c => c.Value)
                                        .ToList();
            }

            return data;
        }

        public async Task<BaseResponsePagingDto<ViewRoleDto>> FindPaging(FindPagingRoleDto dto)
        {
            _logger.LogInformation($"{nameof(FindPaging)} dto={JsonSerializer.Serialize(dto)}");

            var query = _roleManager.Roles.AsNoTracking().AsQueryable();
            var data = await query.OrderBy(x => x.Name)
                        .Paging(dto)
                        .ToListAsync();

            var items = _mapper.Map<List<ViewRoleDto>>(data);
            foreach (var item in items)
            {
                var roleClaims = _authDbContext.RoleClaims
                                    .Where(rc => rc.RoleId == item.Id && rc.ClaimType == CustomClaimTypes.Permission)
                                    .Select(rc => rc.ClaimValue)
                                    .ToList();
                if (roleClaims != null)
                {
                    item.PermissionKey = roleClaims!;
                }
            }

            return new BaseResponsePagingDto<ViewRoleDto>
            {
                Items = items,
                TotalItems = query.Count(),
            };
        }

    }
}
