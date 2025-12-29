using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.Movie.Dtos.Phim
{
    public class GetDropDownPhimDto
    {
        public int Id { get; set; }
        public string TenPhim { get; set; } = string.Empty;
    }
}
