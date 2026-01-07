using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace RCP.HoaDon.Infrastructure
{
    public class HoaDonDbContext : DbContext
    {
        public HoaDonDbContext(DbContextOptions<HoaDonDbContext> options) : base(options)
        {

        }
        public DbSet<Domain.HoaDon> HoaDons { get; set; }
        public DbSet<Domain.PaymentSession> PaymentSessions { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Domain.HoaDon>()
        .Property(h => h.IdMon)
        .HasConversion(
            v => v != null ? JsonSerializer.Serialize(v, (JsonSerializerOptions)null) : null,
            v => v != null ? JsonSerializer.Deserialize<List<int>>(v, (JsonSerializerOptions)null) : null
        )
        .HasColumnType("nvarchar(max)");
            modelBuilder.Entity<Domain.PaymentSession>(entity =>
            {
                entity.Property(e => e.Deleted).HasDefaultValue(0);
                entity.Property(e => e.CreatedDate).HasDefaultValueSql("getdate()");

            });
        }

    }
}
