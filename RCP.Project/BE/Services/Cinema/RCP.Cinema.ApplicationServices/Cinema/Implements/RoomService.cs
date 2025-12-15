using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using RCP.Cinema.ApplicationServices.Cinema.Interfaces;
using RCP.Cinema.ApplicationServices.Common;
using RCP.Cinema.Dtos.Cinema;
using RCP.Cinema.Dtos.Room;
using RCP.Cinema.Infrastructure;
using RCP.Project.HttpRequest.AppException;
using RCP.Project.HttpRequest.BaseRequest;
using RCP.Shared.Constant.HttpRequest.Error;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace RCP.Cinema.ApplicationServices.Cinema.Implements
{
    public class RoomService : BaseCinemaService, IRoomService
    {
        public RoomService(
            CinemaDbContext cinemaDbContext,
            ILogger<RoomService> logger,
            IHttpContextAccessor httpContextAccessor,
            IMapper mapper)
            : base(cinemaDbContext, logger, httpContextAccessor, mapper)
        {

        }


        public void Create (CreateRoomDto dto)
        {
            _logger.LogInformation($"{nameof(Create)} dto={JsonSerializer.Serialize(dto)}");
            var currentUserId = getCurrentUserId();
            var vietNamNow = GetVietnamTime();
            var cinema = _cinemaDbContext.Cinemas.FirstOrDefault(x => x.Id == dto.IdCinema && !x.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.CinemaErrorNotFound);

            var room = new Domain.Room
            {
                IdCinema = dto.IdCinema,
                Name = dto.Name,
                Location = dto.Location,
                TongSoLuongGhe = dto.TongSoLuongGhe,
                SoLuongGheDoi = dto.SoLuongGheDoi,
                SoLuongGheThuong = dto.SoLuongGheThuong,
                SoLuongGheVip = dto.SoLuongGheVip,
                CreatedBy = currentUserId,
                CreatedDate = vietNamNow,
            };
            _cinemaDbContext.Rooms.Add(room);
            _cinemaDbContext.SaveChanges();
        }


        public void Update(UpdateRoomDto dto)
        {
            _logger.LogInformation($"{nameof(Update)} dto={JsonSerializer.Serialize(dto)}");
            var currentUserId = getCurrentUserId();
            var vietNamNow = GetVietnamTime();

            var cinema = _cinemaDbContext.Cinemas.FirstOrDefault(x => x.Id == dto.IdCinema && !x.Deleted)
                 ?? throw new UserFriendlyException(ErrorCodes.CinemaErrorNotFound);
            var room = _cinemaDbContext.Rooms.FirstOrDefault(x => x.Id == dto.Id && !x.Deleted)
                 ?? throw new UserFriendlyException(ErrorCodes.RoomErrorNotFound);
            room.Location = dto.Location;
            room.Name = dto.Name;
            room.Description = dto.Description;
            room.TongSoLuongGhe = dto.TongSoLuongGhe;
            room.SoLuongGheDoi = dto.SoLuongGheDoi;
            room.SoLuongGheThuong = dto.SoLuongGheThuong;
            room.SoLuongGheVip = dto.SoLuongGheVip;
            room.ModifiedBy = currentUserId;
            room.ModifiedDate = vietNamNow;

            _cinemaDbContext.Rooms.Update(room);
            _cinemaDbContext.SaveChanges();
        }

        public BaseResponsePagingDto<ViewRoomDto> Find (FindPagingRoomDto dto)
        {
            _logger.LogInformation($"{nameof(Find)} dto={JsonSerializer.Serialize(dto)}");
            var query = from r in _cinemaDbContext.Rooms
                        where !r.Deleted
                             && r.IdCinema == dto.IdCinema
                             && (string.IsNullOrEmpty(dto.Keyword)
                             || r.Name.Contains(dto.Keyword)
                             || r.Location.Contains(dto.Keyword))
                        orderby r.Id
                        select r;
            var data = query.Paging(dto).ToList();
            var items = _mapper.Map<List<ViewRoomDto>>(data);

            var response = new BaseResponsePagingDto<ViewRoomDto>
            {
                Items = items,
                TotalItems = query.Count()
            };
            return response;
        }

        public void Delete(int idCinema, int id)
        {
            _logger.LogInformation($"{nameof(Delete)} id = {id}, idCinema = {idCinema}");
            var vietNamNow = GetVietnamTime();
            var currentUserId = getCurrentUserId();
            var cinema = _cinemaDbContext.Cinemas.FirstOrDefault(c => c.Id == idCinema && !c.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.CinemaErrorNotFound);

            var room = _cinemaDbContext.Rooms.FirstOrDefault(r => r.Id == idCinema && !r.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.RoomErrorNotFound);
            room.Deleted = true;
            room.DeletedDate = vietNamNow;
            room.DeletedBy = currentUserId;

            _cinemaDbContext.Rooms.Update(room);
    

            _cinemaDbContext.SaveChanges();

        }
    }
}
