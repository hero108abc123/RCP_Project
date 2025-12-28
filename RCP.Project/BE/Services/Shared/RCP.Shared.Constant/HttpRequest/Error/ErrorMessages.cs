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

            //Msg mã lỗi cloudinary
            { ErrorCodes.CloudinaryUploadFailed, "Upload file lên Cloudinary thất bại" },
            { ErrorCodes.CloudinaryFileEmpty, "File không được để trống" },
            { ErrorCodes.CloudinaryInvalidFileType, "Định dạng file không hợp lệ" },
            { ErrorCodes.CloudinaryFileTooLarge, "Kích thước file vượt quá giới hạn cho phép" },
            { ErrorCodes.CloudinaryConfigMissing, "Thiếu cấu hình Cloudinary" },
        };
        public static string GetMessage(int code)
        {
            return _messages.TryGetValue(code, out var message) ? message : "Unknown error.";
        }
    }

}

