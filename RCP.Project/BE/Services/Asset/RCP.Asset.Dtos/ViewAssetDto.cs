namespace RCP.Asset.Dtos
{
    public class ViewAssetDto
    {
        public int Id { get; set; }
        public string MaTaiSan { get; set; }
        public string TenTaiSan { get; set; }
        public int LoaiTaiSan { get; set; }

        // Có thể thêm string hiển thị cho Enum nếu FE cần
        public string TenLoaiTaiSan => LoaiTaiSan.ToString();

        public int SoLuong { get; set; }
        public decimal NguyenGia { get; set; }
        public DateTime NgayBatDauSuDung { get; set; }
        public int ThoiGianKhauHaoThang { get; set; }
        public int TrangThai { get; set; }
        public string TenTrangThai => TrangThai.ToString();

        public int RapChieuId { get; set; }
        public int? PhongChieuId { get; set; }

        // --- Computed Field (Tính toán trong Service) ---
        public decimal GiaTriConLai { get; set; }
    }
}