using Microsoft.EntityFrameworkCore;
using RCP.DatVe.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace RCP.DatVe.Infrastructure
{
    public class DatVeDbContext : DbContext
    {
        public DatVeDbContext(DbContextOptions<DatVeDbContext> options) : base(options)
        {
           
        }
        public DbSet<Ve> Ves { get; set; }
        public DbSet<GheTamGiu> GheTamGius { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Ve>()
        .Property(v => v.IdGhe)
        .HasConversion(
            v => JsonSerializer.Serialize(v, (JsonSerializerOptions)null),
            v => JsonSerializer.Deserialize<List<int>>(v, (JsonSerializerOptions)null) ?? new List<int>()
        )
        .HasColumnType("nvarchar(max)");
            modelBuilder.Entity<GheTamGiu>(entity =>
            {
                entity.Property(e => e.Deleted).HasDefaultValue(0);
                entity.Property(e => e.CreatedDate).HasDefaultValueSql("getdate()");

            });
        }
    }
}
