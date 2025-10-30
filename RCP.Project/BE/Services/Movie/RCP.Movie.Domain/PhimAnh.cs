using RCP.Shared.ApplicationService.Database;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RCP.Movie.Domain
{
    [Table(nameof(PhimAnh), Schema = DbSchemas.Movie)]
    public class PhimAnh
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [ForeignKey(nameof(Phim))]
        public int PhimId { get; set; }

        [MaxLength(1000)]
        public string Url { get; set; } = string.Empty;

        [MaxLength(100)]
        public string? LoaiAnh { get; set; } // poster, banner, thumbnail,...

        public bool LaAnhChinh { get; set; } = false;

        public Phim? Phim { get; set; }
    }
}
