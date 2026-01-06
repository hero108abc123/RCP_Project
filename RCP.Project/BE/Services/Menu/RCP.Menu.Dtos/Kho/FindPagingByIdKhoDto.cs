using RCP.Project.HttpRequest.BaseRequest;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.Menu.Dtos.Kho
{
    public class FindPagingByIdKhoDto:BaseRequestPagingDto
    {
        public int IdKho { get; set; }
    }
}
