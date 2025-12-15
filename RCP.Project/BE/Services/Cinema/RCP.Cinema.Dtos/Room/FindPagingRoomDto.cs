using RCP.Project.HttpRequest.BaseRequest;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.Cinema.Dtos.Room
{
    public class FindPagingRoomDto: BaseRequestPagingDto
    {
        public int IdCinema { get; set; }
    }
}
