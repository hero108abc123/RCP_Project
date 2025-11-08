using RCP.Shared.ApplicationService.Database;
using System.ComponentModel.DataAnnotations.Schema;

namespace RCP.Movie.Domain
{
    [Table(nameof(PhimTheLoai), Schema = DbSchemas.Movie)]
    public class PhimTheLoai
    {
        [ForeignKey(nameof(Phim))]
        public int PhimId { get; set; }

        [ForeignKey(nameof(TheLoai))]
        public int TheLoaiId { get; set; }

        public Phim? Phim { get; set; }
        public TheLoai? TheLoai { get; set; }
    }
}
