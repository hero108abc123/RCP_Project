using RCP.Authentication.Dtos.Permission;
using RCP.Project.HttpRequest.BaseRequest;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.Authentication.ApplicationService.UserModule.Abstracts
{
    public interface IPermissionService
    {
        Task<BaseResponsePagingDto<ViewPermissionDto>> FindPaging(FindPagingPermissionDto dto);
        Task<ViewPermissionDto?> FindById(int id);
        Task<List<ViewPermissionDto>> GetAll();
        Task Create(CreatePermissionDto dto);
        Task Update(int id, UpdatePermissionDto dto);
        Task<bool> Delete(int id);
    }
}
