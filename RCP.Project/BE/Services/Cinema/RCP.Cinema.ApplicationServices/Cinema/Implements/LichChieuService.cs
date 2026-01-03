using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using RCP.Cinema.ApplicationServices.Cinema.Interfaces;
using RCP.Cinema.ApplicationServices.Common;
using RCP.Cinema.Dtos.LichChieu;
using RCP.Cinema.Infrastructure;
using RCP.Movie.Infrastructure;
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
    public class LichChieuService : BaseCinemaService, ILichChieuService
    {
        private readonly PhimDbContext _phimDbContext;
        public LichChieuService(
            CinemaDbContext cinemaDbContext,
            PhimDbContext phimDbContext,
            ILogger<LichChieuService> logger,
            IHttpContextAccessor httpContextAccessor,
            IMapper mapper)
            : base(cinemaDbContext, logger, httpContextAccessor, mapper)
        {
            _phimDbContext = phimDbContext;
        }

        public void AddPhimToCinemaRoom(AddPhimToCinemaRoomDto dto)
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
            _cinemaDbContext.CinemaRoomMovieInfor.Add(infor);
            _cinemaDbContext.SaveChanges();
        }
        public void UpdatePhimToCinemaRoom(UpdatePhimToCinemaRoomDto dto)
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

            var infor = _cinemaDbContext.CinemaRoomMovieInfor.FirstOrDefault(i => i.Id == dto.Id && !i.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.NotFound);

            infor.ThoiGianBatDauChieu = dto.ThoiGianBatDauChieu;
            infor.ThoiGianKetThucChieu = dto.ThoiGianKetThucChieu;


            _cinemaDbContext.CinemaRoomMovieInfor.Update(infor);
            _cinemaDbContext.SaveChanges();
        }

        public void DeletePhimToCinemaRoom(int id)
        {

            _logger.LogInformation($"{nameof(DeletePhimToCinemaRoom)} ");
            var vietNamNow = GetVietnamTime();
            var currentUserId = getCurrentUserId();



            var infor = _cinemaDbContext.CinemaRoomMovieInfor.FirstOrDefault(i => i.Id == id && !i.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.NotFound);
            infor.Deleted = true;
            infor.DeletedBy = currentUserId;
            infor.DeletedDate = vietNamNow;
            _cinemaDbContext.CinemaRoomMovieInfor.Update(infor);
            _cinemaDbContext.SaveChanges();

        }
        public GetByIdLichChieuDto GetById(int id)
        {
            _logger.LogInformation($"{nameof(GetById)} id = {id}");

            var infor = _cinemaDbContext.CinemaRoomMovieInfor.FirstOrDefault(i => i.Id == id && !i.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.NotFound);

            var cinema = _cinemaDbContext.Cinemas.FirstOrDefault(c => c.Id == infor.IdCinema && !c.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.CinemaErrorNotFound);

            var room = _cinemaDbContext.Rooms.FirstOrDefault(r => r.Id == infor.IdRoom && !r.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.RoomErrorNotFound);

            var phim = _phimDbContext.Phims.FirstOrDefault(p => p.Id == infor.IdPhim && !p.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.NotFound);

            var result = new GetByIdLichChieuDto
            {
                Cinema = new ViewCinemaLichChieu
                {
                    IdCinema = cinema.Id,
                    Name = cinema.Name
                },
                Room = new ViewRoomLichChieu
                {
                    IdRoom = room.Id,
                    Name = room.Name
                },
                Phim = new ViewPhimLichChieu
                {
                    IdPhim = phim.Id,
                    TenPhim = phim.TenPhim
                },
                ThoiGianBatDauChieu = infor.ThoiGianBatDauChieu,
                ThoiGianKetThucChieu = infor.ThoiGianKetThucChieu
            };

            return result;
        }

        public BaseResponsePagingDto<ViewPhimToCinemaRoomDto> FindPagingCinemaRoomMovie(FindPagingCinemaRoomPhimDto dto)
        {
            _logger.LogInformation($"{nameof(FindPagingCinemaRoomMovie)} dto = {JsonSerializer.Serialize(dto)}");

            var crmQuery = _cinemaDbContext.CinemaRoomMovieInfor
                        .Where(crm => !crm.Deleted);

            if (dto.IdCinema != null && dto.IdCinema.Any())
            {
                crmQuery = crmQuery.Where(crm => dto.IdCinema.Contains(crm.IdCinema));
            }

            if (dto.IdRoom != null && dto.IdRoom.Any())
            {
                crmQuery = crmQuery.Where(crm => dto.IdRoom.Contains(crm.IdRoom));
            }

            if (dto.TuNgay.HasValue)
            {
                crmQuery = crmQuery.Where(crm => crm.ThoiGianBatDauChieu >= dto.TuNgay.Value);
            }

            if (dto.DenNgay.HasValue)
            {
                crmQuery = crmQuery.Where(crm => crm.ThoiGianKetThucChieu <= dto.DenNgay.Value);
            }

            crmQuery = crmQuery.OrderBy(crm => crm.Id);

            var totalItems = crmQuery.Count();

            if (totalItems == 0)
            {
                return null;
            }

            var crmData = crmQuery.Paging(dto).ToList();

            var cinemaIds = crmData.Select(crm => crm.IdCinema).Distinct().ToList();
            var roomIds = crmData.Select(crm => crm.IdRoom).Distinct().ToList();
            var phimIds = crmData.Select(crm => crm.IdPhim).Distinct().ToList();

            var cinemas = _cinemaDbContext.Cinemas
                .Where(c => cinemaIds.Contains(c.Id) && !c.Deleted)
                .ToList();

            var rooms = _cinemaDbContext.Rooms
                .Where(r => roomIds.Contains(r.Id) && !r.Deleted)
                .ToList();

            var phimsQuery = _phimDbContext.Phims
                        .Where(p => !p.Deleted && phimIds.Contains(p.Id));

            if (!string.IsNullOrEmpty(dto.Keyword))
            {
                phimsQuery = phimsQuery.Where(p =>
                    p.TenPhim.Contains(dto.Keyword)
                    || p.DaoDien.Contains(dto.Keyword)
                    || p.DienVien.Contains(dto.Keyword));
            }

            if (dto.IdTheLoai != null && dto.IdTheLoai.Any())
            {
                var phimTheLoais = _phimDbContext.PhimTheLoais
                    .Where(ptl => dto.IdTheLoai.Contains(ptl.TheLoaiId))
                    .Select(ptl => ptl.PhimId)
                    .Distinct()
                    .ToList();

                phimsQuery = phimsQuery.Where(p => phimTheLoais.Contains(p.Id));
            }

            var phims = phimsQuery.ToList();

            var phimAnhs = _phimDbContext.PhimAnhs
                .Where(a => phimIds.Contains(a.PhimId))
                .ToList();

            var items = crmData
                .GroupBy(crm => new { crm.IdCinema, crm.IdRoom })
                .Select(group => new ViewPhimToCinemaRoomDto
                {
                    Cinema = new ViewCinema
                    {
                        IdCinema = group.Key.IdCinema,
                        Name = cinemas.FirstOrDefault(c => c.Id == group.Key.IdCinema)?.Name ?? string.Empty
                    },
                    Room = new ViewRoom
                    {
                        IdRoom = group.Key.IdRoom,
                        Name = rooms.FirstOrDefault(r => r.Id == group.Key.IdRoom)?.Name ?? string.Empty
                    },
                    Movies = group.Join(phims,
                        crm => crm.IdPhim,
                        p => p.Id,
                        (crm, p) => new ViewPhimCinemaDto
                        {
                            IdCinemaRoomMovie = crm.Id,
                            IdPhim = p.Id,
                            TenPhim = p.TenPhim,
                            MoTa = p.MoTa,
                            DaoDien = p.DaoDien,
                            DienVien = p.DienVien,
                            ThoiLuongPhut = p.ThoiLuongPhut,
                            NgayKhoiChieu = p.NgayKhoiChieu,
                            NgonNgu = p.NgonNgu,
                            PhanLoaiDoTuoi = p.PhanLoaiDoTuoi,
                            DangChieu = p.DangChieu,
                            ThoiGianBatDauChieu = crm.ThoiGianBatDauChieu,
                            ThoiGianKetThucChieu = crm.ThoiGianKetThucChieu,
                            AnhCinema = phimAnhs
                                .Where(a => a.PhimId == p.Id)
                                .Select(a => new ViewPhimAnhCinemaDto
                                {
                                    Id = a.Id,
                                    IdPhim = a.PhimId,
                                    Url = a.Url,
                                    LoaiAnh = a.LoaiAnh,
                                    LaAnhChinh = a.LaAnhChinh
                                }).ToList()
                        }).ToList()
                })
                .ToList();

            var response = new BaseResponsePagingDto<ViewPhimToCinemaRoomDto>
            {
                Items = items,
                TotalItems = totalItems
            };

            return response;
        }


    }
}
