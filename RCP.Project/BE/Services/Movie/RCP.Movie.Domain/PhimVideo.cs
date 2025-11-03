using RCP.Shared.ApplicationService.Database;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RCP.Movie.Domain
{
    [Table(nameof(PhimVideo), Schema = DbSchemas.Movie)]
    public class PhimVideo
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [ForeignKey(nameof(Phim))]
        public int PhimId { get; set; }

        [MaxLength(1000)]
        public string Url { get; set; } = string.Empty;

        [MaxLength(200)]
        public string? TieuDe { get; set; }

        [MaxLength(50)]
        public string? LoaiVideo { get; set; } // Trailer, BehindTheScenes,...

        public Phim? Phim { get; set; }
    }
}
