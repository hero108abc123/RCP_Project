using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RCP.Cinema.ApplicationServices.Cinema.Implements;
using RCP.Cinema.ApplicationServices.Cinema.Interfaces;
using RCP.Cinema.Dtos.Cinema;
using RCP.Cinema.Dtos.GiaVe;
using RCP.Project.Attributes;
using RCP.Project.Controller.Base;
using RCP.Project.HttpRequest;
using RCP.Shared.Constant.Constants.Auth;

namespace RCP.Project.Controller.Cinema
{
    [Route("api/app/gia-ve")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class GiaVeController : BaseController
    {
        private readonly IGiaVeService _giaVeService;
        public GiaVeController(ILogger<GiaVeController> logger, IGiaVeService giaVeService) : base(logger)
        {
            _giaVeService = giaVeService;
        }


        [Permission(PermissionKeys.GiaVeAdd)]
        [HttpPost("")]
        public ApiResponse Create([FromBody] CreateGiaVeDto dto)
        {
            try
            {
                _giaVeService.CreateGiaVe(dto);
                return new();
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }

        [Permission(PermissionKeys.GiaVeView)]
        [HttpGet("")]
        public ApiResponse Find([FromQuery] FindPagingGiaVeDto dto)
        {
            try
            {
                var data = _giaVeService.FindPagingGiaVe(dto);
                return new(data);
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }

        [Permission(PermissionKeys.GiaVeView)]
        [HttpGet("{id}")]
        public ApiResponse FindById([FromRoute] int id)
        {
            try
            {
                var data = _giaVeService.FindById(id);
                return new(data);
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }

        [Permission(PermissionKeys.GiaVeUpdate)]
        [HttpPut("")]
        public ApiResponse Update([FromBody] UpdateGiaVeDto dto)
        {
            try
            {
                _giaVeService.UpdateGiaVe(dto);
                return new();
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }



        [Permission(PermissionKeys.GiaVeDelete)]
        [HttpDelete("{id}")]
        public ApiResponse Delete([FromRoute] int id)
        {
            try
            {
                _giaVeService.DeleteGiaVe(id);
                return new();
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }
    }
}
