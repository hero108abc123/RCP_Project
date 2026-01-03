using RCP.Project.HttpRequest.BaseRequest;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace RCP.Cinema.Dtos.LichChieu
{
    public class FindPagingCinemaRoomPhimDto : BaseRequestPagingDto
    {
        public List<int>? IdCinema { get; set; }
        public List<int>? IdRoom { get; set; }
        public List<int>? IdTheLoai { get; set; }
        public DateTime? TuNgay { get; set; }
        public DateTime? DenNgay { get; set; }
    }
}