namespace RCP.Movie.Dtos.Phim
{
    public class ViewPhimDto
    {
        public int? Id { get; set; }

        public string? TenPhim { get; set; }
        public string? MoTa { get; set; }

        public string? DaoDien { get; set; }

        public string? DienVien { get; set; }

        // Ảnh và trailer
        public string? AnhBia { get; set; }      // URL ảnh poster
        public string? TrailerUrl { get; set; }

        public int ThoiLuongPhut { get; set; }

        public DateTime NgayKhoiChieu { get; set; }

        public string? NgonNgu { get; set; }

        public string? PhanLoaiDoTuoi { get; set; }
        public int DangChieu { get; set; }
        public List<ViewTheLoai> TheLoais { get; set; } = new List<ViewTheLoai>();



    }

    public class ViewTheLoai
    {
        public int Id { get; set; }
        public string TenTheLoai { get; set; } = string.Empty;
    }
}
