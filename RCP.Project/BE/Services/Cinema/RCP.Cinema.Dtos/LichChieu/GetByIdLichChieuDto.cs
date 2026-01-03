using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.Cinema.Dtos.LichChieu
{
    public class GetByIdLichChieuDto
    {
        public ViewCinemaLichChieu Cinema { get; set; } = new ViewCinemaLichChieu();
        public ViewRoomLichChieu Room { get; set; } = new ViewRoomLichChieu();
        public ViewPhimLichChieu Phim { get; set; } = new ViewPhimLichChieu();
        public DateTime? ThoiGianBatDauChieu { get; set; }
        public DateTime? ThoiGianKetThucChieu { get; set; }
    }

    public class ViewCinemaLichChieu
    {
        public int IdCinema { get; set; }
        public string Name { get; set; } = String.Empty;
    }
    public class ViewRoomLichChieu
    {
        public int IdRoom { get; set; }
        public string Name { get; set; } = String.Empty;
    }

    public class ViewPhimLichChieu
    {
        public int IdPhim { get; set; }
        public string TenPhim { get; set; } = string.Empty;
    }
}
