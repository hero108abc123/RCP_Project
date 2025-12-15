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

        public const string CategoryPhim = "QL Phim";
        public const string PhimView = Function + "PhimView";
        public const string PhimCreate = Function + "PhimCreate";
        public const string PhimUpdate = Function + "PhimUpdate";
        public const string PhimDelete = Function + "PhimDelete";

        public const string CategoryCinema = "QL Rạp chiếu";
        public const string CinemaView = Function + "CinemaView";
        public const string CinemaAdd = Function + "CinemaCreate";
        public const string CinemaUpdate = Function + "CinemaUpdate";
        public const string CinemaDelete = Function + "CinemaDelete";

        public const string CategoryRoom = "QL Phòng chiếu";
        public const string RoomView = Function + "RoomView";
        public const string RoomAdd = Function + "RoomCreate";
        public const string RoomUpdate = Function + "RoomUpdate";
        public const string RoomDelete = Function + "CinemaDelete";



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


            (PhimView, "Xem Phim", CategoryPhim),
            (PhimCreate, "Thêm Phim", CategoryPhim),
            (PhimUpdate, "Cập nhật Phim", CategoryPhim),
            (PhimDelete, "Xóa Phim", CategoryPhim ),

            (CinemaView, "Xem Rạp chiếu", CategoryCinema),
            (CinemaAdd, "Thêm Rạp chiếu", CategoryCinema),
            (CinemaUpdate, "Cập nhật Rạp chiếu", CategoryCinema),
            (CinemaDelete, "Xóa Rạp chiếu", CategoryCinema ),


            (RoomView, "Xem Phòng chiếu", CategoryRoom),
            (RoomAdd, "Thêm Phòng chiếu", CategoryRoom),
            (RoomUpdate, "Cập nhật Phòng chiếu", CategoryRoom),
            (RoomDelete, "Xóa Phòng chiếu", CategoryRoom ),
        };
    }
}
