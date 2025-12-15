using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.Cinema.Dtos.Cinema
{
    public class DeletePhimToCinemaRoomDto
    {
        public int IdPhim { get; set; }
        public int IdCinema { get; set; }
        public int IdRoom { get; set; }
    }
}
