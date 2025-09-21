using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.Shared.Constant.Constants.Auth
{
    public static class AuthConstants
    {

        public const int PasswordLength = 8;
    }

    public static class CustomClaimTypes
    {
        public const string Permission = "Permission";
        public const string UserType = "user_type";
    }
}
