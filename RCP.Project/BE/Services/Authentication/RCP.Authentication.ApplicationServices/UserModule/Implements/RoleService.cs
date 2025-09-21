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
            if (role == null)
            {
                return new ViewRoleDto();
            }

            var permissions = await (from rp in _authDbContext.RolePermissions
                                     join p in _authDbContext.Permissions on rp.PermissionId equals p.Id
                                     where rp.RoleId == role.Id
                                     select new ViewRolePermissionDto
                                     {
                                         Id = p.Id,
                                         Category = p.Category ?? "",
                                         Key = p.Key ?? "",
                                         Name = p.Name ?? ""
                                     }).ToListAsync();

            var data = new ViewRoleDto
            {
                Id = role.Id,
                Name = role.Name ?? "",
                Permissions = permissions
            };

            return data;
        }
        public async Task<BaseResponsePagingDto<ViewRoleDto>> FindPaging(FindPagingRoleDto dto)
        {
            _logger.LogInformation($"{nameof(FindPaging)} dto={JsonSerializer.Serialize(dto)}");
            var query = from r in _roleManager.Roles.AsNoTracking()
                        select new ViewRoleDto
                        {
                            Id = r.Id,
                            Name = r.Name ?? "",
                            Permissions = (from rp in _authDbContext.RolePermissions
                                           join p in _authDbContext.Permissions on rp.PermissionId equals p.Id
                                           where rp.RoleId == r.Id
                                           select new ViewRolePermissionDto
                                           {
                                               Id = p.Id,
                                               Category = p.Category ?? "",
                                               Key = p.Key ?? "",
                                               Name = p.Name ?? ""
                                           }).ToList()
                        };

            var totalCount = await query.CountAsync();
            var items = await query
                .OrderBy(x => x.Name)
                .Paging(dto)
                .ToListAsync();

            return new BaseResponsePagingDto<ViewRoleDto>
            {
                Items = items,
                TotalItems = totalCount,
            };
        }
    }
}
