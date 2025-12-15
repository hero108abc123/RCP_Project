using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.Cinema.Dtos.Cinema
{
    public class AddPhimToCinemaRoomDto
    {
        public int IdPhim { get; set; }
        public int IdCinema { get; set; }   
        public int IdRoom { get; set; }
        public DateTime? ThoiGianBatDauChieu { get; set; }
        public DateTime? ThoiGianKetThucChieu { get; set; }
    }
}
