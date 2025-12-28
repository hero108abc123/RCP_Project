using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.Cinema.Dtos.Cinema
{
    public class ViewCinemaDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = String.Empty;
        public string Location { get; set; } = String.Empty;
        public string City { get; set; } = String.Empty;
        public string District { get; set; } = String.Empty;
        public int SoLuongPhongChieu { get; set; }
        public string UrlAnhCinema { get; set; } = String.Empty;
    }
}
