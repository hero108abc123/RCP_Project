using RCP.Project.HttpRequest.BaseRequest;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.Menu.Dtos.ThongKe
{
    public class FindPagingThongKeDto: BaseRequestPagingDto
    {
        public int? IdCinema { get; set; }
        public int? IdKho { get; set; }
        public int? IdMatHang { get; set; }
        public DateTime? NgayNhap { get; set; }

    }
}
