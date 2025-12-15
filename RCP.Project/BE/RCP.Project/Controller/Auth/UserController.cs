using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RCP.Authentication.ApplicationService.UserModule.Abstracts;
using RCP.Authentication.ApplicationService.UserModule.Implements;
using RCP.Authentication.Dtos.User;
using RCP.Project.Attributes;
using RCP.Project.Controller.Base;
using RCP.Project.HttpRequest;
using RCP.Shared.Constant.Constants.Auth;

namespace RCP.Project.Controller.Auth
{
    [Route("api/app/user")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class UserController: BaseController
    {
        private readonly IUserService _userService;
        public UserController(ILogger<BaseController> logger, IUserService userService) : base(logger)
        {
            _userService = userService;
        }
        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<ApiResponse> Register([FromBody] RegisterDto dto)
        {
            try
            {
                await _userService.RegisterUser(dto);
                return new();
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }
        [HttpGet("")]
        [Permission(PermissionKeys.UserView)]
        public async Task<ApiResponse> Find([FromQuery] FindPagingUserDto dto)
        {
            try
            {
                var data = await _userService.FindPaging(dto);
                return new(data);
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }
        [HttpGet("{id}")]
        [Permission(PermissionKeys.UserView)]
        public async Task<ApiResponse> GetById([FromRoute] string id)
        {
            try
            {
                var data = await _userService.FindById(id);
                return new(data);
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }
        [HttpPut("{id}")]
        [Permission(PermissionKeys.UserUpdate)]
        public async Task<ApiResponse> UpdateUser([FromRoute] string id,[FromBody] UpdateUserDto dto)
        {
            try
            {
                await _userService.Update(id,dto);
                return new();
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }
        [HttpPut("{id}/set-to-role")]
        [Permission(PermissionKeys.UserSetRoles)]
        public async Task<ApiResponse> SetToRole([FromRoute] string id,[FromBody] SetRoleForUserDto dto)
        {
            try
            {
                await _userService.SetRoleForUser(id,dto);
                return new();
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }

        [HttpGet("me")]
        public async Task<ApiResponse> GetAuthMe()
        {
            try
            {
                var data = await _userService.GetAuthMe();
                return new(data);
            }catch(Exception ex)
            {
                return OkException(ex);
            }
        }

    }
}
