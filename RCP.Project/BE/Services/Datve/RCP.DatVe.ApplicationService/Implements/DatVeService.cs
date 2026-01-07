// File: RCP.DatVe.ApplicationService/Implements/DatVeService.cs
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RCP.Cinema.Infrastructure;
using RCP.DatVe.ApplicationService.Common;
using RCP.DatVe.ApplicationService.Interfaces;
using RCP.DatVe.Domain;
using RCP.DatVe.Dtos;
using RCP.DatVe.Infrastructure;
using RCP.HoaDon.Infrastructure;
using RCP.Movie.Infrastructure;
using RCP.Project.HttpRequest.AppException;
using RCP.Shared.Constant.Constants.DatVe;
using RCP.Shared.Constant.HttpRequest.Error;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace RCP.DatVe.ApplicationService.Implements
{
    public class DatVeService : BaseDatVeService, IDatVeService
    {
        private readonly CinemaDbContext _cinemaDbContext;
        private readonly PhimDbContext _phimDbContext;
        private const int PHUT_GIU_GHE = 10;
        private readonly HoaDonDbContext _hoaDonDbContext;

        public DatVeService(
            DatVeDbContext datVeDbContext,
            ILogger<DatVeService> logger,
            IHttpContextAccessor httpContextAccessor,
            CinemaDbContext cinemaDbContext,
            HoaDonDbContext hoaDonDbContext,
            PhimDbContext phimDbContext,
            IMapper mapper)
            : base(datVeDbContext, logger, httpContextAccessor, mapper)
        {
            _cinemaDbContext = cinemaDbContext;
            _hoaDonDbContext = hoaDonDbContext;
            _phimDbContext = phimDbContext;
        }

        // ==================== API 1: LẤY TRẠNG THÁI GHẾ ====================
        public async Task<List<TrangThaiGheDto>> GetTrangThaiGhe(GetTrangThaiGheDto dto)
        {
            _logger.LogInformation($"{nameof(GetTrangThaiGhe)} dto = {JsonSerializer.Serialize(dto)}");

            var vietNamNow = GetVietnamTime();
            var currentUserId = getCurrentUserId();

            var suatChieu = await _cinemaDbContext.CinemaRoomMovieInfor
                .FirstOrDefaultAsync(x => x.Id == dto.IdSuatChieu
                    && x.IdCinema == dto.IdCinema
                    && x.IdRoom == dto.IdRoom
                    && !x.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.SuatChieuNotFound);

            var ghes = await _cinemaDbContext.Ghes
                .Where(x => x.IdRoom == dto.IdRoom
                    && x.IdCinema == dto.IdCinema
                    && !x.Deleted)
                .ToListAsync();

            var gheLichChieus = await _cinemaDbContext.GheLichChieus
                .Where(x => x.IdLichChieu == dto.IdSuatChieu && !x.Deleted)
                .ToListAsync();

            var ghesDangGiu = await _datVeDbContext.GheTamGius
                .Where(x => x.IdRoom == dto.IdRoom
                    && !x.Deleted
                    && x.NgayGioHetHan > vietNamNow)
                .ToListAsync();

            var result = new List<TrangThaiGheDto>();

            foreach (var ghe in ghes)
            {
                var gheGiaVe = await _cinemaDbContext.GheGiaVes
                    .FirstOrDefaultAsync(x => x.IdGhe == ghe.Id && !x.Deleted);

                string gia = "0";
                if (gheGiaVe != null)
                {
                    var giaVe = await _cinemaDbContext.GiaVes
                        .FirstOrDefaultAsync(x => x.Id == gheGiaVe.IdGiaVe && !x.Deleted);

                    if (giaVe != null)
                    {
                        gia = giaVe.TrangThaiNgay switch
                        {
                            0 => giaVe.GiaNgayThuong,
                            1 => giaVe.GiaCuoiTuan,
                            2 => giaVe.GiaNgayLe,
                            _ => "0"
                        };
                    }
                }

                int trangThai;
                DateTime? ngayGioHetHan = null;

                var gheLichChieu = gheLichChieus.FirstOrDefault(x => x.IdGhe == ghe.Id);

                if (gheLichChieu != null && gheLichChieu.TrangThaiDatGhe == 1)
                {
                    trangThai = 1;
                }
                else
                {
                    var gheTamGiu = ghesDangGiu.FirstOrDefault(x => x.IdGhe == ghe.Id);
                    if (gheTamGiu != null)
                    {
                        trangThai = gheTamGiu.SessionId == dto.SessionId ? 3 : 2;
                        ngayGioHetHan = gheTamGiu.NgayGioHetHan;
                    }
                    else
                    {
                        trangThai = 0;
                    }
                }

                result.Add(new TrangThaiGheDto
                {
                    IdGhe = ghe.Id,
                    TenGhe = ghe.Name,
                    Hang = ghe.Hang,
                    HangGhe = ghe.HangGhe,
                    Gia = gia,
                    TrangThai = trangThai,
                    NgayGioHetHan = ngayGioHetHan
                });
            }

            return result;
        }

        // ==================== API 2: ĐẶT VÉ TẠM ====================
        public async Task<List<ViewGheTamGiuDto>> DatVeTam(DatVeTamDto dto)
        {
            _logger.LogInformation($"{nameof(DatVeTam)} dto = {JsonSerializer.Serialize(dto)}");

            var vietNamNow = GetVietnamTime();
            var currentUserId = getCurrentUserId();

            await HuyDatVeTamBySessionInternal(dto.SessionId, currentUserId);

            var suatChieu = await _cinemaDbContext.CinemaRoomMovieInfor
                .FirstOrDefaultAsync(x => x.Id == dto.IdSuatChieu
                    && x.IdCinema == dto.IdCinema
                    && x.IdRoom == dto.IdRoom
                    && x.IdPhim == dto.IdPhim
                    && !x.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.SuatChieuNotFound);

            var gheIds = dto.IdGhes.Distinct().ToList();
            var ghes = await _cinemaDbContext.Ghes
                .Where(x => gheIds.Contains(x.Id)
                    && x.IdRoom == dto.IdRoom
                    && x.IdCinema == dto.IdCinema
                    && !x.Deleted)
                .ToListAsync();

            if (ghes.Count != gheIds.Count)
            {
                throw new UserFriendlyException(ErrorCodes.GheNotFound);
            }

            var gheLichChieus = await _cinemaDbContext.GheLichChieus
                .Where(x => gheIds.Contains(x.IdGhe)
                    && x.IdLichChieu == dto.IdSuatChieu
                    && !x.Deleted)
                .ToListAsync();

            var ghesDaDat = gheLichChieus.Where(x => x.TrangThaiDatGhe == 1).Select(x => x.IdGhe).ToList();

            if (ghesDaDat.Any())
            {
                throw new UserFriendlyException(ErrorCodes.GheDaDuocDat);
            }

            var ghesDangGiuKhac = await _datVeDbContext.GheTamGius
                .Where(x => gheIds.Contains(x.IdGhe)
                    && x.IdRoom == dto.IdRoom
                    && x.SessionId != dto.SessionId
                    && !x.Deleted
                    && x.NgayGioHetHan > vietNamNow)
                .AnyAsync();

            if (ghesDangGiuKhac)
            {
                throw new UserFriendlyException(ErrorCodes.GheDangDuocGiu);
            }

            var gheTamGiuList = new List<GheTamGiu>();
            var result = new List<ViewGheTamGiuDto>();
            decimal tongGia = 0;

            foreach (var ghe in ghes)
            {
                var gheGiaVe = await _cinemaDbContext.GheGiaVes
                    .FirstOrDefaultAsync(x => x.IdGhe == ghe.Id && !x.Deleted);

                string gia = "0";
                if (gheGiaVe != null)
                {
                    var giaVe = await _cinemaDbContext.GiaVes
                        .FirstOrDefaultAsync(x => x.Id == gheGiaVe.IdGiaVe && !x.Deleted);

                    if (giaVe != null)
                    {
                        gia = giaVe.TrangThaiNgay switch
                        {
                            0 => giaVe.GiaNgayThuong,
                            1 => giaVe.GiaCuoiTuan,
                            2 => giaVe.GiaNgayLe,
                            _ => "0"
                        };
                    }
                }

                if (decimal.TryParse(gia, out var giaDecimal))
                {
                    tongGia += giaDecimal;
                }

                var gheTamGiu = new GheTamGiu
                {
                    IdGhe = ghe.Id,
                    IdRoom = dto.IdRoom,
                    IdCinema = dto.IdCinema,
                    IdPhim = dto.IdPhim,
                    IdUser = currentUserId,
                    SessionId = dto.SessionId,
                    NgayGioGiuGhe = vietNamNow,
                    NgayGioHetHan = vietNamNow.AddMinutes(PHUT_GIU_GHE),
                    CreatedBy = currentUserId,
                    CreatedDate = vietNamNow
                };

                gheTamGiuList.Add(gheTamGiu);

                var soGiayConLai = (int)(gheTamGiu.NgayGioHetHan - vietNamNow).TotalSeconds;

                result.Add(new ViewGheTamGiuDto
                {
                    IdGhe = ghe.Id,
                    TenGhe = ghe.Name,
                    Gia = gia,
                    NgayGioHetHan = gheTamGiu.NgayGioHetHan,
                    SoGiayConLai = soGiayConLai
                });
            }

            _datVeDbContext.GheTamGius.AddRange(gheTamGiuList);
            await _datVeDbContext.SaveChangesAsync();

            for (int i = 0; i < result.Count; i++)
            {
                result[i].Id = gheTamGiuList[i].Id;
            }

            if (result.Count > 0)
            {
                result[0].Gia = tongGia.ToString();
            }

            return result;
        }

        // ==================== API 3: HỦY GHẾ THEO SESSION ====================
        public async Task HuyDatVeTamBySession(string sessionId)
        {
            _logger.LogInformation($"{nameof(HuyDatVeTamBySession)} sessionId = {sessionId}");

            var currentUserId = getCurrentUserId();
            await HuyDatVeTamBySessionInternal(sessionId, currentUserId);
        }

        private async Task HuyDatVeTamBySessionInternal(string sessionId, string userId)
        {
            var vietNamNow = GetVietnamTime();

            var gheTamGius = await _datVeDbContext.GheTamGius
                .Where(x => x.SessionId == sessionId && !x.Deleted)
                .ToListAsync();

            if (gheTamGius.Any())
            {
                foreach (var ghe in gheTamGius)
                {
                    ghe.Deleted = true;
                    ghe.DeletedBy = userId;
                    ghe.DeletedDate = vietNamNow;
                }

                _datVeDbContext.GheTamGius.UpdateRange(gheTamGius);
                await _datVeDbContext.SaveChangesAsync();
            }
        }

        // ==================== API 4: HỦY GHẾ ĐƠN LẺ ====================
        public async Task HuyDatVeTam(int idGheTamGiu)
        {
            _logger.LogInformation($"{nameof(HuyDatVeTam)} idGheTamGiu = {idGheTamGiu}");

            var vietNamNow = GetVietnamTime();
            var currentUserId = getCurrentUserId();

            var gheTamGiu = await _datVeDbContext.GheTamGius
                .FirstOrDefaultAsync(x => x.Id == idGheTamGiu && !x.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.GheTamGiuNotFound);

            if (gheTamGiu.IdUser != currentUserId && !string.IsNullOrEmpty(gheTamGiu.IdUser))
            {
                throw new UserFriendlyException(ErrorCodes.KhongCoQuyenHuy);
            }

            gheTamGiu.Deleted = true;
            gheTamGiu.DeletedBy = currentUserId;
            gheTamGiu.DeletedDate = vietNamNow;

            _datVeDbContext.GheTamGius.Update(gheTamGiu);
            await _datVeDbContext.SaveChangesAsync();
        }

        // ==================== API 5: XÁC NHẬN ĐẶT VÉ - USER ====================
        public async Task<int> XacNhanDatVeByUserId(XacNhanDatVeByUserIdDto dto)
        {
            _logger.LogInformation($"{nameof(XacNhanDatVeByUserId)} dto = {JsonSerializer.Serialize(dto)}");

            var vietNamNow = GetVietnamTime();
            var currentUserId = getCurrentUserId();

            using var transaction = await _datVeDbContext.Database.BeginTransactionAsync();
            try
            {
                var gheTamGiuIds = dto.IdGheTamGius.Distinct().ToList();

                var gheTamGius = await _datVeDbContext.GheTamGius
                    .Where(x => gheTamGiuIds.Contains(x.Id)
                        && !x.Deleted
                        && x.NgayGioHetHan > vietNamNow)
                    .ToListAsync();

                if (gheTamGius.Count != gheTamGiuIds.Count)
                {
                    throw new UserFriendlyException(ErrorCodes.GheTamGiuKhongHopLe);
                }

                if (gheTamGius.Any(x => x.IdUser != currentUserId && !string.IsNullOrEmpty(x.IdUser)))
                {
                    throw new UserFriendlyException(ErrorCodes.KhongCoQuyenXacNhan);
                }

                var gheIds = gheTamGius.Select(x => x.IdGhe).ToList();
                var idLichChieu = gheTamGius[0].IdLichChieu;

                var gheLichChieus = await _cinemaDbContext.GheLichChieus
                    .Where(x => gheIds.Contains(x.IdGhe)
                        && x.IdLichChieu == idLichChieu
                        && !x.Deleted)
                    .ToListAsync();

                var ghesDaDat = gheLichChieus.Where(x => x.TrangThaiDatGhe == 1).Any();

                if (ghesDaDat)
                {
                    throw new UserFriendlyException(ErrorCodes.GheDaDuocDat);
                }

                decimal tongTien = 0;
                foreach (var gheTamGiu in gheTamGius)
                {
                    var gheGiaVe = await _cinemaDbContext.GheGiaVes
                        .FirstOrDefaultAsync(x => x.IdGhe == gheTamGiu.IdGhe && !x.Deleted);

                    if (gheGiaVe != null)
                    {
                        var giaVe = await _cinemaDbContext.GiaVes
                            .FirstOrDefaultAsync(x => x.Id == gheGiaVe.IdGiaVe && !x.Deleted);

                        if (giaVe != null)
                        {
                            var gia = giaVe.TrangThaiNgay switch
                            {
                                0 => giaVe.GiaNgayThuong,
                                1 => giaVe.GiaCuoiTuan,
                                2 => giaVe.GiaNgayLe,
                                _ => "0"
                            };

                            if (decimal.TryParse(gia, out var giaDecimal))
                            {
                                tongTien += giaDecimal;
                            }
                        }
                    }
                }

                var ve = new Ve
                {
                    IdUser = currentUserId,
                    IdCinema = gheTamGius[0].IdCinema,
                    IdPhim = gheTamGius[0].IdPhim,
                    IdRoom = gheTamGius[0].IdRoom,
                    IdGhe = gheIds,
                    SessionId = dto.SessionId,
                    CreatedBy = currentUserId,
                    CreatedDate = vietNamNow
                };

                _datVeDbContext.Ves.Add(ve);
                await _datVeDbContext.SaveChangesAsync();

                foreach (var gheId in gheIds)
                {
                    var gheLichChieu = gheLichChieus.FirstOrDefault(x => x.IdGhe == gheId);
                    if (gheLichChieu != null)
                    {
                        gheLichChieu.TrangThaiDatGhe = 1;
                        gheLichChieu.ModifiedBy = currentUserId;
                        gheLichChieu.ModifiedDate = vietNamNow;
                    }
                    else
                    {
                        _cinemaDbContext.GheLichChieus.Add(new RCP.Cinema.Domain.GheLichChieu
                        {
                            IdGhe = gheId,
                            IdLichChieu = idLichChieu,
                            TrangThaiDatGhe = 1,
                            CreatedBy = currentUserId,
                            CreatedDate = vietNamNow
                        });
                    }
                }

                await _cinemaDbContext.SaveChangesAsync();

                var hoaDon = new RCP.HoaDon.Domain.HoaDon
                {
                    IdCinema = ve.IdCinema,
                    IdVe = ve.Id,
                    SessionId = dto.SessionId,
                    IdUser = currentUserId,
                    TongTien = tongTien.ToString(),
                    TrangThaiThanhToan = DatVeConstants.ChuaThanhToan,
                    CreatedBy = currentUserId,
                    CreatedDate = vietNamNow
                };

                _hoaDonDbContext.HoaDons.Add(hoaDon);
                await _hoaDonDbContext.SaveChangesAsync();

                foreach (var gheTamGiu in gheTamGius)
                {
                    gheTamGiu.Deleted = true;
                    gheTamGiu.DeletedBy = currentUserId;
                    gheTamGiu.DeletedDate = vietNamNow;
                }
                _datVeDbContext.GheTamGius.UpdateRange(gheTamGius);

                var otherGheTamGiu = await _datVeDbContext.GheTamGius
                    .Where(x => gheIds.Contains(x.IdGhe)
                        && x.IdRoom == gheTamGius[0].IdRoom
                        && !gheTamGiuIds.Contains(x.Id)
                        && !x.Deleted)
                    .ToListAsync();

                foreach (var item in otherGheTamGiu)
                {
                    item.Deleted = true;
                    item.DeletedBy = currentUserId;
                    item.DeletedDate = vietNamNow;
                }
                _datVeDbContext.GheTamGius.UpdateRange(otherGheTamGiu);

                await _datVeDbContext.SaveChangesAsync();
                await transaction.CommitAsync();

                return ve.Id;
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }

        // ==================== API 6: XÁC NHẬN ĐẶT VÉ - GUEST ====================
        public async Task<int> XacNhanDatVeByUserInfor(XacNhanDatVeByUserInfor dto)
        {
            _logger.LogInformation($"{nameof(XacNhanDatVeByUserInfor)} dto = {JsonSerializer.Serialize(dto)}");

            var vietNamNow = GetVietnamTime();
            var currentUserId = getCurrentUserId();

            using var transaction = await _datVeDbContext.Database.BeginTransactionAsync();
            try
            {
                var gheTamGiuIds = dto.IdGheTamGius.Distinct().ToList();

                var gheTamGius = await _datVeDbContext.GheTamGius
                    .Where(x => gheTamGiuIds.Contains(x.Id)
                        && !x.Deleted
                        && x.NgayGioHetHan > vietNamNow)
                    .ToListAsync();

                if (gheTamGius.Count != gheTamGiuIds.Count)
                {
                    throw new UserFriendlyException(ErrorCodes.GheTamGiuKhongHopLe);
                }

                var gheIds = gheTamGius.Select(x => x.IdGhe).ToList();
                var idLichChieu = gheTamGius[0].IdLichChieu;

                var gheLichChieus = await _cinemaDbContext.GheLichChieus
                    .Where(x => gheIds.Contains(x.IdGhe)
                        && x.IdLichChieu == idLichChieu
                        && !x.Deleted)
                    .ToListAsync();

                var ghesDaDat = gheLichChieus.Where(x => x.TrangThaiDatGhe == 1).Any();

                if (ghesDaDat)
                {
                    throw new UserFriendlyException(ErrorCodes.GheDaDuocDat);
                }

                decimal tongTien = 0;
                foreach (var gheTamGiu in gheTamGius)
                {
                    var gheGiaVe = await _cinemaDbContext.GheGiaVes
                        .FirstOrDefaultAsync(x => x.IdGhe == gheTamGiu.IdGhe && !x.Deleted);

                    if (gheGiaVe != null)
                    {
                        var giaVe = await _cinemaDbContext.GiaVes
                            .FirstOrDefaultAsync(x => x.Id == gheGiaVe.IdGiaVe && !x.Deleted);

                        if (giaVe != null)
                        {
                            var gia = giaVe.TrangThaiNgay switch
                            {
                                0 => giaVe.GiaNgayThuong,
                                1 => giaVe.GiaCuoiTuan,
                                2 => giaVe.GiaNgayLe,
                                _ => "0"
                            };

                            if (decimal.TryParse(gia, out var giaDecimal))
                            {
                                tongTien += giaDecimal;
                            }
                        }
                    }
                }

                var ve = new Ve
                {
                    IdUser = null,
                    HoVaTen = dto.HoVaTen,
                    SoDienThoai = dto.SoDienThoai,
                    Email = dto.Email,
                    DiaChi = dto.DiaChi,
                    Birthday = dto.Birthday,
                    IdCinema = gheTamGius[0].IdCinema,
                    IdPhim = gheTamGius[0].IdPhim,
                    IdRoom = gheTamGius[0].IdRoom,
                    IdGhe = gheIds,
                    SessionId = dto.SessionId,
                    CreatedBy = currentUserId,
                    CreatedDate = vietNamNow
                };

                _datVeDbContext.Ves.Add(ve);
                await _datVeDbContext.SaveChangesAsync();

                foreach (var gheId in gheIds)
                {
                    var gheLichChieu = gheLichChieus.FirstOrDefault(x => x.IdGhe == gheId);
                    if (gheLichChieu != null)
                    {
                        gheLichChieu.TrangThaiDatGhe = 1;
                        gheLichChieu.ModifiedBy = currentUserId;
                        gheLichChieu.ModifiedDate = vietNamNow;
                    }
                    else
                    {
                        _cinemaDbContext.GheLichChieus.Add(new RCP.Cinema.Domain.GheLichChieu
                        {
                            IdGhe = gheId,
                            IdLichChieu = idLichChieu,
                            TrangThaiDatGhe = 1,
                            CreatedBy = currentUserId,
                            CreatedDate = vietNamNow
                        });
                    }
                }

                await _cinemaDbContext.SaveChangesAsync();

                var hoaDon = new RCP.HoaDon.Domain.HoaDon
                {
                    IdCinema = ve.IdCinema,
                    IdVe = ve.Id,
                    SessionId = dto.SessionId,
                    HoVaTen = dto.HoVaTen,
                    SoDienThoai = dto.SoDienThoai,
                    Email = dto.Email,
                    DiaChi = dto.DiaChi,
                    Birthday = dto.Birthday,
                    TongTien = tongTien.ToString(),
                    TrangThaiThanhToan = DatVeConstants.ChuaThanhToan,
                    CreatedBy = currentUserId,
                    CreatedDate = vietNamNow
                };

                _hoaDonDbContext.HoaDons.Add(hoaDon);
                await _hoaDonDbContext.SaveChangesAsync();

                foreach (var gheTamGiu in gheTamGius)
                {
                    gheTamGiu.Deleted = true;
                    gheTamGiu.DeletedBy = currentUserId;
                    gheTamGiu.DeletedDate = vietNamNow;
                }
                _datVeDbContext.GheTamGius.UpdateRange(gheTamGius);

                var otherGheTamGiu = await _datVeDbContext.GheTamGius
                    .Where(x => gheIds.Contains(x.IdGhe)
                        && x.IdRoom == gheTamGius[0].IdRoom
                        && !gheTamGiuIds.Contains(x.Id)
                        && !x.Deleted)
                    .ToListAsync();

                foreach (var item in otherGheTamGiu)
                {
                    item.Deleted = true;
                    item.DeletedBy = currentUserId;
                    item.DeletedDate = vietNamNow;
                }
                _datVeDbContext.GheTamGius.UpdateRange(otherGheTamGiu);

                await _datVeDbContext.SaveChangesAsync();
                await transaction.CommitAsync();

                return ve.Id;
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }

        // ==================== API 7: LẤY THÔNG TIN VÉ ====================
        public async Task<ViewVeDto> GetVeById(int idVe)
        {
            _logger.LogInformation($"{nameof(GetVeById)} idVe = {idVe}");

            var ve = await _datVeDbContext.Ves
                .FirstOrDefaultAsync(x => x.Id == idVe && !x.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.VeNotFound);

            var cinema = await _cinemaDbContext.Cinemas
                .FirstOrDefaultAsync(x => x.Id == ve.IdCinema && !x.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.CinemaErrorNotFound);

            var room = await _cinemaDbContext.Rooms
                .FirstOrDefaultAsync(x => x.Id == ve.IdRoom && !x.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.RoomErrorNotFound);

            var phim = await _phimDbContext.Phims
                .FirstOrDefaultAsync(x => x.Id == ve.IdPhim && !x.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.NotFound);

            var lichChieu = await _cinemaDbContext.CinemaRoomMovieInfor
                .FirstOrDefaultAsync(x => x.IdCinema == ve.IdCinema
                    && x.IdRoom == ve.IdRoom
                    && x.IdPhim == ve.IdPhim
                    && !x.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.SuatChieuNotFound);

            var ghes = await _cinemaDbContext.Ghes
                .Where(x => ve.IdGhe.Contains(x.Id) && !x.Deleted)
                .ToListAsync();

            var danhSachGhe = new List<ViewGheVe>();
            decimal tongTien = 0;

            foreach (var ghe in ghes)
            {
                var gheGiaVe = await _cinemaDbContext.GheGiaVes
                    .FirstOrDefaultAsync(x => x.IdGhe == ghe.Id && !x.Deleted);

                string gia = "0";
                if (gheGiaVe != null)
                {
                    var giaVe = await _cinemaDbContext.GiaVes
                        .FirstOrDefaultAsync(x => x.Id == gheGiaVe.IdGiaVe && !x.Deleted);

                    if (giaVe != null)
                    {
                        gia = giaVe.TrangThaiNgay switch
                        {
                            0 => giaVe.GiaNgayThuong,
                            1 => giaVe.GiaCuoiTuan,
                            2 => giaVe.GiaNgayLe,
                            _ => "0"
                        };

                        if (decimal.TryParse(gia, out var giaDecimal))
                        {
                            tongTien += giaDecimal;
                        }
                    }
                }

                danhSachGhe.Add(new ViewGheVe
                {
                    Id = ghe.Id,
                    TenGhe = ghe.Name,
                    Hang = ghe.Hang,
                    HangGhe = ghe.HangGhe,
                    Gia = gia
                });
            }

            return new ViewVeDto
            {
                Id = ve.Id,
                SessionId = ve.SessionId,
                Cinema = new ViewCinemaVe
                {
                    Id = cinema.Id,
                    Name = cinema.Name,
                    Location = cinema.Location,
                    District = cinema.District,
                    City = cinema.City
                },
                Room = new ViewRoomVe
                {
                    Id = room.Id,
                    Name = room.Name
                },
                Phim = new ViewPhimVe
                {
                    Id = phim.Id,
                    TenPhim = phim.TenPhim,
                    ThoiLuongPhut = phim.ThoiLuongPhut,
                    PhanLoaiDoTuoi = phim.PhanLoaiDoTuoi
                },
                LichChieu = new ViewLichChieuVe
                {
                    Id = lichChieu.Id,
                    ThoiGianBatDauChieu = lichChieu.ThoiGianBatDauChieu,
                    ThoiGianKetThucChieu = lichChieu.ThoiGianKetThucChieu
                },
                DanhSachGhe = danhSachGhe,
                TongTien = tongTien.ToString()
            };
        }

        // ==================== API 8: HỦY VÉ THEO SESSION ====================
        public async Task HuyVeBySessionId(HuyVeBySessionIdDto dto)
        {
            _logger.LogInformation($"{nameof(HuyVeBySessionId)} dto = {JsonSerializer.Serialize(dto)}");

            var vietNamNow = GetVietnamTime();
            var currentUserId = getCurrentUserId();

            using var transaction = await _datVeDbContext.Database.BeginTransactionAsync();
            try
            {
                var ve = await _datVeDbContext.Ves
                    .FirstOrDefaultAsync(x => x.SessionId == dto.SessionId && !x.Deleted)
                    ?? throw new UserFriendlyException(ErrorCodes.VeNotFound);

                var lichChieu = await _cinemaDbContext.CinemaRoomMovieInfor
                    .FirstOrDefaultAsync(x => x.IdCinema == ve.IdCinema
                        && x.IdRoom == ve.IdRoom
                        && x.IdPhim == ve.IdPhim
                        && !x.Deleted);

                if (lichChieu != null)
                {
                    var gheLichChieus = await _cinemaDbContext.GheLichChieus
                        .Where(x => ve.IdGhe.Contains(x.IdGhe)
                            && x.IdLichChieu == lichChieu.Id
                            && !x.Deleted)
                        .ToListAsync();

                    foreach (var gheLichChieu in gheLichChieus)
                    {
                        gheLichChieu.TrangThaiDatGhe = 0;
                        gheLichChieu.ModifiedBy = currentUserId;
                        gheLichChieu.ModifiedDate = vietNamNow;
                    }

                    _cinemaDbContext.GheLichChieus.UpdateRange(gheLichChieus);
                    await _cinemaDbContext.SaveChangesAsync();
                }

                ve.Deleted = true;
                ve.DeletedBy = currentUserId;
                ve.DeletedDate = vietNamNow;

                _datVeDbContext.Ves.Update(ve);
                await _datVeDbContext.SaveChangesAsync();

                var hoaDon = await _hoaDonDbContext.HoaDons
                    .FirstOrDefaultAsync(x => x.SessionId == dto.SessionId && !x.Deleted);

                if (hoaDon != null)
                {
                    hoaDon.Deleted = true;
                    hoaDon.DeletedBy = currentUserId;
                    hoaDon.DeletedDate = vietNamNow;

                    _hoaDonDbContext.HoaDons.Update(hoaDon);
                    await _hoaDonDbContext.SaveChangesAsync();
                }

                await transaction.CommitAsync();
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }
    }
}