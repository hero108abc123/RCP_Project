using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.Authentication.Dtos.Role
{
    public class ViewRoleDto
    {
        public string Id { get; set; } = String.Empty;

        public string Name { get; set; } = String.Empty;

        public List<string> PermissionKey { get; set; } = new List<string>();
    }
}
