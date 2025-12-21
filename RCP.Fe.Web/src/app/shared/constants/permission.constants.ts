export class PermissionConstants {
    static Menu = "Menu.";
    static Function = "Function.";



    static MenuUserManagement = this.Menu + "UserManagement";
    static MenuUserManagementUser = this.MenuUserManagement + "_User";
    static MenuUserManagementRole = this.MenuUserManagement + "_User";

    static MenuTraoBang = this.Menu + "TraoBang";

    static MenuTraoBangCauHinh = this.MenuTraoBang + "_CauHinh";
    static MenuTraoBangCauHinhChuongTrinh = this.MenuTraoBangCauHinh + "_ChuongTrinh";
    static MenuTraoBangCauHinhKhoa = this.MenuTraoBangCauHinh + "_Khoa";
    static MenuTraoBangCauHinhSinhVienNhanBang = this.MenuTraoBangCauHinh + "_SinhVienNhanBang";
    static MenuTraoBangQuetQr = this.MenuTraoBang + "_QuetQr";
    static MenuTraoBangMc = this.MenuTraoBang + "_Mc";

    static CategoryUser = "QL User";
    static UserAdd = this.Function + "UserAdd";
    static UserUpdate = this.Function + "UserUpdate";
    static UserDelete = this.Function + "UserDelete";
    static UserView = this.Function + "UserView";
    static UserSetRoles = this.Function + "UserSetRoles";

    static CategoryRole = "QL Role";
    static RoleAdd = this.Function + "Add";
    static RoleUpdate = this.Function + "Update";
    static RoleDelete = this.Function + "Delete";
    static RoleView = this.Function + "View";

}