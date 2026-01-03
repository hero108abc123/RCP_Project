using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RCP.Menu.ApplicationService.MenuModule.Abstracts;
using RCP.Menu.Dtos;
using RCP.Project.Attributes;
using RCP.Project.Controller.Base;
using RCP.Project.HttpRequest;
using RCP.Shared.Constant.Constants.Auth; // Đảm bảo đã định nghĩa PermissionKeys cho Menu

namespace RCP.Project.Controller.Menu
{
    [Route("api/app/menu")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class MenuController : BaseController
    {
        private readonly IMenuService _menuService;

        public MenuController(ILogger<MenuController> logger, IMenuService menuService) : base(logger)
        {
            _menuService = menuService;
        }

        [Permission(PermissionKeys.MenuAdd)] // Cần định nghĩa: public const string MenuAdd = "Menu_Add";
        [HttpPost("")]
        public async Task<ApiResponse> Create([FromForm] CreateMenuDto dto) // Dùng [FromForm] vì có upload file
        {
            try
            {
                await _menuService.Create(dto);
                return new();
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }

        [Permission(PermissionKeys.MenuView)] // Cần định nghĩa: public const string MenuView = "Menu_View";
        [HttpGet("")]
        public ApiResponse Find([FromQuery] FindPagingMenuDto dto)
        {
            try
            {
                var data = _menuService.Find(dto);
                return new(data);
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }

        [Permission(PermissionKeys.MenuView)]
        [HttpGet("{id}")]
        public ApiResponse FindById([FromRoute] int id)
        {
            try
            {
                var data = _menuService.FindById(id);
                return new(data);
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }

        [Permission(PermissionKeys.MenuUpdate)] // Cần định nghĩa: public const string MenuUpdate = "Menu_Update";
        [HttpPut("")]
        public async Task<ApiResponse> Update([FromForm] UpdateMenuDto dto) // Dùng [FromForm]
        {
            try
            {
                await _menuService.Update(dto);
                return new();
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }

        [Permission(PermissionKeys.MenuDelete)] // Cần định nghĩa: public const string MenuDelete = "Menu_Delete";
        [HttpDelete("{id}")]
        public ApiResponse Delete([FromRoute] int id)
        {
            try
            {
                _menuService.Delete(id);
                return new();
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }
    }
}