using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.Shared.Constant.Constants.Auth
{
    public static class PermissionKeys
    {
        public const string Menu = "Menu.";
        public const string Function = "Function.";


        public const string CategoryUser = "QL User";
        public const string UserAdd = Function + "UserAdd";
        public const string UserUpdate = Function + "UserUpdate";
        public const string UserDelete = Function + "UserDelete";
        public const string UserView = Function + "UserView";
        public const string UserSetRoles = Function + "UserSetRoles";

        public const string CategoryRole = "QL Role";
        public const string RoleAdd = Function + "RoleAdd";
        public const string RoleUpdate = Function + "RoleUpdate";
        public const string RoleDelete = Function + "RoleDelete";
        public const string RoleView = Function + "RoleView";

        public const string CategoryPermission = "QL Permission";
        public const string PermissionAdd = Function + "PermissionAdd";
        public const string PermissionUpdate = Function + "PermissionUpdate";
        public const string PermissionDelete = Function + "PermissionDelete";
        public const string PermissionView = Function + "PermissionView";

        public static readonly (string Key, string Name, string Category)[] All =
        {
            (UserAdd, "Thêm user", CategoryUser),
            (UserUpdate, "Cập nhật User" , CategoryUser),
            (UserDelete, "Xoá User" , CategoryUser),
            (UserView, "Xem User" , CategoryUser),
            (UserSetRoles, "Gán role cho User" , CategoryUser),


            (RoleAdd, "Thêm Role", CategoryRole),
            (RoleUpdate, "Cập nhật Role", CategoryRole),
            (RoleDelete, "Xoá Role", CategoryRole),
            (RoleView, "Xem Role", CategoryRole),

            (PermissionAdd, "Thêm Permission", CategoryPermission),
            (PermissionUpdate, "Cập nhật Permission", CategoryPermission),
            (PermissionDelete, "Xoá Permission", CategoryPermission),
            (PermissionView, "Xem Permission", CategoryPermission),
        };
    }
}
