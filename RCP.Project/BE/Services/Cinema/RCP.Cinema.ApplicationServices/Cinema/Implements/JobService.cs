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
        public JobService(
            CinemaDbContext cinemaDbContext,
            ILogger<JobService> logger,
            IRoomService roomService,
            IHttpContextAccessor httpContextAccessor,
            IMapper mapper)
            : base(cinemaDbContext, logger, httpContextAccessor, mapper)
        {
            _roomService = roomService;
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
    }
}
