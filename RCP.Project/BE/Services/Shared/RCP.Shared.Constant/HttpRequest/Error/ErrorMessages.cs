namespace RCP.Shared.Constant.HttpRequest.Error
{
    public class ErrorMessages
    {
        private static readonly Dictionary<int, string> _messages = new()
        {

            { ErrorCodes.System, "Lỗi hệ thống" },
            { ErrorCodes.InternalServerError, "Lỗi server" },
            { ErrorCodes.BadRequest, "Request không hợp lệ" },
            { ErrorCodes.NotFound, "Không tìm thấy trong hệ thống" },
            { ErrorCodes.Unauthorized, "Không được phân quyền" },

            { ErrorCodes.AuthErrorUserAlreadyExists, "Tài khoản đã tồn tại" },
            { ErrorCodes.AuthErrorInvalidEmail, "Email không hợp lệ" },
            { ErrorCodes.AuthErrorInvalidPhoneNumber, "Số điện thoại không hợp lệ" },
            { ErrorCodes.AuthErrorPasswordTooWeak, "Mật khẩu phải có ít nhất 6 ký tự" },
            { ErrorCodes.AuthErrorUserCreationFailed, "Tạo tài khoản thất bại" },
            { ErrorCodes.AuthErrorInvalidUserName, "Tên đăng nhập không hợp lệ" },
            { ErrorCodes.AuthErrorUserNotFound, "Tài khoản không tồn tại" },
            { ErrorCodes.AuthErrorInvalidPassword, "Mật khẩu không chính xác" },
            
            // Additional validation errors
            { ErrorCodes.AuthErrorUserNameRequired, "Tên đăng nhập là bắt buộc" },
            { ErrorCodes.AuthErrorFullNameRequired, "Họ tên là bắt buộc" },
            { ErrorCodes.AuthErrorEmailRequired, "Email là bắt buộc" },
            { ErrorCodes.AuthErrorPhoneNumberRequired, "Số điện thoại là bắt buộc" },
            { ErrorCodes.AuthErrorPasswordRequired, "Mật khẩu là bắt buộc" },
            { ErrorCodes.AuthErrorInvalidBirthDay, "Ngày sinh không hợp lệ" },
            { ErrorCodes.AuthErrorPermissionKeyExists, "Khóa quyền đã tồn tại trong hệ thống" },





            //Message mã lỗi cinema
            { ErrorCodes.CinemaErrorNotFound, "Rạp chiếu không tồn tại" },
        };
        public static string GetMessage(int code)
        {
            return _messages.TryGetValue(code, out var message) ? message : "Unknown error.";
        }
    }

}

