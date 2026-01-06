using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.DatVe.Dtos
{
    public class GetTrangThaiGheDto
    {
        public int IdCinema { get; set; }
        public int IdRoom { get; set; }
        public int IdSuatChieu { get; set; }
        public string SessionId { get; set; } = string.Empty;
    }
}
