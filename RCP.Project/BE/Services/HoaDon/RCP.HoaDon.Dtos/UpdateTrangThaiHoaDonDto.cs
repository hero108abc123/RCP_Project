using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.HoaDon.Dtos
{
    public class UpdateTrangThaiHoaDonDto
    {

        public int Id { get; set; }
        public string SessionId { get; set; } = string.Empty;
        public int TrangThai { get; set; }


    }
}
