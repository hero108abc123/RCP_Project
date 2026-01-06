using AutoMapper;
using Hangfire;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using RCP.Cinema.ApplicationServices.Cinema.Interfaces;
using RCP.Cinema.ApplicationServices.Common;
using RCP.Cinema.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.Cinema.ApplicationServices.Cinema.Implements
{
    public class JobService: BaseCinemaService,IJobService
    {
        private static readonly TimeZoneInfo VietnamTimeZone = TimeZoneInfo.FindSystemTimeZoneById("SE Asia Standard Time");
        private readonly IRoomService _roomService;
        private readonly ILichChieuService _lichChieuService;
        public JobService(
            CinemaDbContext cinemaDbContext,
            ILogger<JobService> logger,
            IRoomService roomService,
            ILichChieuService lichChieuService,
            IHttpContextAccessor httpContextAccessor,
            IMapper mapper)
            : base(cinemaDbContext, logger, httpContextAccessor, mapper)
        {
            _roomService = roomService;
            _lichChieuService = lichChieuService;
        }


        public void CronJobUpdateTrangThaiNgayGiaVe()
        {
            RecurringJob.AddOrUpdate(
                   "update-trang-thai-ngay-gia-ve",
                   () => _roomService.UpdateTrangThaiNgayGiaVe(),
                   Cron.Daily(0, 0),
                   new RecurringJobOptions
                   {
                        TimeZone = TimeZoneInfo.FindSystemTimeZoneById("SE Asia Standard Time")
                   }
            );

            _logger.LogInformation("Đã đăng ký cronjob cập nhật trạng thái ngày giá vé");
        }
        public void CronJobUpdateTrangThaiPhim()
        {
            RecurringJob.AddOrUpdate(
                   "update-trang-thai-phim",
                   () => _lichChieuService.UpdateTrangThaiPhim(),
                   "*/30 * * * *", 
                   new RecurringJobOptions
                   {
                       TimeZone = TimeZoneInfo.FindSystemTimeZoneById("SE Asia Standard Time")
                   }
            );
            _logger.LogInformation("Đã đăng ký cronjob cập nhật trạng thái phim (chạy mỗi 30 phút)");
        }
    }
}
