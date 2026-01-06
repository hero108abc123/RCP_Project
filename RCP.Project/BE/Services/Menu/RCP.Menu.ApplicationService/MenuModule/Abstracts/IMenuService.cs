using RCP.Menu.Dtos.Menu;
using RCP.Project.HttpRequest.BaseRequest;

namespace RCP.Menu.ApplicationService.MenuModule.Abstracts
{
    public interface IMenuService
    {
        public void Create(CreateMenuDto dto);
        public void Update(UpdateMenuDto dto);
        public void Delete(int id);
        public BaseResponsePagingDto<ViewMenuDto> FindPaging(FindPagingMenuDto dto);
        public void AddMonVaoMenu(AddMonVaoMenuDto dto);
        public void UpdateMonVaoMenu(UpdateMonVaoDto dto);
        public void DeleteMonKhoiMenu(int id);
        public BaseResponsePagingDto<ViewMonByIdThucDonDto> FindPagingMonByThucDon(FindPagingMonByIdThucDonDto dto);
        public GetByIdDto GetById(int id);
        public GetByIdMonVaoMenuDto GetByIdMonVaoMenu(int id);
    }
}