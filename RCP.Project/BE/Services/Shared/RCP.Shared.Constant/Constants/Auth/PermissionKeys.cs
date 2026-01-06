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

        public const string CategoryGiaVe = "QL Giá vé";
        public const string GiaVeView = Function + "GiaVeView";
        public const string GiaVeAdd = Function + "GiaVeCreate";
        public const string GiaVeUpdate = Function + "GiaVeUpdate";
        public const string GiaVeDelete = Function + "GiaVeDelete";

        public const string CategoryRoom = "QL Phòng chiếu";
        public const string RoomView = Function + "RoomView";
        public const string RoomAdd = Function + "RoomCreate";
        public const string RoomUpdate = Function + "RoomUpdate";
        public const string RoomDelete = Function + "CinemaDelete";

        public const string CategoryLichChieu = "QL Lịch chiếu";
        public const string LichChieuView = Function + "LichChieuView";
        public const string LichChieuAdd = Function + "LichChieuCreate";
        public const string LichChieuUpdate = Function + "LichChieuUpdate";
        public const string LichChieuDelete = Function + "LichChieuDelete";

        public const string CategoryAsset = "QL Tài sản";
        public const string AssetView = "Asset_View";
        public const string AssetAdd = "Asset_Add";
        public const string AssetUpdate = "Asset_Update";
        public const string AssetDelete = "Asset_Delete";

        public const string CategoryMenu = "QL Menu";
        public const string MenuView = "Menu_View";
        public const string MenuAdd = "Menu_Add";
        public const string MenuUpdate = "Menu_Update";
        public const string MenuDelete = "Menu_Delete";


        public const string CategoryKho = "QL Kho";
        public const string KhoView = "Kho_View";
        public const string KhoAdd = "Kho_Add";
        public const string KhoUpdate = "Kho_Update";
        public const string KhoDelete = "Kho_Delete";


        public const string CategoryHang = "QL Hàng";
        public const string HangView = "Hang_View";
        public const string HangAdd = "Hang_Add";
        public const string HangUpdate = "Hang_Update";
        public const string HangDelete = "Hang_Delete";


        public const string CategoryThongKeKho = "QL thống kê kho ";
        public const string ThongKeKhoView = "ThongKeKho_View";

        public const string CategoryMon = "QL Món";
        public const string MonView = "Mon_View";
        public const string MonAdd = "Mon_Add";
        public const string MonUpdate = "Mon_Update";
        public const string MonDelete = "Mon_Delete";



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

            (GiaVeView, "Xem Gía vé", CategoryGiaVe),
            (GiaVeAdd, "Thêm Gía vé", CategoryGiaVe),
            (GiaVeUpdate, "Cập nhật Gía vé", CategoryGiaVe),
            (GiaVeDelete, "Xóa Gía vé", CategoryGiaVe ),

            (LichChieuView, "Xem Lịch chiếu", CategoryLichChieu),
            (LichChieuAdd, "Thêm Lịch chiếu", CategoryLichChieu),
            (LichChieuUpdate, "Cập nhật Lịch chiếu", CategoryLichChieu),
            (LichChieuDelete, "Xóa Lịch chiếu", CategoryLichChieu ),


            (AssetView, "Xem Tài sản", CategoryAsset),
            (AssetAdd, "Thêm Tài sản", CategoryAsset),
            (AssetUpdate, "Cập nhật Tài sản", CategoryAsset),
            (AssetDelete, "Xóa Tài sản", CategoryAsset),

            (MenuView, "Xem Menu", CategoryMenu),
            (MenuAdd, "Thêm Menu", CategoryMenu),
            (MenuUpdate, "Cập nhật Menu", CategoryMenu),
            (MenuDelete, "Xóa Menu", CategoryMenu),


            (KhoView, "Xem Kho", CategoryKho),
            (KhoAdd, "Thêm Kho", CategoryKho),
            (KhoUpdate, "Cập nhật Kho", CategoryKho),
            (KhoDelete, "Xóa Kho", CategoryKho),


            (HangView, "Xem Hàng", CategoryHang),
            (HangAdd, "Thêm Hàng", CategoryHang),
            (HangUpdate, "Cập nhật Hàng", CategoryHang),
            (HangDelete, "Xóa Hàng", CategoryHang),


            (ThongKeKhoView, "Xem Thống kê kho", CategoryThongKeKho),


            (MonView, "Xem Món", CategoryMon),
            (MonAdd, "Thêm Món", CategoryMon),
            (MonUpdate, "Cập nhật Món", CategoryMon),
            (MonDelete, "Xóa Món", CategoryMon),
        };
    }
}
