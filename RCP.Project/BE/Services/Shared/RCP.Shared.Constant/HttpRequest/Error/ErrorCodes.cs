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

    }
}
