using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.Menu.Dtos.Kho
{
    public class ViewKhoPagingDto
    {
        public CinemaDto Cinema { get; set; } = new CinemaDto();
        public int Id { get; set; }
        public string TenKho { get; set; } = String.Empty;
       // public string MoTa { get; set; } = string.Empty;
    }

    public class CinemaDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = String.Empty;
    }
}
