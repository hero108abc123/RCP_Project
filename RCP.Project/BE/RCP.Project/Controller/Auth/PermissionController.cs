using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RCP.Authentication.ApplicationService.UserModule.Abstracts;
using RCP.Authentication.Dtos.Permission;
using RCP.Project.Attributes;
using RCP.Project.Controller.Base;
using RCP.Project.HttpRequest;
using RCP.Shared.Constant.Constants.Auth;

namespace RCP.Project.Controller.Auth
{
    [Route("api/app/permission")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class PermissionController : BaseController
    {
        private readonly IPermissionService _permissionService;

        public PermissionController(ILogger<BaseController> logger, IPermissionService permissionService)
            : base(logger)
        {
            _permissionService = permissionService;
        }

        [Permission(PermissionKeys.PermissionView)]
        [HttpGet("")]
        public async Task<ApiResponse> Find([FromQuery] FindPagingPermissionDto dto)
        {
            try
            {
                var data = await _permissionService.FindPaging(dto);
                return new(data);
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }

        [Permission(PermissionKeys.PermissionView)]
        [HttpGet("{id:int}")]
        public async Task<ApiResponse> GetById([FromRoute] int id)
        {
            try
            {
                var data = await _permissionService.FindById(id);
                return new(data);
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }

        [Permission(PermissionKeys.PermissionCreate)]
        [HttpPost("")]
        public async Task<ApiResponse> Create([FromBody] CreatePermissionDto dto)
        {
            try
            {
                await _permissionService.Create(dto);
                return new("Create permission successfully");
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }

        [Permission(PermissionKeys.PermissionUpdate)]
        [HttpPut("{id:int}")]
        public async Task<ApiResponse> Update([FromRoute] int id, [FromBody] UpdatePermissionDto dto)
        {
            try
            {
                await _permissionService.Update(id, dto);
                return new("Update permission successfully");
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }

        [Permission(PermissionKeys.PermissionDelete)]
        [HttpDelete("{id:int}")]
        public async Task<ApiResponse> Delete([FromRoute] int id)
        {
            try
            {
                var result = await _permissionService.Delete(id);
                if (!result)
                    return new("Permission not found or could not be deleted");

                return new("Delete permission successfully");
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }

        [Permission(PermissionKeys.PermissionView)]
        [HttpGet("all")]
        public async Task<ApiResponse> GetAll()
        {
            try
            {
                var data = await _permissionService.GetAll();
                return new(data);
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }
    }
}
