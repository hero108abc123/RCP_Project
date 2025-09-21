using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.Authentication.Dtos.User
{
    public class UpdateUserDto
    {
       public string UserName { get; set; } = String.Empty;
       public string FullName { get; set; } = String.Empty;
       public string Email { get; set; } = String.Empty;
       public string PhoneNumber { get; set; } = String.Empty;  
       public DateTime BirthDay { get; set; }

       public List<string> RoleNames { get; set; } = new List<string>();
    }
}
