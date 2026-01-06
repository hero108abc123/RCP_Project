using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.Menu.Dtos.Kho
{
    public class ViewKhoDto
    {

        //public int Id { get; set; }
        //public int IdCinema { get; set; }
        //public string TenKho { get; set; } = String.Empty;
        public List<ViewMatHangDto> Hangs { get; set; } = new List<ViewMatHangDto>();


    }



    public class ViewMatHangDto
    {
        public int Id { get; set; }
        public string TenMon { get; set; } = String.Empty;
        //public decimal GiaNhap { get; set; }
        public string MoTa { get; set; } = String.Empty;
        public int SoLuongNhap { get; set; }
        public int SoLuongDaBan { get; set; }
        public int SoLuongTonKho { get; set; }
        //public decimal GiaNhap { get; set; }
    }
}
