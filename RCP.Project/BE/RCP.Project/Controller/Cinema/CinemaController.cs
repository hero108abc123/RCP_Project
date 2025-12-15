using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RCP.Authentication.ApplicationService.UserModule.Abstracts;
using RCP.Cinema.ApplicationServices.Cinema.Interfaces;
using RCP.Cinema.Dtos.Cinema;
using RCP.Project.Attributes;
using RCP.Project.Controller.Base;
using RCP.Project.HttpRequest;
using RCP.Shared.Constant.Constants.Auth;

namespace RCP.Project.Controller.Cinema
{
    [Route("api/app/cinema")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class CinemaController:BaseController
    {
        private readonly ICinemaService _cinemaService;
        public CinemaController(ILogger<CinemaController> logger, ICinemaService cinemaService) : base(logger)
        {
            _cinemaService = cinemaService;
        }


        [Permission(PermissionKeys.CinemaAdd)]
        [HttpPost("")]
        public ApiResponse Create([FromBody]CreateCinemaDto dto)
        {
            try
            {
                _cinemaService.Create(dto);
                return new();
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }

        [Permission(PermissionKeys.CinemaView)]
        [HttpGet("")]
        public ApiResponse Find([FromBody] FindPagingDto dto)
        {
            try
            {
                var data = _cinemaService.Find(dto);
                return new(data);
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }

        [Permission(PermissionKeys.CinemaUpdate)]
        [HttpPut("")]
        public ApiResponse Update([FromBody] UpdateCinemaDto dto)
        {
            try
            {
                _cinemaService.Update(dto);
                return new();
            }catch(Exception ex)
            {
                return OkException(ex);
            }
        }

        [Permission(PermissionKeys.CinemaDelete)]
        [HttpDelete("{id}")]
        public ApiResponse Delete([FromRoute] int id)
        {
            try
            {
                _cinemaService.Delete(id);
                return new();
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }

        [Permission(PermissionKeys.CinemaAdd)]
        [HttpPost("phim-to-cinema")]
        public ApiResponse AddPhimToCinemaRoom([FromBody] AddPhimToCinemaRoomDto dto)
        {
            try
            {
                _cinemaService.AddPhimToCinemaRoom(dto);
                return new();
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }

        [Permission(PermissionKeys.CinemaUpdate)]
        [HttpPut("phim-to-cinema")]
        public ApiResponse UpdatePhimToCinemaRoom([FromBody] UpdatePhimToCinemaRoomDto dto)
        {
            try
            {
                _cinemaService.UpdatePhimToCinemaRoom(dto);
                return new();
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }

        [Permission(PermissionKeys.CinemaUpdate)]
        [HttpDelete("phim-to-cinema")]
        public ApiResponse DeletePhimToCinemaRoom([FromBody] DeletePhimToCinemaRoomDto dto)
        {
            try
            {
                _cinemaService.DeletePhimToCinemaRoom(dto);
                return new();
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }
    }
}
