using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RCP.DatVe.ApplicationService.Interfaces;
using RCP.DatVe.Dtos;
using RCP.Project.Controller.Base;
using RCP.Project.HttpRequest;
using System;
using System.Threading.Tasks;

namespace RCP.Project.Controller.DatVe
{
    [Route("api/app/dat-ve")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class DatVeController : BaseController
    {
        private readonly IDatVeService _datVeService;

        public DatVeController(ILogger<DatVeController> logger, IDatVeService datVeService) : base(logger)
        {
            _datVeService = datVeService;
        }

        /// <summary>
        /// Lấy trạng thái tất cả ghế trong phòng chiếu
        /// </summary>
        /// <remarks>
        /// Trạng thái ghế:
        /// - 0: Trống (available)
        /// - 1: Đã đặt (booked)
        /// - 2: Đang giữ bởi người khác (holding by others)
        /// - 3: Đang giữ bởi user hiện tại (holding by current user)
        /// </remarks>
        [HttpPost("trang-thai-ghe")]
        public async Task<ApiResponse> GetTrangThaiGhe([FromBody] GetTrangThaiGheDto dto)
        {
            try
            {
                var data = await _datVeService.GetTrangThaiGhe(dto);
                return new(data);
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }

        /// <summary>
        /// Đặt vé tạm thời (giữ ghế trong 10 phút)
        /// </summary>
        /// <remarks>
        /// - Tự động hủy tất cả ghế cũ trong session (nếu có)
        /// - Validate ghế chưa bị đặt và chưa bị giữ bởi người khác
        /// - Trả về countdown 10 phút và tổng giá vé
        /// </remarks>
        [HttpPost("dat-ve-tam")]
        public async Task<ApiResponse> DatVeTam([FromBody] DatVeTamDto dto)
        {
            try
            {
                var data = await _datVeService.DatVeTam(dto);
                return new(data);
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }

        /// <summary>
        /// Hủy tất cả ghế tạm giữ trong session
        /// </summary>
        /// <remarks>
        /// Sử dụng khi:
        /// - User click "Hủy tất cả"
        /// - User đóng trình duyệt (beforeunload event)
        /// - Reset lựa chọn ghế
        /// </remarks>
        [HttpDelete("huy-dat-ve-tam-by-session")]
        public async Task<ApiResponse> HuyDatVeTamBySession([FromQuery] string sessionId)
        {
            try
            {
                if (string.IsNullOrEmpty(sessionId))
                {
                    return new ApiResponse
                    {
                        Message = "SessionId không được để trống"
                    };
                }

                await _datVeService.HuyDatVeTamBySession(sessionId);
                return new();
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }

        /// <summary>
        /// Hủy đặt vé tạm của 1 ghế cụ thể (giải phóng ghế trước hạn)
        /// </summary>
        /// <remarks>
        /// Chỉ hủy được ghế do chính user giữ
        /// </remarks>
        [HttpDelete("huy-dat-ve-tam/{idGheTamGiu}")]
        public async Task<ApiResponse> HuyDatVeTam([FromRoute] int idGheTamGiu)
        {
            try
            {
                await _datVeService.HuyDatVeTam(idGheTamGiu);
                return new();
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }

        /// <summary>
        /// Xác nhận đặt vé cho user đã đăng nhập (đặt trên app/web)
        /// </summary>
        /// <remarks>
        /// - Lấy thông tin từ tài khoản user đã login
        /// - Tạo vé với List IdGhe (1 vé nhiều ghế)
        /// - Tự động tạo hóa đơn với trạng thái "Chưa thanh toán"
        /// - Xóa tất cả ghế tạm giữ liên quan
        /// - Trả về VeId để redirect sang trang thanh toán
        /// </remarks>
        [HttpPost("xac-nhan-by-user-id")]
        public async Task<ApiResponse> XacNhanDatVeByUserId([FromBody] XacNhanDatVeByUserIdDto dto)
        {
            try
            {
                var veId = await _datVeService.XacNhanDatVeByUserId(dto);
                return new(new { IdVe = veId });
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }

        /// <summary>
        /// Xác nhận đặt vé cho khách hàng offline (nhân viên đặt giúp tại quầy)
        /// </summary>
        /// <remarks>
        /// - Nhập thông tin khách hàng thủ công (HoVaTen, SoDienThoai, Email...)
        /// - Không cần user đăng nhập
        /// - Tạo vé với trạng thái "Chưa thanh toán"
        /// - Tự động tạo hóa đơn
        /// - Trả về VeId để in vé hoặc xử lý thanh toán
        /// </remarks>
        [HttpPost("xac-nhan-by-user-infor")]
        public async Task<ApiResponse> XacNhanDatVeByUserInfor([FromBody] XacNhanDatVeByUserInfor dto)
        {
            try
            {
                var veId = await _datVeService.XacNhanDatVeByUserInfor(dto);
                return new(new { IdVe = veId });
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }

        /// <summary>
        /// Lấy thông tin chi tiết vé
        /// </summary>
        /// <remarks>
        /// Trả về đầy đủ thông tin:
        /// - Thông tin rạp chiếu (tên, địa chỉ đầy đủ)
        /// - Thông tin phòng chiếu
        /// - Thông tin phim (tên, thời lượng, phân loại độ tuổi)
        /// - Lịch chiếu (thời gian bắt đầu/kết thúc)
        /// - Danh sách ghế đã đặt (tên ghế, hạng ghế, giá từng ghế)
        /// - Tổng tiền
        /// 
        /// Sử dụng để:
        /// - Hiển thị thông tin trên màn thanh toán
        /// - In vé
        /// - Xem lại thông tin vé đã đặt
        /// </remarks>
        [HttpGet("{idVe}")]
        public async Task<ApiResponse> GetVeById([FromRoute] int idVe)
        {
            try
            {
                var data = await _datVeService.GetVeById(idVe);
                return new(data);
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }

        /// <summary>
        /// Hủy vé theo SessionId
        /// </summary>
        /// <remarks>
        /// Sử dụng khi:
        /// - User hủy booking trước khi thanh toán
        /// - Cronjob tự động hủy vé quá hạn (chưa thanh toán trong thời gian quy định)
        /// - Admin hủy vé
        /// 
        /// Lưu ý:
        /// - Chỉ hủy được vé chưa thanh toán
        /// - Ghế sẽ được giải phóng và có thể đặt lại
        /// - Soft delete (không xóa hẳn khỏi database)
        /// </remarks>
        [HttpDelete("huy-ve-by-session")]
        public async Task<ApiResponse> HuyVeBySessionId([FromBody] HuyVeBySessionIdDto dto)
        {
            try
            {
                if (string.IsNullOrEmpty(dto.SessionId))
                {
                    return new ApiResponse
                    {
                        Message = "SessionId không được để trống"
                    };
                }

                await _datVeService.HuyVeBySessionId(dto);
                return new();
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }
    }
}