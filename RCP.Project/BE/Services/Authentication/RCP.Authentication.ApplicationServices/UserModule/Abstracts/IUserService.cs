using RCP.Authentication.Dtos.User;
using RCP.Project.HttpRequest.BaseRequest;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.Authentication.ApplicationService.UserModule.Abstracts
{
     public interface IUserService
    {
        public  Task RegisterUser(RegisterDto dto);
        public Task<ViewUserDto> FindById(string id);
        public Task<BaseResponsePagingDto<ViewUserDto>> FindPaging(FindPagingUserDto dto);
        public  Task Update(string id,UpdateUserDto dto);
        public  Task SetRoleForUser(string id, SetRoleForUserDto dto);
        public  Task<GetAuthMeDto> GetAuthMe();

    }
} 

