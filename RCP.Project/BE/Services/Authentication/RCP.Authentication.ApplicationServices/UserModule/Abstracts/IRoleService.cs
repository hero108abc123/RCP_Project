using RCP.Authentication.Dtos.Role;
using RCP.Project.HttpRequest.BaseRequest;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.Authentication.ApplicationService.UserModule.Abstracts
{
    public interface IRoleService
    {
        public  Task<ViewRoleDto> FindById(string id);
        public Task<BaseResponsePagingDto<ViewRoleDto>> FindPaging(FindPagingRoleDto dto);
    }
}
