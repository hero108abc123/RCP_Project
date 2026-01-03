using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.Cinema.Dtos.Room
{
    public class CreateRoomDto
    {
        public int IdCinema { get; set; }
        public string Name { get; set; } = String.Empty;
        public string Description { get; set; } = String.Empty;
        //Vị trí
        public string Location { get; set; } = String.Empty;
        public int TongSoLuongGhe { get; set; }
        public int SoLuongGheThuong { get; set; }
        //public int SoLuongGheVip { get; set; }
        public int SoLuongGheDoi { get; set; }
        //public int SoLuongHangGheThuong { get; set; }
        //public int SoLuongHangGheDoi { get; set; }  
        public int SoLuongGheThuongMoiHang { get; set; }
        public int SoLuongGheDoiMoiHang { get; set; }
    }
}
