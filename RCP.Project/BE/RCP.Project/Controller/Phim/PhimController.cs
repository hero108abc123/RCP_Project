using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RCP.Movie.ApplicationServices.PhimModule.Abstracts;
using RCP.Movie.Dtos.Phim;
using RCP.Project.Attributes;
using RCP.Project.Controller.Base;
using RCP.Project.HttpRequest;
using RCP.Shared.Constant.Constants.Auth;

namespace RCP.Project.Controller.Phim
{
    [Route("api/app/phim")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class PhimController : BaseController
    {
        private readonly IPhimService _phimService;

        public PhimController(ILogger<BaseController> logger, IPhimService phimService)
            : base(logger)
        {
            _phimService = phimService;
        }

        // GET: api/app/phim
        [Permission(PermissionKeys.PhimView)]
        [HttpGet("find")]
        public ApiResponse Find([FromQuery] FindPhimDto dto)
        {
            try
            {
                var data = _phimService.FindPaging(dto);
                return new(data);
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }

        // POST: api/app/phim
        [Permission(PermissionKeys.PhimCreate)]
        [HttpPost("create")]
        public ApiResponse Create([FromBody] CreatePhimDto dto)
        {
            try
            {
                var data = _phimService.CreatePhim(dto);
                return new(data);
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }

        // PUT: api/app/phim/{id}
        [Permission(PermissionKeys.PhimUpdate)]
        [HttpPut("update/{id}")]
        public ApiResponse Update([FromBody] int id, UpdatePhimDto dto)
        {
            try
            {
                var data = _phimService.UpdatePhim(id, dto);
                return new(data);
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }

        [Permission(PermissionKeys.PhimDelete)]
        [HttpDelete("delete/{id}")]
        public ApiResponse Delete([FromBody] int id)
        {
            try
            {
                var data = _phimService.DeletePhim(id);
                return new(data);
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }

    }
}
