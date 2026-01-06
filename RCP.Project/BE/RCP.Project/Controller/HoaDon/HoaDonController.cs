using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RCP.DatVe.ApplicationService.Implements;
using RCP.DatVe.ApplicationService.Interfaces;
using RCP.DatVe.Dtos;
using RCP.HoaDon.ApplicationService.Interfaces;
using RCP.HoaDon.Dtos;
using RCP.Project.Controller.Base;
using RCP.Project.Controller.DatVe;
using RCP.Project.HttpRequest;

namespace RCP.Project.Controller.HoaDon
{
    [Route("api/app/hoa-don")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class HoaDonController: BaseController
    {
        private readonly IHoaDonService _hoaDonService;

        public HoaDonController(ILogger<HoaDonController> logger, IHoaDonService hoaDonService) : base(logger)
        {
            _hoaDonService = hoaDonService;
        }
        [HttpPut("")]
        public ApiResponse Update([FromBody] UpdateHoaDonDto dto)
        {
            try
            {
                var data =  _hoaDonService.Update(dto);
                return new(data);
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }
    }

}
