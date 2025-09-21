using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RCP.Authentication.ApplicationService.UserModule.Abstracts;
using RCP.Authentication.Dtos.Role;
using RCP.Project.Attributes;
using RCP.Project.Controller.Base;
using RCP.Project.HttpRequest;
using RCP.Shared.Constant.Constants.Auth;

namespace RCP.Project.Controller.Auth
{
    [Route("api/app/role")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class RoleController : BaseController
    {
        private readonly IRoleService _roleService;
        public RoleController(ILogger<BaseController> logger, IRoleService roleService) : base(logger)
        {
            _roleService = roleService;
        }
        [Permission(PermissionKeys.RoleView)]
        [HttpGet("")]
        public async Task<ApiResponse> Find([FromQuery] FindPagingRoleDto dto)
        {
            try
            {
                var data = await _roleService.FindPaging(dto);
                return new(data);
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }
        [Permission(PermissionKeys.RoleView)]
        [HttpGet("{id}")]
        public async Task<ApiResponse> GetById([FromRoute] string id)
        {
            try
            {
                var data = await _roleService.FindById(id);
                return new(data);
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }
    }
}
