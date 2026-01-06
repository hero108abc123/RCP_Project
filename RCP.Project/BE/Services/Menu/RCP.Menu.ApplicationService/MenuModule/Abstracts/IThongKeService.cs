using RCP.Menu.Dtos.ThongKe;
using RCP.Project.HttpRequest.BaseRequest;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.Menu.ApplicationService.MenuModule.Abstracts
{
    public interface IThongKeService
    {
        public BaseResponsePagingDto<ViewThongKeDto> FindPaging(FindPagingThongKeDto dto);
    }
}
