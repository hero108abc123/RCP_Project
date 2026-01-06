using RCP.Project.HttpRequest.BaseRequest;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.Menu.Dtos.Menu
{
     public class FindPagingMonByIdThucDonDto:BaseRequestPagingDto
    {
        public int IdThucDon { get; set; }
    }
}
