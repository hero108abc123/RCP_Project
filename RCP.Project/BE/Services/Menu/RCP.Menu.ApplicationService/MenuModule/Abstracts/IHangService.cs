using RCP.Menu.Dtos.Hang;
using RCP.Project.HttpRequest.BaseRequest;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.Menu.ApplicationService.MenuModule.Abstracts
{
    public interface IHangService
    {
        public void Create(CreateHangDto dto);
        public void Update(UpdateHangDto dto);
        public void Delete(int id);
        public BaseResponsePagingDto<ViewHangDto> FindPaging(FindPagingHangDto dto);
        public ViewHangDto GetById(int id);
        public List<ViewHangDto> GetDropDown();
    }
}
