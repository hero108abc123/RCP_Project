// File: RCP.DatVe.Dtos/ViewVeDto.cs
using System;
using System.Collections.Generic;

namespace RCP.DatVe.Dtos
{
    public class ViewVeDto
    {
        public int Id { get; set; }
        public string SessionId { get; set; } = string.Empty;
        public ViewCinemaVe Cinema { get; set; } = new ViewCinemaVe();
        public ViewRoomVe Room { get; set; } = new ViewRoomVe();
        public ViewPhimVe Phim { get; set; } = new ViewPhimVe();
        public ViewLichChieuVe LichChieu { get; set; } = new ViewLichChieuVe();
        public List<ViewGheVe> DanhSachGhe { get; set; } = new List<ViewGheVe>();
        public string TongTien { get; set; } = "0";
    }

    public class ViewCinemaVe
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string District { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
    }

    public class ViewRoomVe
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
    }

    public class ViewPhimVe
    {
        public int Id { get; set; }
        public string TenPhim { get; set; } = string.Empty;
        public int ThoiLuongPhut { get; set; }
        public string PhanLoaiDoTuoi { get; set; } = string.Empty;
    }

    public class ViewLichChieuVe
    {
        public int Id { get; set; }
        public DateTime? ThoiGianBatDauChieu { get; set; }
        public DateTime? ThoiGianKetThucChieu { get; set; }
    }

    public class ViewGheVe
    {
        public int Id { get; set; }
        public string TenGhe { get; set; } = string.Empty;
        public string Hang { get; set; } = String.Empty;
        public int HangGhe { get; set; }
        public string Gia { get; set; } = "0";
    }

    public class HuyVeBySessionIdDto
    {
        public string SessionId { get; set; } = string.Empty;
    }
}