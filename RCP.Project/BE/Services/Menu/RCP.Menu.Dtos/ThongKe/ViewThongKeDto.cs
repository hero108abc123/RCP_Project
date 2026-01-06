using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.Menu.Dtos.ThongKe
{
    public class ViewThongKeDto
    {
        public ViewCinemaKho Cinema { get; set; } = new ViewCinemaKho();
        public int Id { get; set; }
        public ViewKho Kho { get; set; } = new ViewKho();

        public ViewMatHang MatHang { get; set; } = new ViewMatHang();
        public int SoLuongNhap { get; set; }
        public decimal DonGiaNhap { get; set; }
        public decimal TongGiaTriNhapHang { get; set; }
        public DateTime NgayNhap { get; set; }
    }

    public class ViewCinemaKho
    {
        public int Id { get; set;}
        public string Name { get; set; } = String.Empty;
    }

    public class ViewKho
    {
        public int Id { get; set; }
        public string TenKho { get; set; } = String.Empty;
    }
    public class ViewMatHang
    {
        public int Id { get; set; }
        public string TenMon { get; set; } = String.Empty;
    }
}
