using Microsoft.EntityFrameworkCore;

namespace RCP.Phim.Infrastructure
{
    public class PhimDbContext : DbContext
    {
        public PhimDbContext(DbContextOptions<PhimDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // Configure your entities here
        }

    }
}
