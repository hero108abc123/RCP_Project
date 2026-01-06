using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.Menu.Dtos.Kho
{
    public class UpdateKhoDto
    {
        public int Id { get; set; }
        public int IdCinema { get; set; }
        public string TenKho { get; set; } = String.Empty;
    }
}
