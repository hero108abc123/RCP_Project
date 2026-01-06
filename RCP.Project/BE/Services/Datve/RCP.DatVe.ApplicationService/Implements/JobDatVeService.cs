using AutoMapper;
using Hangfire;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RCP.Cinema.Infrastructure;
using RCP.DatVe.ApplicationService.Common;
using RCP.DatVe.ApplicationService.Interfaces;
using RCP.DatVe.Infrastructure;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace RCP.DatVe.ApplicationService.Implements
{
    public class JobDatVeService : BaseDatVeService, IJobDatVeService
    {
        private static readonly TimeZoneInfo VietnamTimeZone = TimeZoneInfo.FindSystemTimeZoneById("SE Asia Standard Time");

        public JobDatVeService(
            DatVeDbContext datVeDbContext,
            ILogger<JobDatVeService> logger,
            IHttpContextAccessor httpContextAccessor,
            IMapper mapper)
            : base(datVeDbContext, logger, httpContextAccessor, mapper)
        {
        }

        public void CronJobGiaiPhongGheHetHan()
        {
            RecurringJob.AddOrUpdate(
                "giai-phong-ghe-het-han",
                () => GiaiPhongGheHetHan(),
                "*/10 * * * * *", // Chạy mỗi 10 giây
                new RecurringJobOptions
                {
                    TimeZone = VietnamTimeZone
                }
            );
            _logger.LogInformation("Đã đăng ký cronjob giải phóng ghế hết hạn (chạy mỗi 10 giây)");
        }

        public async Task GiaiPhongGheHetHan()
        {
            try
            {
                var vietNamNow = GetVietnamTime();

                var gheHetHan = await _datVeDbContext.GheTamGius
                    .Where(x => !x.Deleted && x.NgayGioHetHan <= vietNamNow)
                    .ToListAsync();

                if (gheHetHan.Any())
                {
                    foreach (var ghe in gheHetHan)
                    {
                        ghe.Deleted = true;
                        ghe.DeletedBy = "System";
                        ghe.DeletedDate = vietNamNow;
                    }

                    _datVeDbContext.GheTamGius.UpdateRange(gheHetHan);
                    await _datVeDbContext.SaveChangesAsync();

                    _logger.LogInformation($"Đã giải phóng {gheHetHan.Count} ghế hết hạn lúc {vietNamNow}");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Lỗi khi giải phóng ghế hết hạn");
            }
        }
    }
}