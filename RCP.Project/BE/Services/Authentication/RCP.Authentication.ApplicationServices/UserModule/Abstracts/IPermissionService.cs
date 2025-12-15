using RCP.Authentication.Dtos.Permission;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.Authentication.ApplicationService.UserModule.Abstracts
{
    public  interface IPermissionService
    {
        public List<ViewPermissionDto> GetAllPermissions();
    }
}
