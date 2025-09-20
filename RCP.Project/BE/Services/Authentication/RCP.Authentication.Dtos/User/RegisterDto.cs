using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.Authentication.Dtos.User
{
    public class RegisterDto
    {
        public string UserName { get; set; } = String.Empty;
        public string FullName { get; set; } = String.Empty;
        public string Email { get; set; } = String.Empty;
        public string PhoneNumBer { get; set; } = String.Empty;
        public DateTime BirthDay { get; set; }
        public string Password { get; set; } = String.Empty;

    }
}
