using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RCP.Cinema.ApplicationServices.Cinema.Implements;
using RCP.Cinema.ApplicationServices.Cinema.Interfaces;
using RCP.Cinema.Dtos.LichChieu;
using RCP.Project.Attributes;
using RCP.Project.Controller.Base;
using RCP.Project.HttpRequest;
using RCP.Shared.Constant.Constants.Auth;

namespace RCP.Project.Controller.Cinema
{
    [Route("api/app/lich-chieu")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class LichChieuController:BaseController
    {
        private readonly ILichChieuService _lichChieuService;
        public LichChieuController(ILogger<LichChieuController> logger, ILichChieuService lichChieuService) : base(logger)
        {
            _lichChieuService = lichChieuService;
        }

        [Permission(PermissionKeys.LichChieuAdd)]
        [HttpPost("")]
        public ApiResponse AddPhimToCinemaRoom([FromBody] AddPhimToCinemaRoomDto dto)
        {
            try
            {
                _lichChieuService.AddPhimToCinemaRoom(dto);
                return new();
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }

        [Permission(PermissionKeys.LichChieuUpdate)]
        [HttpPut("")]
        public ApiResponse UpdatePhimToCinemaRoom([FromBody] UpdatePhimToCinemaRoomDto dto)
        {
            try
            {
                _lichChieuService.UpdatePhimToCinemaRoom(dto);
                return new();
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }

        [Permission(PermissionKeys.LichChieuUpdate)]
        [HttpDelete("{id}")]
        public ApiResponse DeletePhimToCinemaRoom([FromRoute] int id)
        {
            try
            {
                _lichChieuService.DeletePhimToCinemaRoom(id);
                return new();
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }

        //[Permission(PermissionKeys.LichChieuView)]
        [HttpGet("")]
        public ApiResponse FindPagingPhimRoomCinema([FromQuery] FindPagingCinemaRoomPhimDto dto)
        {
            try
            {
                var data = _lichChieuService.FindPagingCinemaRoomMovie(dto);
                return new(data);
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }

        //[Permission(PermissionKeys.LichChieuView)]
        [HttpGet("{id}")]
        public ApiResponse GetById([FromRoute] int id)
        {
            try
            {
                var data = _lichChieuService.GetById(id);
                return new(data);
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }
    }
}
