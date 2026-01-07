using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RCP.HoaDon.ApplicationService.Interfaces;
using RCP.HoaDon.Domain;
using RCP.HoaDon.Dtos;
using RCP.HoaDon.Infrastructure;
using RCP.Project.Controller.Base;
using RCP.Project.HttpRequest;
using RCP.Shared.Constant.Constants.DatVe;
using RCP.ThanhToan.Dtos;
using System.Security.Claims;
using VNPAY;
using VNPAY.Models;
using VNPAY.Models.Enums;
using VNPAY.Models.Exceptions;

namespace RCP.Project.Controller.Payment
{
    [Route("api/app/vnpay")]
    [ApiController]
    public class VnpayController : BaseController
    {
        private readonly IVnpayClient _vnpayClient;
        private readonly HoaDonDbContext _hoaDonDbContext;
        private readonly IHoaDonService _hoaDonService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private static readonly TimeZoneInfo VietnamTimeZone = TimeZoneInfo.FindSystemTimeZoneById("SE Asia Standard Time");

        public VnpayController(
            ILogger<VnpayController> logger,
            IVnpayClient vnpayClient,
            HoaDonDbContext hoaDonDbContext,
            IHoaDonService hoaDonService,
            IHttpContextAccessor httpContextAccessor)
            : base(logger)
        {
            _vnpayClient = vnpayClient;
            _hoaDonDbContext = hoaDonDbContext;
            _hoaDonService = hoaDonService;
            _httpContextAccessor = httpContextAccessor;
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("create-payment-url")]
        public ApiResponse CreatePaymentUrl([FromBody] CreatePaymentRequestDto dto)
        {
            try
            {
                var request = new VnpayPaymentRequest
                {
                    Money = (double)dto.Amount,
                    Description = dto.Description,
                    BankCode = dto.BankCode ?? BankCode.ANY,
                    Language = dto.Language ?? DisplayLanguage.Vietnamese
                };

                var paymentUrlInfo = _vnpayClient.CreatePaymentUrl(request);

                var mapping = new PaymentSession
                {
                    PaymentId = paymentUrlInfo.PaymentId.ToString(),
                    SessionId = dto.SessionId,
                    CreatedBy = GetCurrentUserId(),
                    CreatedDate = GetVietnamTime(),
                    Deleted = false
                };

                _hoaDonDbContext.PaymentSessions.Add(mapping);
                _hoaDonDbContext.SaveChanges();

               

                var response = new PaymentUrlResponseDto
                {
                    PaymentUrl = paymentUrlInfo.Url,
                    TransactionId = paymentUrlInfo.PaymentId.ToString()
                };

                return new ApiResponse(response);
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }

        [HttpGet("callback")]
        [AllowAnonymous]
        public ApiResponse Callback()
        {
            string sessionId = string.Empty;
            string paymentId = string.Empty;

            try
            {
                var paymentResult = _vnpayClient.GetPaymentResult(this.Request);
                paymentId = paymentResult.PaymentId.ToString();

                var amountString = Request.Query["vnp_Amount"].ToString();
                var orderInfo = Request.Query["vnp_OrderInfo"].ToString();

                var mapping = _hoaDonDbContext.PaymentSessions
                    .FirstOrDefault(x => x.PaymentId == paymentId && !x.Deleted);

                if (mapping == null)
                {
                 
                    throw new Exception("Không tìm thấy thông tin giao dịch");
                }

                sessionId = mapping.SessionId;

                decimal amount = 0;
                if (!string.IsNullOrEmpty(amountString) && long.TryParse(amountString, out long amountValue))
                {
                    amount = amountValue / 100m;
                }

                _hoaDonService.UpdateTrangThaiHoaDon(new UpdateTrangThaiHoaDonDto
                {
                    SessionId = sessionId,
                    TrangThai = DatVeConstants.DaThanhToan
                });

            

                var response = new PaymentCallbackDto
                {
                    Success = true,
                    TransactionId = paymentResult.PaymentId.ToString(),
                    Amount = amount,
                    OrderInfo = orderInfo,
                    PayDate = paymentResult.Timestamp.ToString("yyyyMMddHHmmss"),
                    StatusCode = "00",
                    Message = "Thanh toán thành công"
                };

                return new ApiResponse(response);
            }
            catch (VnpayException ex)
            {
               

                if (!string.IsNullOrEmpty(sessionId))
                {
                    try
                    {
                        _hoaDonService.UpdateTrangThaiHoaDon(new UpdateTrangThaiHoaDonDto
                        {
                            SessionId = sessionId,
                            TrangThai = DatVeConstants.Loi
                        });
                    }
                    catch (Exception updateEx)
                    {

                    }
                }

                return OkException(ex);
            }
            catch (Exception ex)
            {
               


                if (!string.IsNullOrEmpty(sessionId))
                {
                    try
                    {
                        _hoaDonService.UpdateTrangThaiHoaDon(new UpdateTrangThaiHoaDonDto
                        {
                            SessionId = sessionId,
                            TrangThai = DatVeConstants.Loi
                        });
                    }
                    catch (Exception updateEx)
                    {
                        
                    }
                }

                return OkException(ex);
            }
        }

        [HttpGet("ipn")]
        [AllowAnonymous]
        public IActionResult IPN()
        {
            string sessionId = string.Empty;
            string paymentId = string.Empty;

            try
            {
                var paymentResult = _vnpayClient.GetPaymentResult(this.Request);
                paymentId = paymentResult.PaymentId.ToString();

                var mapping = _hoaDonDbContext.PaymentSessions
                    .FirstOrDefault(x => x.PaymentId == paymentId && !x.Deleted);

                if (mapping == null)
                {
                   
                    return Ok(new { RspCode = "99", Message = "Payment mapping not found" });
                }

                sessionId = mapping.SessionId;

                _hoaDonService.UpdateTrangThaiHoaDon(new UpdateTrangThaiHoaDonDto
                {
                    SessionId = sessionId,
                    TrangThai = DatVeConstants.DaThanhToan
                });

                

                return Ok(new { RspCode = "00", Message = "Confirm Success" });
            }
            catch (VnpayException ex)
            {
               
                return Ok(new { RspCode = "99", Message = "Input error" });
            }
            catch (Exception ex)
            {
               
                return Ok(new { RspCode = "99", Message = "Unknown error" });
            }
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("check-status/{transactionId}")]
        public ApiResponse CheckPaymentStatus([FromRoute] string transactionId)
        {
            try
            {
                var response = new PaymentStatusDto
                {
                    TransactionId = transactionId,
                    Message = "Vui lòng implement logic kiểm tra từ database"
                };

                return new ApiResponse(response);
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }

        private string GetCurrentUserId()
        {
            var data = _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(data))
            {
                data = _httpContextAccessor.HttpContext?.User.FindFirstValue("sub");
            }
            return data ?? string.Empty;
        }

        private static DateTime GetVietnamTime()
        {
            return TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, VietnamTimeZone);
        }
    }
}