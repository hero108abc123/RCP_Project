using System.ComponentModel.DataAnnotations;

namespace RCP.Asset.Dtos
{
    public class UpdateAssetDto
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string MaTaiSan { get; set; }

        [Required]
        [MaxLength(200)]
        public string TenTaiSan { get; set; }

        public int LoaiTaiSan { get; set; }

        public int SoLuong { get; set; }

        public decimal NguyenGia { get; set; }

        public DateTime NgayBatDauSuDung { get; set; }

        public int ThoiGianKhauHaoThang { get; set; }

        public int TrangThai { get; set; }

        [Required]
        public int RapChieuId { get; set; }

        public int? PhongChieuId { get; set; }
    }
}