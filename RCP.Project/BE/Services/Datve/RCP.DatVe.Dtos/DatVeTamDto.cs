using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.DatVe.Dtos
{
    public class DatVeTamDto
    {
        public int IdCinema { get; set; }
        public int IdPhim { get; set; }
        public int IdRoom { get; set; }
        public int IdSuatChieu { get; set; } // ← THÊM: Validate suất chiếu
        public List<int> IdGhes { get; set; } = new List<int>();
        public string SessionId { get; set; } = string.Empty;
    }
}
