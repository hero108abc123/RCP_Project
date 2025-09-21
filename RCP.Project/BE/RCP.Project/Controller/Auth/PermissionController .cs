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
    public class PermissionController:BaseController
    {
        private readonly IPermissionService _permissionService;
        public PermissionController(ILogger<BaseController> logger, IPermissionService permissionService) : base(logger)
        {
            _permissionService = permissionService;
        }


        [HttpPost("")]
        [Permission(PermissionKeys.PermissionAdd)]
        public ApiResponse Create(CreatePermissionDto dto)
        {
            try
            {
                _permissionService.Create(dto);
                return new();
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }


    }
}
