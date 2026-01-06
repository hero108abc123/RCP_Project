using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.DatVe.Dtos
{
    public class ViewGheTamGiuDto
    {
        public int Id { get; set; }
        public int IdGhe { get; set; }
        public string TenGhe { get; set; } = string.Empty;
        public string Gia {  get; set; } = String.Empty;
        
        public DateTime NgayGioHetHan { get; set; }
        public int SoGiayConLai { get; set; }
    }
}
