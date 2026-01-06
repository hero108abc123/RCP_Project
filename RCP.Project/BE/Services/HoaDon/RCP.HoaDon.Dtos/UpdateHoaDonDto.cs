using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.HoaDon.Dtos
{
    public class UpdateHoaDonDto
    {
        public int Id { get; set; }
        public string SessionId { get; set; } = string.Empty;
        public List<int>? IdMon { get; set; }
    }
}
