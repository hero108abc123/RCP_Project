using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.Menu.Dtos.Mon
{
    public class ViewMonDto
    {
        //public HangDto Hang { get; set; } = new HangDto();
        public int Id { get; set; }
        //public int IdHang { get; set; }
        public string Name { get; set; } = String.Empty;
        public string MoTa { get; set; } = String.Empty;
        public int SoLuong { get; set; }
        public string? AnhMinhHoa { get; set; }
        public int Loai { get; set; }

    }

   
}
