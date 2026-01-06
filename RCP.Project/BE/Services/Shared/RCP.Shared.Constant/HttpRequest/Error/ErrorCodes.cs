namespace RCP.Shared.Constant.HttpRequest.Error
{
    public class ErrorCodes
    {
        //Các mã lỗi căn bản
        public const int System = 1;
        public const int BadRequest = 400;
        public const int Unauthorized = 401;
        public const int NotFound = 404;
        public const int Found = 409;
        public const int InternalServerError = 500;
        public const int AuthErrorUserAlreadyExists = 501;
        public const int AuthErrorInvalidEmail = 502;
        public const int AuthErrorInvalidPhoneNumber = 503;
        public const int AuthErrorPasswordTooWeak = 504;
        public const int AuthErrorUserCreationFailed = 505;
        public const int AuthErrorInvalidUserName = 506;
        public const int AuthErrorUserNotFound = 507;
        public const int AuthErrorInvalidPassword = 508;
        // Additional validation errors
        public const int AuthErrorUserNameRequired = 509;
        public const int AuthErrorFullNameRequired = 510;
        public const int AuthErrorEmailRequired = 511;
        public const int AuthErrorPhoneNumberRequired = 512;
        public const int AuthErrorPasswordRequired = 513;
        public const int AuthErrorInvalidBirthDay = 514;
        public const int AuthErrorPermissionKeyExists = 515;
        //Mã lỗi Cinema
        public const int CinemaErrorNotFound = 1001;
        public const int RoomErrorNotFound = 1002;
        public const int RoomErrorInvalidTongSoLuongGhe = 1003;
        public const int CinemaErrorGiaVeNotFound = 1004;

        //Mã lỗi Cloudinary 
        public const int CloudinaryUploadFailed = 2001;
        public const int CloudinaryFileEmpty = 2002;
        public const int CloudinaryInvalidFileType = 2003;
        public const int CloudinaryFileTooLarge = 2004;
        public const int CloudinaryConfigMissing = 2005;
        //Mã lỗi Asset
        public const int AssetErrorNotFound = 3001;
        public const int AssetErrorAlreadyExists = 3002;
        //Mã lỗi Menu
        public const int MenuErrorNotFound = 4001;
        public const int MenuErrorThucDonNotFound = 4002;
        public const int MenuErrorMonNotFound = 4003;
        public const int MenuErrorMonAlreadyInThucDon = 4004;
        public const int MenuErrorKhoNotFound = 4005;
        public const int MenuErrorNguyenLieuNotFound = 4006;
        public const int MenuErrorInvalidSoLuongNguyenLieu = 4007;
        public const int MenuErrorKhongDuNguyenLieu = 4008;
        public const int MenuErrorThucDonMonNotFound = 4009;



        //Mã lỗi Phim 
        public const int PhimErrorPhimDaChieu = 5001;


        public const int GheNotFound = 6001;
        public const int GheDaDuocDat = 6002;
        public const int GheDangDuocGiu = 6003;
        public const int GheTamGiuKhongHopLe = 6004;
        public const int KhongCoQuyenXacNhan = 6005;
        public const int KhongCoQuyenHuy = 6006;
        public const int GheTamGiuNotFound = 6007;
        public const int SuatChieuNotFound = 6008;
        public const int VeNotFound = 6009;

    }
}