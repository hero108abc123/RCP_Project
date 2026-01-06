using RCP.Project.HttpRequest.BaseRequest;

namespace RCP.Movie.Dtos.Phim
{
    public class FindPhimDto : BaseRequestPagingDto
    {
        public List<int>? IdTheLoai { get; set; }
        public int? DangChieu { get; set; }
        public string? NgonNgu { get; set; }
        public List<string>? PhanLoaiDoTuoi { get; set; }
        public string? DaoDien { get; set; }
        public string? DienVien { get; set; }
        public DateTime? TuNgay { get; set; }
        public DateTime? DenNgay { get; set; }
    }
}
