using RCP.Menu.Dtos;
using RCP.Project.HttpRequest.BaseRequest;

namespace RCP.Menu.ApplicationService.MenuModule.Abstracts
{
    public interface IMenuService
    {
        public Task Create(CreateMenuDto dto);
        public Task Update(UpdateMenuDto dto);
        public void Delete(int id);
        public BaseResponsePagingDto<ViewMenuDto> Find(FindPagingMenuDto dto);
        public ViewMenuDto FindById(int id);
    }
}
