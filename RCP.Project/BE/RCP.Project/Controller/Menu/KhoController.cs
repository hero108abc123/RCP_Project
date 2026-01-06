using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RCP.Menu.ApplicationService.MenuModule.Abstracts;
using RCP.Menu.Dtos.Kho;
using RCP.Project.Attributes;
using RCP.Project.Controller.Base;
using RCP.Project.HttpRequest;
using RCP.Shared.Constant.Constants.Auth;

namespace RCP.Project.Controller.Menu
{
    [Route("api/app/kho")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class KhoController : BaseController
    {
        private readonly IKhoService _khoService;

        public KhoController(ILogger<KhoController> logger, IKhoService khoService) : base(logger)
        {
            _khoService = khoService;
        }
        [Permission(PermissionKeys.KhoAdd)]
        [HttpPost("")]
        public ApiResponse Create([FromBody] CreateKhoDto dto)
        {
            try
            {
                _khoService.Create(dto);
                return new();
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }

        [Permission(PermissionKeys.KhoUpdate)]
        [HttpPut("")]
        public ApiResponse Update([FromBody] UpdateKhoDto dto)
        {
            try
            {
                _khoService.Update(dto);
                return new();
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }
        [Permission(PermissionKeys.KhoDelete)]
        [HttpDelete("{id}")]
        public ApiResponse Delete([FromRoute] int id)
        {
            try
            {
                _khoService.Delete(id);
                return new();
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }
        [Permission(PermissionKeys.KhoView)]
        [HttpGet("")]
        public ApiResponse FindPaging([FromQuery] FindPagingKhoDto dto)
        {
            try
            {
                var data = _khoService.FindPaging(dto);
                return new(data);
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }
        [Permission(PermissionKeys.KhoView)]
        [HttpGet("cinema/{idCinema}/drop-down")]
        public ApiResponse GetList([FromRoute] int idCinema)
        {
            try
            {
                var data = _khoService.GetList(idCinema);
                return new(data);
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }
        [Permission(PermissionKeys.KhoView)]
        [HttpGet("hang-trong-kho")]
        public ApiResponse FindPagingHangTrongKho([FromQuery] FindPagingByIdKhoDto dto)
        {
            try
            {
                var data = _khoService.FindPagingHangTrongKho(dto);
                return new(data);
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }
        [Permission(PermissionKeys.KhoView)]
        [HttpGet("{id}")]
        public ApiResponse FindbyId([FromRoute] int id)
        {
            try
            {
                var data = _khoService.GetById(id);
                return new(data);
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }
        [Permission(PermissionKeys.KhoView)]
        [HttpGet("{id}/hang-trong-kho")]
        public ApiResponse FindMatHangTrongKhobyId([FromRoute] int id)
        {
            try
            {
                var data = _khoService.GetMatHangTrongKhoById(id);
                return new(data);
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }
        [Permission(PermissionKeys.KhoAdd)]
        [HttpPost("nhap-hang")]
        public ApiResponse CreateNhapHang([FromBody] CreateNhapHangDto dto)
        {
            try
            {
                _khoService.CreateNhapHang(dto);
                return new();
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }
        [Permission(PermissionKeys.KhoAdd)]
        [HttpPut("nhap-hang")]
        public ApiResponse UpdateNhapHang([FromBody] UpdateNhapHangDto dto)
        {
            try
            {
                _khoService.UpdateNhapHang(dto);
                return new();
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }

        [Permission(PermissionKeys.KhoDelete)]
        [HttpDelete("{idKho}/hang/{idHang}")]
        public ApiResponse DeleteHangKhoiKho([FromRoute] int idKho, [FromRoute] int idHang)
        {
            try
            {
                _khoService.DeleteHangKhoiKho(idKho,idHang);
                return new();
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }

    }
}