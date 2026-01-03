using System.ComponentModel.DataAnnotations;

namespace RCP.Asset.Dtos
{
    public class CreateAssetDto
    {
        [Required]
        [MaxLength(50)]
        public string MaTaiSan { get; set; }

        [Required]
        [MaxLength(200)]
        public string TenTaiSan { get; set; }

        public int LoaiTaiSan { get; set; } // 1: Hình ảnh, 2: Âm thanh...

        public int SoLuong { get; set; } = 1;

        public decimal NguyenGia { get; set; }

        public DateTime NgayBatDauSuDung { get; set; }

        public int ThoiGianKhauHaoThang { get; set; } // Số tháng

        public int TrangThai { get; set; } // 1: Đang dùng, 2: Bảo trì...

        [Required]
        public int RapChieuId { get; set; }

        public int? PhongChieuId { get; set; } // Có thể null
    }
}