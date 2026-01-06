using Microsoft.EntityFrameworkCore;
using RCP.Menu.Domain;

namespace RCP.Menu.Infrastructure
{
    public class MenuDbContext : DbContext
    {
        public MenuDbContext(DbContextOptions<MenuDbContext> options) : base(options)
        {
        }
        public DbSet<ThucDon> ThucDons { get; set; }
        public DbSet<Kho> Khos { get; set; }
        public DbSet<KhoHang> KhoHangs { get; set; }
        public DbSet<MatHang> MatHangs { get; set; }
        public DbSet<Mon> Mons { get; set; }
        public DbSet<ThongKeKho> ThongKeKhos { get; set; }
        public DbSet<ThucDonMon> ThucDonMons { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Menu.Domain.ThucDon>(entity =>
            {
                entity.Property(e => e.Deleted).HasDefaultValue(0);
                entity.Property(e => e.CreatedDate).HasDefaultValueSql("getdate()");

            });
            modelBuilder.Entity<Menu.Domain.Kho>(entity =>
            {
                entity.Property(e => e.Deleted).HasDefaultValue(0);
                entity.Property(e => e.CreatedDate).HasDefaultValueSql("getdate()");

            });
            modelBuilder.Entity<Menu.Domain.KhoHang>(entity =>
            {
                entity.Property(e => e.Deleted).HasDefaultValue(0);
                entity.Property(e => e.CreatedDate).HasDefaultValueSql("getdate()");

            });
            modelBuilder.Entity<Menu.Domain.MatHang>(entity =>
            {
                entity.Property(e => e.Deleted).HasDefaultValue(0);
                entity.Property(e => e.CreatedDate).HasDefaultValueSql("getdate()");

            });
            modelBuilder.Entity<Menu.Domain.Mon>(entity =>
            {
                entity.Property(e => e.Deleted).HasDefaultValue(0);
                entity.Property(e => e.CreatedDate).HasDefaultValueSql("getdate()");

            });
            modelBuilder.Entity<Menu.Domain.ThongKeKho>(entity =>
            {
                entity.Property(e => e.Deleted).HasDefaultValue(0);
                entity.Property(e => e.CreatedDate).HasDefaultValueSql("getdate()");

            });
            modelBuilder.Entity<Menu.Domain.ThucDonMon>(entity =>
            {
                entity.Property(e => e.Deleted).HasDefaultValue(0);
                entity.Property(e => e.CreatedDate).HasDefaultValueSql("getdate()");

            });
        }
    }
}
