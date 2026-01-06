using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using RCP.Cinema.Infrastructure;
using RCP.Menu.ApplicationService.MenuModule.Abstracts;
using RCP.Menu.Dtos.ThongKe;
using RCP.Menu.Infrastructure;
using RCP.Movie.ApplicationServices.Common;
using RCP.Project.HttpRequest.BaseRequest;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace RCP.Menu.ApplicationService.MenuModule.Implements
{
    public class ThongKeService : BaseMenuService, IThongKeService
    {
        private readonly CinemaDbContext _cinemaDbContext;
        public ThongKeService(
            MenuDbContext menuDbContext,
            ILogger<BaseMenuService> logger,
            IHttpContextAccessor httpContextAccessor,
            CinemaDbContext cinemaDbContext,
            IMapper mapper)
            : base(menuDbContext, logger, httpContextAccessor, mapper)
        {
            _cinemaDbContext = cinemaDbContext;
        }

        public BaseResponsePagingDto<ViewThongKeDto> FindPaging(FindPagingThongKeDto dto)
        {
            _logger.LogInformation($"{nameof(FindPaging)} dto = {JsonSerializer.Serialize(dto)}");

            var thongKeQuery = _menuDbContext.ThongKeKhos
                .Where(tk => !tk.Deleted);

            if (dto.IdKho.HasValue)
            {
                thongKeQuery = thongKeQuery.Where(tk => tk.IdKho == dto.IdKho.Value);
            }

            if (dto.IdMatHang.HasValue)
            {
                thongKeQuery = thongKeQuery.Where(tk => tk.IdMatHang == dto.IdMatHang.Value);
            }

            if (dto.NgayNhap.HasValue)
            {
                var ngayNhapDate = dto.NgayNhap.Value.Date;
                thongKeQuery = thongKeQuery.Where(tk => tk.NgayNhap.Date == ngayNhapDate);
            }

            thongKeQuery = thongKeQuery.OrderByDescending(tk => tk.NgayNhap);

            var total = thongKeQuery.Count();

            var thongKeList = thongKeQuery.Paging(dto).ToList();

            var khoIds = thongKeList.Select(tk => tk.IdKho).Distinct().ToList();
            var matHangIds = thongKeList.Select(tk => tk.IdMatHang).Distinct().ToList();

            var khos = _menuDbContext.Khos
                .Where(k => !k.Deleted && khoIds.Contains(k.Id))
                .ToList();

            var matHangs = _menuDbContext.MatHangs
                .Where(m => !m.Deleted && matHangIds.Contains(m.Id))
                .ToList();

            var cinemaIds = khos.Select(k => k.IdCinema).Distinct().ToList();

            var cinemas = _cinemaDbContext.Cinemas
                .Where(c => !c.Deleted && cinemaIds.Contains(c.Id))
                .ToList();

            if (dto.IdCinema.HasValue)
            {
                var khoFilteredIds = khos
                    .Where(k => k.IdCinema == dto.IdCinema.Value)
                    .Select(k => k.Id)
                    .ToList();

                thongKeList = thongKeList.Where(tk => khoFilteredIds.Contains(tk.IdKho)).ToList();
            }

            var items = thongKeList.Select(tk =>
            {
                var kho = khos.FirstOrDefault(k => k.Id == tk.IdKho);
                var cinema = kho != null ? cinemas.FirstOrDefault(c => c.Id == kho.IdCinema) : null;
                var matHang = matHangs.FirstOrDefault(m => m.Id == tk.IdMatHang);

                return new ViewThongKeDto
                {
                    Id = tk.Id,
                    SoLuongNhap = tk.SoLuongNhap,
                    DonGiaNhap = tk.DonGiaNhap,
                    TongGiaTriNhapHang = tk.TongGiaTriNhapHang,
                    NgayNhap = tk.NgayNhap,
                    Cinema = new ViewCinemaKho
                    {
                        Id = cinema?.Id ?? 0,
                        Name = cinema?.Name ?? string.Empty
                    },
                    Kho = new ViewKho
                    {
                        Id = kho?.Id ?? 0,
                        TenKho = kho?.TenKho ?? string.Empty
                    },
                    MatHang = new ViewMatHang
                    {
                        Id = matHang?.Id ?? 0,
                        TenMon = matHang?.TenMon ?? string.Empty
                    }
                };
            }).ToList();

            return new BaseResponsePagingDto<ViewThongKeDto>
            {
                Items = items,
                TotalItems = total
            };
        }
    }
}