 using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.Authentication.Dtos.User
{
    public class ViewUserPermissionDto
    {
        public int Id { get; set; }
        public string Category { get; set; } = String.Empty;
        public string Key { get; set; } = String.Empty;

        public string Name { get; set; } = String.Empty;
    }
    public class ViewUserRoleDto
    {
        public string Id { get; set; } = String.Empty;
        public string Name { get; set; } = String.Empty;
        public string NormalizedName { get; set; } = String.Empty;
        public List<ViewUserPermissionDto> Permissions { get; set; } = new List<ViewUserPermissionDto>();
    }
    public class ViewUserDto
    {
        public string Id { get; set; } = default!;
        public string UserName { get; set; } = default!;
        public string Email { get; set; } = default!;
        public string? PhoneNumber { get; set; }
        public string? FullName { get; set; }
        public DateTime BirthDay { get; set; }
        public bool EmailConfirmed { get; set; }
        public bool PhoneNumberConfirmed { get; set; }
        public DateTime CreatedAt { get; set; }


        public List<ViewUserRoleDto> Roles { get; set; } = new List<ViewUserRoleDto>();
    }
}
