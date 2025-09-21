using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.Authentication.Dtos.Role
{
    public class ViewRolePermissionDto
    {
        public int Id { get; set; }
        public string Category { get; set; } = String.Empty;
        public string Key { get; set; } = String.Empty;

        public string Name { get; set; } = String.Empty;
    }
    public class ViewRoleDto
    {
        public string Id { get; set; } = String.Empty;

        public string Name { get; set; } = String.Empty;

        public List<ViewRolePermissionDto> Permissions { get; set; } = new List<ViewRolePermissionDto>();
    }
}
