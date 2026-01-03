using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.Cinema.Dtos.Cinema
{
    public class ViewGheInRoomDto
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;
        public string Hang { get; set; } = string.Empty;
        //public string KhuVuc { get; set; } = string.Empty;
        //public string GiaVe { get; set; } = string.Empty;
        public int HangGhe { get; set; }
        public ViewGiaVeCuaGheDto? Giave { get; set; } = new ViewGiaVeCuaGheDto();
    }

    public class ViewGiaVeCuaGheDto
    {
        public int Id { get; set; }
        public string GiaVe { get; set; } = String.Empty;
        
    }


}
