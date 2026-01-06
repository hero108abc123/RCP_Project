using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RCP.Menu.ApplicationService.MenuModule.Abstracts;
using RCP.Menu.ApplicationService.MenuModule.Implements;
using RCP.Menu.Dtos.Kho;
using RCP.Menu.Dtos.ThongKe;
using RCP.Project.Attributes;
using RCP.Project.Controller.Base;
using RCP.Project.HttpRequest;
using RCP.Shared.Constant.Constants.Auth;

namespace RCP.Project.Controller.Menu
{
    [Route("api/app/thong-ke-kho")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class ThongKeController : BaseController
    {
        private readonly IThongKeService _thongKeService;

        public ThongKeController(ILogger<ThongKeController> logger, IThongKeService thongKeService) : base(logger)
        {
            _thongKeService = thongKeService;
        }

        [Permission(PermissionKeys.ThongKeKhoView)]
        [HttpGet("")]
        public ApiResponse FindPaging([FromQuery] FindPagingThongKeDto dto)
        {
            try
            {
                var data = _thongKeService.FindPaging(dto);
                return new(data);
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }
    }
}
