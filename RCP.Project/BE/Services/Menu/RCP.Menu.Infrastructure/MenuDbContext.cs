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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Menu.Domain.ThucDon>(entity =>
            {
                entity.Property(e => e.Deleted).HasDefaultValue(0);
                entity.Property(e => e.CreatedDate).HasDefaultValueSql("getdate()");

            });
        }
    }
}
