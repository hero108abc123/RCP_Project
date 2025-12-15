using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.Cinema.Dtos.Room
{
    public class UpdateRoomDto
    {
        public int Id { get; set; }
        public int IdCinema { get; set; }
        public string Name { get; set; } = String.Empty;
        public string Description { get; set; } = String.Empty;
        //Vị trí
        public string Location { get; set; } = String.Empty;
        public int TongSoLuongGhe { get; set; }
        public int SoLuongGheThuong { get; set; }
        public int SoLuongGheVip { get; set; }
        public int SoLuongGheDoi { get; set; }
    }
}
