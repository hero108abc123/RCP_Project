using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.Menu.Dtos.Menu
{
    public class GetByIdDto
    {
        public int Id { get; set; }
        public int IdCinema { get; set; }

        public string TenThucDon { get; set; } = String.Empty;
        //public decimal Gia { get; set; }
        public string MoTa { get; set; } = String.Empty;
        public int TongSoMon { get; set; }
    }
}
