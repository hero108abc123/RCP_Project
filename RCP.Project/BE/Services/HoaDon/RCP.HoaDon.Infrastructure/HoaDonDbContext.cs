using Microsoft.EntityFrameworkCore;
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
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Domain.HoaDon>()
        .Property(h => h.IdMon)
        .HasConversion(
            v => v != null ? JsonSerializer.Serialize(v, (JsonSerializerOptions)null) : null,
            v => v != null ? JsonSerializer.Deserialize<List<int>>(v, (JsonSerializerOptions)null) : null
        )
        .HasColumnType("nvarchar(max)");
        }
    }
}
