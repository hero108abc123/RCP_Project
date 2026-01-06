using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.Menu.Dtos.Menu
{
    public class ViewMonByIdThucDonDto
    {
        public int Id { get; set; }
        public ViewMon Mon { get; set; } = new ViewMon();
        public int SoLuong { get; set; }
        public int TrangThai { get; set; }
        public decimal Gia { get; set; }
    }

    public class ViewMon
    {
        public int Id { get; set; }
        public int IdHang { get; set; }
        public string Name { get; set; } = String.Empty;
        public string MoTa { get; set; } = String.Empty;
        public int SoLuong { get; set; }
        public string? AnhMinhHoa { get; set; }
        public int Loai { get; set; }
    }
}
