using RCP.Shared.ApplicationService.Database;
using RCP.Shared.ApplicationService.Interfaces;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RCP.Movie.Domain
{
    [Table(nameof(Phim), Schema = DbSchemas.Movie)]
    public class Phim : IFullAudited
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required, MaxLength(500)]
        public string TenPhim { get; set; } = string.Empty;

        [MaxLength(2000)]
        public string? MoTa { get; set; }

        [MaxLength(500)]
        public string? DaoDien { get; set; }

        [MaxLength(1000)]
        public string? DienVien { get; set; }

        public int ThoiLuongPhut { get; set; }

        public DateTime NgayKhoiChieu { get; set; }

        [MaxLength(20)]
        public string? NgonNgu { get; set; }

        [MaxLength(10)]
        public string? PhanLoaiDoTuoi { get; set; }

        public bool DangChieu { get; set; }

        // 🔹 Audit fields
        public DateTime? CreatedDate { get; set; }

        public string? CreatedBy { get; set; }

        public DateTime? ModifiedDate { get; set; }

        public string? ModifiedBy { get; set; }

        public string? DeletedBy { get; set; }
        public DateTime? DeletedDate { get; set; }

        // 🔹 Soft delete
        public bool Deleted { get; set; }

        // 🔹 Quan hệ nhiều-nhiều với thể loại
        public ICollection<PhimTheLoai> PhimTheLoais { get; set; } = new List<PhimTheLoai>();

        // 🔹 Quan hệ 1-n với ảnh & video
        public ICollection<PhimAnh> AnhList { get; set; } = new List<PhimAnh>();
        public ICollection<PhimVideo> VideoList { get; set; } = new List<PhimVideo>();
    }
}
