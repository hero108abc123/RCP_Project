using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.Menu.Dtos.Menu
{
    public class GetByIdMonVaoMenuDto
    {
        public int Id { get; set; }
        public int IdThucDon { get; set; }
        public int IdMon { get; set; }
        //public int SoLuong { get; set; }
        public decimal Gia { get; set; }
    }
}
