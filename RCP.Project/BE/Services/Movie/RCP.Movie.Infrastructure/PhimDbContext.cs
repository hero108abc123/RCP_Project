using Microsoft.EntityFrameworkCore;
using RCP.Movie.Domain;

namespace RCP.Movie.Infrastructure
{
    public class PhimDbContext : DbContext
    {
        public PhimDbContext(DbContextOptions<PhimDbContext> options) : base(options)
        {
        }

        public DbSet<Phim> Phims { get; set; }
        public DbSet<TheLoai> TheLoais { get; set; }
        public DbSet<PhimTheLoai> PhimTheLoais { get; set; }
        public DbSet<PhimAnh> PhimAnhs { get; set; }
        public DbSet<PhimVideo> PhimVideos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // 🔹 Many-to-many: Phim - TheLoai
            modelBuilder.Entity<PhimTheLoai>()
                .HasKey(pt => new { pt.PhimId, pt.TheLoaiId });

            modelBuilder.Entity<PhimTheLoai>()
                .HasOne(pt => pt.Phim)
                .WithMany(p => p.PhimTheLoais)
                .HasForeignKey(pt => pt.PhimId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<PhimTheLoai>()
                .HasOne(pt => pt.TheLoai)
                .WithMany(t => t.PhimTheLoais)
                .HasForeignKey(pt => pt.TheLoaiId)
                .OnDelete(DeleteBehavior.Cascade);

            // 🔹 1-n Phim -> PhimAnh
            modelBuilder.Entity<Phim>()
                .HasMany(p => p.AnhList)
                .WithOne(a => a.Phim)
                .HasForeignKey(a => a.PhimId)
                .OnDelete(DeleteBehavior.Cascade);

            // 🔹 1-n Phim -> PhimVideo
            modelBuilder.Entity<Phim>()
                .HasMany(p => p.VideoList)
                .WithOne(v => v.Phim)
                .HasForeignKey(v => v.PhimId)
                .OnDelete(DeleteBehavior.Cascade);

            // 🔹 Đặt schema/tên bảng
            modelBuilder.Entity<Phim>().ToTable("Phim", "Movie");
            modelBuilder.Entity<TheLoai>().ToTable("TheLoai", "Movie");
            modelBuilder.Entity<PhimTheLoai>().ToTable("PhimTheLoai", "Movie");
            modelBuilder.Entity<PhimAnh>().ToTable("PhimAnh", "Movie");
            modelBuilder.Entity<PhimVideo>().ToTable("PhimVideo", "Movie");

            // 🔹 Thiết lập giá trị mặc định cho bảng Phim
            modelBuilder.Entity<Phim>(entity =>
            {
                entity.Property(p => p.IsDeleted)
                    .HasDefaultValue(false);

                entity.Property(p => p.CreatedDate)
                    .HasDefaultValueSql("GETUTCDATE()"); // tương đương DateTime.UtcNow trong SQL Server
            });
        }
    }
}
