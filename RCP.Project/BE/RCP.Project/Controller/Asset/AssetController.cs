using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RCP.Asset.ApplicationServices.AssetModule.Abstracts;
using RCP.Asset.Dtos;
using RCP.Project.Attributes;
using RCP.Project.Controller.Base;
using RCP.Project.HttpRequest;
using RCP.Shared.Constant.Constants.Auth; // Đảm bảo namespace chứa PermissionKeys

namespace RCP.Project.Controller.Asset
{
    [Route("api/app/asset")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class AssetController : BaseController
    {
        private readonly IAssetService _assetService;

        public AssetController(ILogger<AssetController> logger, IAssetService assetService) : base(logger)
        {
            _assetService = assetService;
        }

        [Permission(PermissionKeys.AssetAdd)] // Cần định nghĩa key này trong PermissionKeys
        [HttpPost("")]
        public ApiResponse Create([FromBody] CreateAssetDto dto)
        {
            try
            {
                _assetService.Create(dto);
                return new();
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }

        [Permission(PermissionKeys.AssetView)] // Cần định nghĩa key này
        [HttpGet("")]
        public ApiResponse Find([FromQuery] FindPagingAssetDto dto)
        {
            try
            {
                var data = _assetService.Find(dto);
                return new(data);
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }

        [Permission(PermissionKeys.AssetView)]
        [HttpGet("{id}")]
        public ApiResponse FindById([FromRoute] int id)
        {
            try
            {
                var data = _assetService.FindById(id);
                return new(data);
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }

        [Permission(PermissionKeys.AssetUpdate)] // Cần định nghĩa key này
        [HttpPut("")]
        public ApiResponse Update([FromBody] UpdateAssetDto dto)
        {
            try
            {
                _assetService.Update(dto);
                return new();
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }

        [Permission(PermissionKeys.AssetDelete)] // Cần định nghĩa key này
        [HttpDelete("{id}")]
        public ApiResponse Delete([FromRoute] int id)
        {
            try
            {
                _assetService.Delete(id);
                return new();
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }
    }
}