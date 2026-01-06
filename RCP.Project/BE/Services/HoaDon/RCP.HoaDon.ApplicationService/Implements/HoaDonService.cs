using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RCP.HoaDon.ApplicationService.Common;
using RCP.HoaDon.ApplicationService.Interfaces;
using RCP.HoaDon.Dtos;
using RCP.HoaDon.Infrastructure;
using RCP.Menu.Infrastructure;
using RCP.Project.HttpRequest.AppException;
using RCP.Shared.Constant.HttpRequest.Error;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace RCP.HoaDon.ApplicationService.Implements
{
    public class HoaDonService : BaseHoaDonService, IHoaDonService
    {
        private readonly MenuDbContext _menuDbContext;

        public HoaDonService(
           HoaDonDbContext hoaDonDbContext,
           MenuDbContext menuDbContext,
           ILogger<HoaDonService> logger,
           IHttpContextAccessor httpContextAccessor,
           IMapper mapper)
           : base(hoaDonDbContext, logger, httpContextAccessor, mapper)
        {
            _menuDbContext = menuDbContext;
        }

        public UpdateHoaDonResponseDto Update(UpdateHoaDonDto dto)
        {
            _logger.LogInformation($"{nameof(Update)} dto = {JsonSerializer.Serialize(dto)}");

            var currentUserId = getCurrentUserId();
            var vietNamNow = GetVietnamTime();

            var hoaDon = _hoaDonDbContext.HoaDons.FirstOrDefault(x => x.Id == dto.Id && !x.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.NotFound);

            hoaDon.SessionId = dto.SessionId;
            hoaDon.IdMon = dto.IdMon;

            decimal tongTien = 0;
            if (dto.IdMon != null && dto.IdMon.Any())
            {
                var thucDonMons = _menuDbContext.ThucDonMons
                    .Where(x => dto.IdMon.Contains(x.IdMon) && !x.Deleted)
                    .ToList();

                tongTien = thucDonMons.Sum(x => x.Gia);
            }

            hoaDon.TongTien = tongTien.ToString();
            hoaDon.ModifiedBy = currentUserId;
            hoaDon.ModifiedDate = vietNamNow;

            _hoaDonDbContext.HoaDons.Update(hoaDon);
            _hoaDonDbContext.SaveChanges();

            return new UpdateHoaDonResponseDto
            {
                TongTien = hoaDon.TongTien
            };
        }
    }
}