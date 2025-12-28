using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using RCP.Cinema.ApplicationServices.Cinema.Interfaces;
using RCP.Cinema.ApplicationServices.Common;
using RCP.Cinema.Domain;
using RCP.Cinema.Dtos.Cinema;
using RCP.Cinema.Infrastructure;
using RCP.Lib.ApplicationService.Cloudinary.Implements;
using RCP.Lib.ApplicationService.Cloudinary.Interfaces;
using RCP.Lib.Domain.Dtos.Cloudinary;
using RCP.Movie.Infrastructure;
using RCP.Project.HttpRequest.AppException;
using RCP.Project.HttpRequest.BaseRequest;
using RCP.Shared.Constant.HttpRequest.Error;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.WebSockets;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace RCP.Cinema.ApplicationServices.Cinema.Implements
{
    public class CinemaService: BaseCinemaService, ICinemaService
    {
        private readonly PhimDbContext _phimDbContext;
        private readonly ICloudinaryService _cloudinaryService;
        public CinemaService(
            CinemaDbContext cinemaDbContext,
            PhimDbContext phimDbContext,
            ILogger<CinemaService> logger,
            IHttpContextAccessor httpContextAccessor,
            ICloudinaryService cloudinaryService,
            IMapper mapper)
            : base(cinemaDbContext, logger, httpContextAccessor, mapper)
        {
            _phimDbContext = phimDbContext ;
            _cloudinaryService = cloudinaryService;
        }



        public async Task Create(CreateCinemaDto dto)
        {
            _logger.LogInformation($"{nameof(Create)} dto = {JsonSerializer.Serialize(dto)}");

            var vietNamNow = GetVietnamTime();
            var currentUserId = getCurrentUserId();

            string urlAnhCinema = string.Empty;

            if (dto.FileAnhCinema != null)
            {
                var uploadResult = await _cloudinaryService.UploadImageAsync(new UploadFileDto
                {
                    File = dto.FileAnhCinema,
                    Folder = "cinemas"
                });
                urlAnhCinema = uploadResult.SecureUrl;
            }

            var cinema = new Domain.Cinema
            {
                Name = dto.Name,
                Location = dto.Location,
                City = dto.City,
                District = dto.District,
                SoLuongPhongChieu = dto.SoLuongPhongChieu,
                UrlAnhCinema = urlAnhCinema,
                CreatedBy = currentUserId,
                CreatedDate = vietNamNow,
            };

            _cinemaDbContext.Cinemas.Add(cinema);
            _cinemaDbContext.SaveChanges();
        }


        public async Task Update(UpdateCinemaDto dto)
        {
            _logger.LogInformation($"{nameof(Update)}  dto = {JsonSerializer.Serialize(dto)}");
            var currentUserId = getCurrentUserId();
            var vietNamNow = GetVietnamTime();
            string urlAnhCinema = string.Empty;

            if (dto.FileAnhCinema != null)
            {
                var uploadResult = await _cloudinaryService.UploadImageAsync(new UploadFileDto
                {
                    File = dto.FileAnhCinema,
                    Folder = "cinemas"
                });
                urlAnhCinema = uploadResult.SecureUrl;
            }

            var cinema = _cinemaDbContext.Cinemas.FirstOrDefault(x => x.Id == dto.Id && !x.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.CinemaErrorNotFound);

            cinema.Name = dto.Name;
            cinema.Location = dto.Location;
            cinema.City = dto.City;
            cinema.SoLuongPhongChieu = dto.SoLuongPhongChieu;
            cinema.ModifiedBy = currentUserId;
            cinema.ModifiedDate = vietNamNow;
            cinema.UrlAnhCinema = urlAnhCinema;
            cinema.District = dto.District;

            _cinemaDbContext.Cinemas.Update(cinema);
            _cinemaDbContext.SaveChanges();
        }

        public BaseResponsePagingDto<ViewCinemaDto> Find(FindPagingDto dto)
        {
            _logger.LogInformation($"{nameof(Find)}  dto = {JsonSerializer.Serialize(dto)}");
            var query = from c in _cinemaDbContext.Cinemas
                        where !c.Deleted
                             && (string.IsNullOrEmpty(dto.Keyword)
                             || c.Name.Contains(dto.Keyword)
                             || c.City.Contains(dto.Keyword)
                             || c.Location.Contains(dto.Keyword))
                        orderby c.Id
                        select c;
            var data = query.Paging(dto).ToList();
            var items = _mapper.Map<List<ViewCinemaDto>>(data);

            var response = new BaseResponsePagingDto<ViewCinemaDto>
            {
                Items = items,
                TotalItems = query.Count()
            };
            return response;
        }

        public ViewCinemaDto FindById (int id)
        {
            _logger.LogInformation($"{nameof(FindById)} ");
            var query = _cinemaDbContext.Cinemas.FirstOrDefault(x => x.Id == id && !x.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.CinemaErrorNotFound);

            var cinema = new ViewCinemaDto
            {
                Id = query.Id,
                Name = query.Name,
                Location = query.Location,
                City = query.City,
                District = query.District,
                SoLuongPhongChieu = query.SoLuongPhongChieu,
                UrlAnhCinema = query.UrlAnhCinema,
            };

            return cinema;
        }

        public void Delete(int id)
        {
            _logger.LogInformation($"{nameof(Delete)} id = {id}");
            var vietNamNow = GetVietnamTime();
            var currentUserId = getCurrentUserId();

            var cinema = _cinemaDbContext.Cinemas.FirstOrDefault(c => c.Id == id && !c.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.CinemaErrorNotFound);

            cinema.Deleted = true;
            cinema.DeletedDate = vietNamNow;
            cinema.DeletedBy = currentUserId;
            _cinemaDbContext.Cinemas.Update(cinema);

     
            var cinemaRooms = _cinemaDbContext.Rooms
                .Where(r => r.IdCinema == id && !r.Deleted)
                .ToList();

            foreach (var room in cinemaRooms)
            {
                room.Deleted = true;
                room.DeletedDate = vietNamNow;
                room.DeletedBy = currentUserId;
            }

            _cinemaDbContext.Rooms.UpdateRange(cinemaRooms);

            _cinemaDbContext.SaveChanges();
        }

        public void AddPhimToCinemaRoom (AddPhimToCinemaRoomDto dto)
        {
            _logger.LogInformation($"{nameof(AddPhimToCinemaRoom)}  dto = {JsonSerializer.Serialize(dto)}");
            var vietNamNow = GetVietnamTime();
            var currentUserId = getCurrentUserId();


            var cinema = _cinemaDbContext.Cinemas.FirstOrDefault(c => c.Id == dto.IdCinema && !c.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.CinemaErrorNotFound);
            var room = _cinemaDbContext.Rooms.FirstOrDefault(r => r.Id == dto.IdRoom && !r.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.RoomErrorNotFound);
            var phim = _phimDbContext.Phims.FirstOrDefault(p => p.Id == dto.IdPhim && !p.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.NotFound);

            var infor = new Domain.CinemaRoomMovieInfor
            {
                IdCinema = dto.IdCinema,
                IdRoom = dto.IdRoom,
                IdPhim = dto.IdPhim,
                ThoiGianBatDauChieu = dto.ThoiGianBatDauChieu,
                ThoiGianKetThucChieu = dto.ThoiGianKetThucChieu,
                CreatedBy = currentUserId,
                CreatedDate = vietNamNow,
            };
            _cinemaDbContext.CinemaRoomMovieInfor.Add( infor);
            _cinemaDbContext.SaveChanges();
        }
        public void UpdatePhimToCinemaRoom (UpdatePhimToCinemaRoomDto dto)
        {
            _logger.LogInformation($"{nameof(UpdatePhimToCinemaRoom)}  dto = {JsonSerializer.Serialize(dto)}");
            var vietNamNow = GetVietnamTime();
            var currentUserId = getCurrentUserId();

            var cinema = _cinemaDbContext.Cinemas.FirstOrDefault(c => c.Id == dto.IdCinema && !c.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.CinemaErrorNotFound);
            var room = _cinemaDbContext.Rooms.FirstOrDefault(r => r.Id == dto.IdRoom && !r.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.RoomErrorNotFound);
            var phim = _phimDbContext.Phims.FirstOrDefault(p => p.Id == dto.IdPhim && !p.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.NotFound);

            var infor = _cinemaDbContext.CinemaRoomMovieInfor.FirstOrDefault(i => i.IdCinema == dto.IdCinema && i.IdPhim == dto.IdPhim && i.IdRoom == dto.IdRoom && !i.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.NotFound);

            infor.ThoiGianBatDauChieu = dto.ThoiGianBatDauChieu;
            infor.ThoiGianKetThucChieu = dto.ThoiGianKetThucChieu;


            _cinemaDbContext.CinemaRoomMovieInfor.Update(infor);
            _cinemaDbContext.SaveChanges();
        }

        public void DeletePhimToCinemaRoom (DeletePhimToCinemaRoomDto dto)
        {

            _logger.LogInformation($"{nameof(DeletePhimToCinemaRoom)}  dto = {JsonSerializer.Serialize(dto)}");
            var vietNamNow = GetVietnamTime();
            var currentUserId = getCurrentUserId();

            var cinema = _cinemaDbContext.Cinemas.FirstOrDefault(c => c.Id == dto.IdCinema && !c.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.CinemaErrorNotFound);
            var room = _cinemaDbContext.Rooms.FirstOrDefault(r => r.Id == dto.IdRoom && !r.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.RoomErrorNotFound);
            var phim = _phimDbContext.Phims.FirstOrDefault(p => p.Id == dto.IdPhim && !p.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.NotFound);

            var infor = _cinemaDbContext.CinemaRoomMovieInfor.FirstOrDefault(i => i.IdCinema == dto.IdCinema && i.IdPhim == dto.IdPhim && i.IdRoom == dto.IdRoom && !i.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.NotFound);
            infor.Deleted = true;
            infor.DeletedBy = currentUserId;
            infor.CreatedDate = vietNamNow;
            _cinemaDbContext.CinemaRoomMovieInfor.Update(infor);
            _cinemaDbContext.SaveChanges();

        }


    }
}
