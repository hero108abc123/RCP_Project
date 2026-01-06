using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.Menu.Dtos.Hang
{
    public class ViewHangDto
    {
        public int Id { get; set; }
        public string TenMon { get; set; } = String.Empty;
        //public decimal GiaNhap { get; set; }
        public string MoTa { get; set; } = String.Empty;
    }
}
