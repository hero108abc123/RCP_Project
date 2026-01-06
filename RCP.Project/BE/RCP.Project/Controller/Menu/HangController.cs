using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RCP.Menu.ApplicationService.MenuModule.Abstracts;
using RCP.Menu.Dtos.Hang;
using RCP.Project.Attributes;
using RCP.Project.Controller.Base;
using RCP.Project.HttpRequest;
using RCP.Shared.Constant.Constants.Auth;

namespace RCP.Project.Controller.Menu
{
    [Route("api/app/hang")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class HangController : BaseController
    {
        private readonly IHangService _hangService;

        public HangController(ILogger<HangController> logger, IHangService hangService) : base(logger)
        {
            _hangService = hangService;
        }

        [Permission(PermissionKeys.HangAdd)]
        [HttpPost("")]
        public ApiResponse Create([FromBody] CreateHangDto dto)
        {
            try
            {
                _hangService.Create(dto);
                return new();
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }

        [Permission(PermissionKeys.HangUpdate)]
        [HttpPut("")]
        public ApiResponse Update([FromBody] UpdateHangDto dto)
        {
            try
            {
                _hangService.Update(dto);
                return new();
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }

        [Permission(PermissionKeys.HangDelete)]
        [HttpDelete("{id}")]
        public ApiResponse Delete([FromRoute] int id)
        {
            try
            {
                _hangService.Delete(id);
                return new();
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }

        [Permission(PermissionKeys.HangView)]
        [HttpGet("")]
        public ApiResponse FindPaging([FromQuery] FindPagingHangDto dto)
        {
            try
            {
                var data = _hangService.FindPaging(dto);
                return new(data);
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }
        [Permission(PermissionKeys.HangView)]
        [HttpGet("drop-down")]
        public ApiResponse GetDropDown()
        {
            try
            {
                var data = _hangService.GetDropDown();
                return new(data);
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }

        [Permission(PermissionKeys.HangView)]
        [HttpGet("{id}")]
        public ApiResponse FindById([FromRoute] int id)
        {
            try
            {
                var data = _hangService.GetById(id);
                return new(data);
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }
    }
}