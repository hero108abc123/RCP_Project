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
        public async Task<ApiResponse> Create([FromForm]CreateCinemaDto dto)
        {
            try
            {
                await _cinemaService.Create(dto);
                return new();
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }

        [Permission(PermissionKeys.CinemaView)]
        [HttpGet("")]
        public ApiResponse Find([FromQuery] FindPagingDto dto)
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

        [Permission(PermissionKeys.CinemaView)]
        [HttpGet("{id}")]
        public ApiResponse FindById([FromRoute] int id)
        {
            try
            {
                var data = _cinemaService.FindById(id);
                return new(data);
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }

        [Permission(PermissionKeys.CinemaUpdate)]
        [HttpPut("")]
        public async Task<ApiResponse> Update([FromForm] UpdateCinemaDto dto)
        {
            try
            {
                await _cinemaService.Update(dto);
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
        [HttpDelete("phim-to-cinema/{id}")]
        public ApiResponse DeletePhimToCinemaRoom([FromRoute] int id)
        {
            try
            {
                _cinemaService.DeletePhimToCinemaRoom(id);
                return new();
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }

        [Permission(PermissionKeys.CinemaView)]
        [HttpGet("phim-to-cinema")]
        public ApiResponse FindPagingPhimRoomCinema([FromQuery] FindPagingCinemaRoomPhimDto dto)
        {
            try
            {
                var data = _cinemaService.FindPagingCinemaRoomMovie(dto);
                return new(data);
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }
    }
}
