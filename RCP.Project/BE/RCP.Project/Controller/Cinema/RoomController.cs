using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using RCP.Project.Attributes;
using RCP.Project.Controller.Base;
using RCP.Project.HttpRequest;
using RCP.Shared.Constant.Constants.Auth;
using RCP.Cinema.ApplicationServices.Cinema.Interfaces;
using RCP.Cinema.Dtos.Room;

namespace RCP.Project.Controller.Room
{
    [Route("api/app/room")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class RoomController: BaseController
    {
        private readonly IRoomService _roomService;
        public RoomController(ILogger<RoomController> logger, IRoomService roomService) : base(logger)
        {
            _roomService = roomService;
        }

        [Permission(PermissionKeys.RoomAdd)]
        [HttpPost("")]
        public ApiResponse Create(CreateRoomDto dto)
        {
            try
            {
                _roomService.Create(dto);
                return new();
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }

        [Permission(PermissionKeys.RoomView)]
        [HttpGet("")]
        public ApiResponse Find(FindPagingRoomDto dto)
        {
            try
            {
                var data = _roomService.Find(dto);
                return new(data);
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }

        [Permission(PermissionKeys.RoomUpdate)]
        [HttpPut("")]
        public ApiResponse Update(UpdateRoomDto dto)
        {
            try
            {
                _roomService.Update(dto);
                return new();
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }

        [Permission(PermissionKeys.RoomDelete)]
        [HttpDelete("{id}/cinema/{idCinema}")]
        public ApiResponse Delete([FromRoute]int idCinema,[FromRoute]int id)
        {
            try
            {
                _roomService.Delete(idCinema,id);
                return new();
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }
    }
}
