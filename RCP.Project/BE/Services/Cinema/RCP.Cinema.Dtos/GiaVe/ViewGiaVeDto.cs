using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.Cinema.Dtos.GiaVe
{
    public class ViewGiaVeDto
    {
        public int Id { get; set; }
        public string GiaNgayThuong { get; set; } = string.Empty;
        public string GiaNgayLe { get; set; } = string.Empty;
        public string GiaCuoiTuan { get; set; } = string.Empty;
        public int HangGhe { get; set; }
        //public string Gia { get; set; } = string.Empty;
        public int TrangThaiNgay { get; set; }
    }
}
