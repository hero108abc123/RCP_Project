using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.Menu.Dtos.Kho
{
    public class UpdateNhapHangDto
    {
        public int Id { get; set; }
        public int IdKho { get; set; }
        public int IdMatHang { get; set; }
        public int SoLuongNhap { get; set; }
        public decimal DonGiaNhap { get; set; }
    }
}
