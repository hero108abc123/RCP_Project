using Microsoft.AspNetCore.Http;

namespace RCP.Movie.Dtos.Phim
{
    public class CreatePhimDto
    {
        public string? TenPhim { get; set; }
        public string? MoTa { get; set; }
        public string? DaoDien { get; set; }
        public string? DienVien { get; set; }

        // Upload file (ảnh & trailer)
        public IFormFile? AnhBia { get; set; }        // File ảnh poster upload
        public IFormFile? TrailerFile { get; set; }   // File video trailer upload

        public int ThoiLuongPhut { get; set; }
        public DateTime NgayKhoiChieu { get; set; }
        public string? NgonNgu { get; set; }
        public string? PhanLoaiDoTuoi { get; set; }

        // Danh sách thể loại
        public List<int>? TheLoaiIds { get; set; }
    }
}
