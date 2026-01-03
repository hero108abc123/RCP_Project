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
using RCP.Shared.Constant.Constants.Cinema;
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


        public void Create(CreateRoomDto dto)
        {
            _logger.LogInformation($"{nameof(Create)} dto={JsonSerializer.Serialize(dto)}");
            var currentUserId = getCurrentUserId();
            var vietNamNow = GetVietnamTime();
            var cinema = _cinemaDbContext.Cinemas.FirstOrDefault(x => x.Id == dto.IdCinema && !x.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.CinemaErrorNotFound);


            if (dto.TongSoLuongGhe < dto.SoLuongGheDoi + dto.SoLuongGheThuong)
            {
                throw new UserFriendlyException(ErrorCodes.RoomErrorInvalidTongSoLuongGhe);
            }
            else if (dto.TongSoLuongGhe > dto.SoLuongGheDoi + dto.SoLuongGheThuong)
            {

                throw new UserFriendlyException(ErrorCodes.RoomErrorInvalidTongSoLuongGhe);

            }
            else if (dto.TongSoLuongGhe == dto.SoLuongGheDoi + dto.SoLuongGheThuong)
            {

                var room = new Domain.Room
                {
                    IdCinema = dto.IdCinema,
                    Name = dto.Name,
                    Description = dto.Description,
                    Location = dto.Location,
                    TongSoLuongGhe = dto.TongSoLuongGhe,
                    SoLuongGheDoi = dto.SoLuongGheDoi,
                    SoLuongGheThuong = dto.SoLuongGheThuong,
                    //SoLuongGheVip = dto.SoLuongGheVip,
                    SoLuongGheThuongMoiHang = dto.SoLuongGheThuongMoiHang,
                    SoLuongGheDoiMoiHang = dto.SoLuongGheDoiMoiHang,
                    CreatedBy = currentUserId,
                    CreatedDate = vietNamNow,
                };
                _cinemaDbContext.Rooms.Add(room);
                _cinemaDbContext.SaveChanges();

                var danhSachGhe = new List<Domain.Ghe>(dto.TongSoLuongGhe);
                int hangHienTai = 0;

                // Tạo ghế thường trước
                if (dto.SoLuongGheThuong > 0 && dto.SoLuongGheThuongMoiHang > 0)
                {
                    int soHangGheThuong = (int)Math.Ceiling((double)dto.SoLuongGheThuong / dto.SoLuongGheThuongMoiHang);
                    int soGheConLai = dto.SoLuongGheThuong;

                    for (int i = 0; i < soHangGheThuong; i++)
                    {
                        char chuCaiHang = (char)('A' + hangHienTai);
                        string hang = chuCaiHang.ToString();
                        int soGheTrongHang = Math.Min(dto.SoLuongGheThuongMoiHang, soGheConLai);

                        for (int j = 1; j <= soGheTrongHang; j++)
                        {
                            danhSachGhe.Add(new Domain.Ghe
                            {
                                IdCinema = dto.IdCinema,
                                IdRoom = room.Id,
                                Name = $"{chuCaiHang}{j}",
                                Hang = hang,
                                HangGhe = GheConstants.Thuong,
                                CreatedBy = currentUserId,
                                CreatedDate = vietNamNow,
                            });
                        }

                        soGheConLai -= soGheTrongHang;
                        hangHienTai++;
                    }
                }

                // Tạo ghế đôi sau ghế thường
                if (dto.SoLuongGheDoi > 0 && dto.SoLuongGheDoiMoiHang > 0)
                {
                    int soHangGheDoi = (int)Math.Ceiling((double)dto.SoLuongGheDoi / dto.SoLuongGheDoiMoiHang);
                    int soGheConLai = dto.SoLuongGheDoi;

                    for (int i = 0; i < soHangGheDoi; i++)
                    {
                        char chuCaiHang = (char)('A' + hangHienTai);
                        string hang = chuCaiHang.ToString();
                        int soGheTrongHang = Math.Min(dto.SoLuongGheDoiMoiHang, soGheConLai);

                        for (int j = 1; j <= soGheTrongHang; j++)
                        {
                            danhSachGhe.Add(new Domain.Ghe
                            {
                                IdCinema = dto.IdCinema,
                                IdRoom = room.Id,
                                Name = $"{chuCaiHang}{j}",
                                Hang = hang,
                                HangGhe = GheConstants.Doi,
                                CreatedBy = currentUserId,
                                CreatedDate = vietNamNow,
                            });
                        }

                        soGheConLai -= soGheTrongHang;
                        hangHienTai++;
                    }
                }

                // Insert bulk 1 lần duy nhất
                _cinemaDbContext.Ghes.AddRange(danhSachGhe);
                _cinemaDbContext.SaveChanges();

       
                var danhSachGiaVe = _cinemaDbContext.GiaVes
                    .Where(x => !x.Deleted)
                    .ToList();

                var danhSachGheGiaVe = new List<Domain.GheGiaVe>();

                foreach (var ghe in danhSachGhe)
                {
                    var giaVeList = danhSachGiaVe.Where(x => x.HangGhe == ghe.HangGhe).ToList();

                    foreach (var giaVe in giaVeList)
                    {
                        danhSachGheGiaVe.Add(new Domain.GheGiaVe
                        {
                            IdGhe = ghe.Id,
                            IdGiaVe = giaVe.Id,
                            CreatedBy = currentUserId,
                            CreatedDate = vietNamNow,
                        });
                    }
                }

                if (danhSachGheGiaVe.Any())
                {
                    _cinemaDbContext.GheGiaVes.AddRange(danhSachGheGiaVe);
                    _cinemaDbContext.SaveChanges();
                }
            }
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

            if (dto.TongSoLuongGhe < dto.SoLuongGheDoi + dto.SoLuongGheThuong)
            {
                throw new UserFriendlyException(ErrorCodes.RoomErrorInvalidTongSoLuongGhe);
            }
            else if (dto.TongSoLuongGhe > dto.SoLuongGheDoi + dto.SoLuongGheThuong)
            {
                throw new UserFriendlyException(ErrorCodes.RoomErrorInvalidTongSoLuongGhe);
            }
            else if (dto.TongSoLuongGhe == dto.SoLuongGheDoi + dto.SoLuongGheThuong)
            {

                room.Location = dto.Location;
                room.Name = dto.Name;
                room.Description = dto.Description;
                room.TongSoLuongGhe = dto.TongSoLuongGhe;
                room.SoLuongGheDoi = dto.SoLuongGheDoi;
                room.SoLuongGheThuong = dto.SoLuongGheThuong;
                room.SoLuongGheThuongMoiHang = dto.SoLuongGheThuongMoiHang;
                room.SoLuongGheDoiMoiHang = dto.SoLuongGheDoiMoiHang;
                room.ModifiedBy = currentUserId;
                room.ModifiedDate = vietNamNow;

                _cinemaDbContext.Rooms.Update(room);


                var ghesCu = _cinemaDbContext.Ghes.Where(g => g.IdRoom == room.Id && !g.Deleted).ToList();
                var idGhesCu = ghesCu.Select(g => g.Id).ToList();

                // Xóa GheGiaVe cũ trước
                var gheGiaVeCu = _cinemaDbContext.GheGiaVes.Where(x => idGhesCu.Contains(x.IdGhe) && !x.Deleted).ToList();
                _cinemaDbContext.GheGiaVes.RemoveRange(gheGiaVeCu);

                // Xóa ghế cũ
                _cinemaDbContext.Ghes.RemoveRange(ghesCu);


                var danhSachGhe = new List<Domain.Ghe>(dto.TongSoLuongGhe);
                int hangHienTai = 0;

                // Tạo ghế thường trước
                if (dto.SoLuongGheThuong > 0 && dto.SoLuongGheThuongMoiHang > 0)
                {
                    int soHangGheThuong = (int)Math.Ceiling((double)dto.SoLuongGheThuong / dto.SoLuongGheThuongMoiHang);
                    int soGheConLai = dto.SoLuongGheThuong;

                    for (int i = 0; i < soHangGheThuong; i++)
                    {
                        char chuCaiHang = (char)('A' + hangHienTai);
                        string hang = chuCaiHang.ToString();
                        int soGheTrongHang = Math.Min(dto.SoLuongGheThuongMoiHang, soGheConLai);

                        for (int j = 1; j <= soGheTrongHang; j++)
                        {
                            danhSachGhe.Add(new Domain.Ghe
                            {
                                IdCinema = dto.IdCinema,
                                IdRoom = room.Id,
                                Name = $"{chuCaiHang}{j}",
                                Hang = hang,
                                HangGhe = GheConstants.Thuong,
                                CreatedBy = currentUserId,
                                CreatedDate = vietNamNow,
                            });
                        }

                        soGheConLai -= soGheTrongHang;
                        hangHienTai++;
                    }
                }

                // Tạo ghế đôi sau ghế thường
                if (dto.SoLuongGheDoi > 0 && dto.SoLuongGheDoiMoiHang > 0)
                {
                    int soHangGheDoi = (int)Math.Ceiling((double)dto.SoLuongGheDoi / dto.SoLuongGheDoiMoiHang);
                    int soGheConLai = dto.SoLuongGheDoi;

                    for (int i = 0; i < soHangGheDoi; i++)
                    {
                        char chuCaiHang = (char)('A' + hangHienTai);
                        string hang = chuCaiHang.ToString();
                        int soGheTrongHang = Math.Min(dto.SoLuongGheDoiMoiHang, soGheConLai);

                        for (int j = 1; j <= soGheTrongHang; j++)
                        {
                            danhSachGhe.Add(new Domain.Ghe
                            {
                                IdCinema = dto.IdCinema,
                                IdRoom = room.Id,
                                Name = $"{chuCaiHang}{j}",
                                Hang = hang,
                                HangGhe = GheConstants.Doi,
                                CreatedBy = currentUserId,
                                CreatedDate = vietNamNow,
                            });
                        }

                        soGheConLai -= soGheTrongHang;
                        hangHienTai++;
                    }
                }

                // Insert bulk danh sách ghế mới
                _cinemaDbContext.Ghes.AddRange(danhSachGhe);
                _cinemaDbContext.SaveChanges();

                var danhSachGiaVe = _cinemaDbContext.GiaVes
                    .Where(x => !x.Deleted)
                    .ToList();

                var danhSachGheGiaVe = new List<Domain.GheGiaVe>();

                foreach (var ghe in danhSachGhe)
                {
                    var giaVeList = danhSachGiaVe.Where(x => x.HangGhe == ghe.HangGhe).ToList();

                    foreach (var giaVe in giaVeList)
                    {
                        danhSachGheGiaVe.Add(new Domain.GheGiaVe
                        {
                            IdGhe = ghe.Id,
                            IdGiaVe = giaVe.Id,
                            CreatedBy = currentUserId,
                            CreatedDate = vietNamNow,
                        });
                    }
                }

                // Insert bulk GheGiaVe
                if (danhSachGheGiaVe.Any())
                {
                    _cinemaDbContext.GheGiaVes.AddRange(danhSachGheGiaVe);
                    _cinemaDbContext.SaveChanges();
                }
            }
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
            var room = _cinemaDbContext.Rooms.FirstOrDefault(r => r.Id == id && r.IdCinema == idCinema && !r.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.RoomErrorNotFound);
            room.Deleted = true;
            room.DeletedDate = vietNamNow;
            room.DeletedBy = currentUserId;
            _cinemaDbContext.Rooms.Update(room);
            var cinemaRoomMovieInfors = _cinemaDbContext.CinemaRoomMovieInfor
                .Where(x => x.IdRoom == id && !x.Deleted)
                .ToList();
            foreach (var infor in cinemaRoomMovieInfors)
            {
                infor.Deleted = true;
                infor.DeletedDate = vietNamNow;
                infor.DeletedBy = currentUserId;
            }
            _cinemaDbContext.CinemaRoomMovieInfor.UpdateRange(cinemaRoomMovieInfors);
            var ghes = _cinemaDbContext.Ghes
                .Where(g => g.IdRoom == id && !g.Deleted)
                .ToList();
            var idGhes = ghes.Select(g => g.Id).ToList();

            var gheGiaVes = _cinemaDbContext.GheGiaVes
                .Where(x => idGhes.Contains(x.IdGhe) && !x.Deleted)
                .ToList();
            foreach (var gheGiaVe in gheGiaVes)
            {
                gheGiaVe.Deleted = true;
                gheGiaVe.DeletedDate = vietNamNow;
                gheGiaVe.DeletedBy = currentUserId;
            }
            _cinemaDbContext.GheGiaVes.UpdateRange(gheGiaVes);

            foreach (var ghe in ghes)
            {
                ghe.Deleted = true;
                ghe.DeletedDate = vietNamNow;
                ghe.DeletedBy = currentUserId;
            }
            _cinemaDbContext.Ghes.UpdateRange(ghes);
            _cinemaDbContext.SaveChanges();
        }

        public ViewRoomDto FindById (int idCinema,int id)
        {
            _logger.LogInformation($"{nameof(FindById)}");
            var room = _cinemaDbContext.Rooms.FirstOrDefault (r => r.Id == id && r.IdCinema == idCinema && !r.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.RoomErrorNotFound);

            var result = new ViewRoomDto
            {
                Id = room.Id,
                Name = room.Name,
                Description = room.Description,
                Location = room.Location,
                TongSoLuongGhe = room.TongSoLuongGhe,
                SoLuongGheThuong = room.SoLuongGheThuong,
                SoLuongGheDoi = room.SoLuongGheDoi,
                //SoLuongGheVip = room.SoLuongGheVip,

            };

            return result;
        }

        private async Task<int> CheckLoaiNgay()
        {
            var today = GetVietnamTime().Date;
            var dayOfWeek = today.DayOfWeek;

            if (dayOfWeek == DayOfWeek.Sunday || dayOfWeek == DayOfWeek.Saturday)
            {
                return GiaVeConstants.CuoiTuan;
            }

            try
            {
                using var httpClient = new HttpClient();
                var url = $"https://date.nager.at/api/v3/publicholidays/{today.Year}/VN";
                var response = await httpClient.GetStringAsync(url);
                var holidays = JsonSerializer.Deserialize<List<Holiday>>(response);

                var isHoliday = holidays.Any(h => DateTime.Parse(h.Date).Date == today);
                if (isHoliday)
                {
                    return GiaVeConstants.NgayLe;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Loi o ham check loai ngay");
            }

            return GiaVeConstants.NgayThuong;
        }


        public async Task UpdateTrangThaiNgayGiaVe()
        {
            _logger.LogInformation($"{nameof(UpdateTrangThaiNgayGiaVe)}");
            var vietNamNow = GetVietnamTime();
            try
            {
                var loaiNgay = await CheckLoaiNgay();


                var danhSachGiaVe = _cinemaDbContext.GiaVes
                    .Where(g => !g.Deleted)
                    .ToList();

                foreach( var giaVe  in danhSachGiaVe)
                {
                    if(giaVe.TrangThaiNgay != loaiNgay)
                    {
                        giaVe.TrangThaiNgay = loaiNgay;
                        giaVe.ModifiedDate = vietNamNow;
                        giaVe.ModifiedBy = "SYSTEM_CRONJOB";

                    }
                }

                _cinemaDbContext.GiaVes.UpdateRange(danhSachGiaVe);
                _cinemaDbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"{nameof(UpdateTrangThaiNgayGiaVe)} - Lỗi khi cập nhật trạng thái ngày");
            }
        }

        public BaseResponsePagingDto<ViewGheInRoomDto> FindPagingGheInRoom(FindPagingGheInRoomDto dto)
        {
            _logger.LogInformation($"{nameof(FindPagingGheInRoom)} dto = {JsonSerializer.Serialize(dto)}");
            var query = from g in _cinemaDbContext.Ghes
                        where !g.Deleted && g.IdCinema == dto.IdCinema && g.IdRoom == dto.IdRoom
                        join ggv in _cinemaDbContext.GheGiaVes on g.Id equals ggv.IdGhe into ggvGroup
                        from ggv in ggvGroup.Where(x => !x.Deleted).DefaultIfEmpty()
                        join gv in _cinemaDbContext.GiaVes on ggv.IdGiaVe equals gv.Id into gvGroup
                        from gv in gvGroup.Where(x => !x.Deleted).DefaultIfEmpty()
                        orderby g.Hang, g.Id
                        select new ViewGheInRoomDto
                        {
                            Id = g.Id,
                            Name = g.Name,
                            Hang = g.Hang,
                            HangGhe = g.HangGhe,
                            Giave = gv != null ? new ViewGiaVeCuaGheDto
                            {
                                Id = gv.Id,
                                GiaVe = gv.TrangThaiNgay == GiaVeConstants.NgayThuong ? gv.GiaNgayThuong
                              : gv.TrangThaiNgay == GiaVeConstants.NgayLe ? gv.GiaNgayLe
                              : gv.TrangThaiNgay == GiaVeConstants.CuoiTuan ? gv.GiaCuoiTuan
                              : "0",
                            } : null 

                        };

            var data = query.Paging(dto).ToList();

            var response = new BaseResponsePagingDto<ViewGheInRoomDto>()
            {
                Items = data,
                TotalItems = query.Count(),
            };

            return response;


        }

        public void UpdateTrangThaiNgayBangTay ( UpdateTrangThaiNgayBangTayDto dto)
        {
            _logger.LogInformation($"{nameof(UpdateTrangThaiNgayBangTay)} dto = {JsonSerializer.Serialize(dto)}");
            var vietNamNow = GetVietnamTime();
            var currentUserId = getCurrentUserId();
            var giaVe = _cinemaDbContext.GiaVes.FirstOrDefault( gv => gv.Id == dto.IdGiaVe  && !gv.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.CinemaErrorGiaVeNotFound);
            giaVe.TrangThaiNgay = dto.TrangThaiNgay;
            giaVe.ModifiedBy = currentUserId;
            giaVe.ModifiedDate = vietNamNow;

            _cinemaDbContext.GiaVes.Update(giaVe);
            _cinemaDbContext.SaveChanges();


        }

        public List<GetDropDownRoomDto> GetListRoom(int idCinema)
        {
            _logger.LogInformation($"{nameof(GetListRoom)} - idCinema: {idCinema}");
            var cinema = _cinemaDbContext.Cinemas.FirstOrDefault(x => x.Id == idCinema && !x.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.CinemaErrorNotFound);
            var query = from r in _cinemaDbContext.Rooms
                        where !r.Deleted && r.IdCinema == idCinema
                        orderby r.Id
                        select r;
            var data = query.ToList();
            if (data.Count == 0)
            {
                return null;
            }
            var result = _mapper.Map<List<GetDropDownRoomDto>>(data);
            return result;
        }









    }
}
