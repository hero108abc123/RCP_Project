using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.Menu.Dtos.Mon
{
    public class CreateMonDto
    {
        public int IdHang { get; set; }
        public string Name { get; set; } = String.Empty;
        public string MoTa { get; set; } = String.Empty;
        public int SoLuong { get; set; }
        public IFormFile? AnhMinhHoa { get; set; }
        public int Loai { get; set; }
    }
}
