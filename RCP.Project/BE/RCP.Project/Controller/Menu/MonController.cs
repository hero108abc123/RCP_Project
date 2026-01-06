using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RCP.Menu.ApplicationService.MenuModule.Abstracts;
using RCP.Menu.Dtos.Mon;
using RCP.Project.Attributes;
using RCP.Project.Controller.Base;
using RCP.Project.HttpRequest;
using RCP.Shared.Constant.Constants.Auth;

namespace RCP.Project.Controller.Menu
{
    [Route("api/app/mon")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class MonController : BaseController
    {
        private readonly IMonService _monService;

        public MonController(ILogger<MonController> logger, IMonService monService) : base(logger)
        {
            _monService = monService;
        }

        [Permission(PermissionKeys.MonAdd)]
        [HttpPost("")]
        public async Task<ApiResponse> Create([FromForm] CreateMonDto dto)
        {
            try
            {
                await _monService.Create(dto);
                return new();
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }

        [Permission(PermissionKeys.MonUpdate)]
        [HttpPut("")]
        public async Task<ApiResponse> Update([FromForm] UpdateMonDto dto)
        {
            try
            {
                await _monService.Update(dto);
                return new();
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }

        [Permission(PermissionKeys.MonDelete)]
        [HttpDelete("{id}")]
        public ApiResponse Delete([FromRoute] int id)
        {
            try
            {
                _monService.Delete(id);
                return new();
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }

        [Permission(PermissionKeys.MonView)]
        [HttpGet("")]
        public ApiResponse FindPaging([FromQuery] FindPagingMonDto dto)
        {
            try
            {
                var data = _monService.FindPaging(dto);
                return new(data);
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }

        [Permission(PermissionKeys.MonView)]
        [HttpGet("{id}")]
        public ApiResponse GetById([FromRoute] int id)
        {
            try
            {
                var data = _monService.GetById(id);
                return new(data);
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }

        [Permission(PermissionKeys.MonView)]
        [HttpGet("drop-down")]
        public ApiResponse GetDropDown()
        {
            try
            {
                var data = _monService.GetDropDown();
                return new(data);
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }
    }
}