using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.Authentication.Dtos.Permission
{
    public  class CreatePermissionDto
    {
        public string Key { get; set; } = String.Empty;
        public string Name { get; set; } = String.Empty;
        public string Category { get; set; } = String.Empty;
        public string Description { get; set; } = String.Empty;

    }
}
