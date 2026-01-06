using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.DatVe.Dtos
{
    public class TrangThaiGheDto
    {
        public int IdGhe { get; set; }
        public string TenGhe { get; set; } = string.Empty;
        public string Hang { get; set; } = string.Empty;
        public int HangGhe { get; set; }
        public string Gia { get; set; } = "0";

       
        public int TrangThai { get; set; }
        public DateTime? NgayGioHetHan { get; set; } 
    }
}
