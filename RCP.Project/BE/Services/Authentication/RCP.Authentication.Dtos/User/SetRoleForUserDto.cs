using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.Authentication.Dtos.User
{
    public class SetRoleForUserDto
    {
        [Required(AllowEmptyStrings = false, ErrorMessage = "Không được bỏ trống")]

        public List<string> RoleNames { get; set; } = new List<string>();
    }
}
