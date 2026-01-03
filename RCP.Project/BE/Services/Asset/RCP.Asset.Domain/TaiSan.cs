using Microsoft.EntityFrameworkCore;
using RCP.Shared.ApplicationService.Database;
using RCP.Shared.ApplicationService.Interfaces;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RCP.Asset.Domain
{

    [Table(nameof(TaiSan), Schema = DbSchemas.Asset)]
    [Index(
      nameof(Id),
      IsUnique = false,
      Name = $"IX_{nameof(TaiSan)}"
    )]
    public class TaiSan : ISoftDeleted
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        [MaxLength(50)]
        public string MaTaiSan { get; set; }

        [Required]
        [MaxLength(200)]
        public string TenTaiSan { get; set; }
        public int LoaiTaiSan { get; set; } // Dùng Enum hoặc int
        public int SoLuong { get; set; }
        [MaxLength(100)]


        [Column(TypeName = "decimal(18, 2)")]
        public decimal NguyenGia { get; set; } // Giá mua vào (VNĐ)

        public DateTime NgayBatDauSuDung { get; set; } // Mốc tính khấu hao (thường là ngày đưa vào hoạt động)

        public int ThoiGianKhauHaoThang { get; set; } // Số tháng khấu hao (VD: 60 tháng = 5 năm
        // --- Trạng thái ---
        public int TrangThai { get; set; }
        public int RapChieuId { get; set; }
        public int? PhongChieuId { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string? ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public DateTime? DeletedDate { get; set; }
        public bool Deleted { get; set; }
        public string? DeletedBy { get; set; }
    }
}
