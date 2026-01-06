using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.DatVe.Dtos
{
    public class XacNhanDatVeByUserInfor
    {
        public List<int> IdGheTamGius { get; set; } = new List<int>();
        public string SessionId { get; set; } = string.Empty;
        public string? HoVaTen { get; set; }
        public string? SoDienThoai { get; set; }
        public string? Email { get; set; }
        public string? DiaChi { get; set; }
        public DateTime? Birthday { get; set; }
    }
}
