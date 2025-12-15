using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.Authentication.Dtos.User
{
    public class GetAuthMeDto
    {
        public Guid Id { get; set; }
        public string FullName { get; set; } = String.Empty;
        public string UserName { get; set; } = String.Empty;
        public string Email { get; set; } = String.Empty;
        public string PhoneNumber { get; set; } = String.Empty;
        public DateTime BirthDay { get; set; }
        public List<GetRoleAuthMeDto> Roles { get; set; } = new List<GetRoleAuthMeDto>();
    }


    public class GetRoleAuthMeDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = String.Empty;
        public List<GetPermissionAuthMeDto> Permissions { get; set; } = new List<GetPermissionAuthMeDto>();
    }

    public class GetPermissionAuthMeDto
    {
        public string Key { get; set; } = String.Empty;
        public string Name { get; set; } = String.Empty;
        public string Category { get; set; } = String.Empty;
    }
}
