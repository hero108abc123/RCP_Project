using RCP.Menu.Dtos.Mon;
using RCP.Project.HttpRequest.BaseRequest;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.Menu.ApplicationService.MenuModule.Abstracts
{
    public interface IMonService
    {

        public  Task Create(CreateMonDto dto);
        public Task Update(UpdateMonDto dto);
        public BaseResponsePagingDto<ViewMonDto> FindPaging(FindPagingMonDto dto);
        public ViewByIdDto GetById(int id);
        public void Delete(int id);
        public List<ViewDropDownMonDto> GetDropDown();
    }
}
