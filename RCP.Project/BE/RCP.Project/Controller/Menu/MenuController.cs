using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RCP.Menu.ApplicationService.MenuModule.Abstracts;
using RCP.Menu.Dtos.Menu;
using RCP.Project.Attributes;
using RCP.Project.Controller.Base;
using RCP.Project.HttpRequest;
using RCP.Shared.Constant.Constants.Auth;

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

        [Permission(PermissionKeys.MenuAdd)]
        [HttpPost("")]
        public ApiResponse Create([FromBody] CreateMenuDto dto)
        {
            try
            {
                _menuService.Create(dto);
                return new();
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }

        [Permission(PermissionKeys.MenuUpdate)]
        [HttpPut("")]
        public ApiResponse Update([FromBody] UpdateMenuDto dto)
        {
            try
            {
                _menuService.Update(dto);
                return new();
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }

        [Permission(PermissionKeys.MenuDelete)]
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

        [Permission(PermissionKeys.MenuView)]
        [HttpGet("")]
        public ApiResponse FindPaging([FromQuery] FindPagingMenuDto dto)
        {
            try
            {
                var data = _menuService.FindPaging(dto);
                return new(data);
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }

        [Permission(PermissionKeys.MenuAdd)]
        [HttpPost("add-mon")]
        public ApiResponse AddMonVaoMenu([FromBody] AddMonVaoMenuDto dto)
        {
            try
            {
                _menuService.AddMonVaoMenu(dto);
                return new();
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }

        [Permission(PermissionKeys.MenuUpdate)]
        [HttpPut("update-mon")]
        public ApiResponse UpdateMonVaoMenu([FromBody] UpdateMonVaoDto dto)
        {
            try
            {
                _menuService.UpdateMonVaoMenu(dto);
                return new();
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }

        [Permission(PermissionKeys.MenuDelete)]
        [HttpDelete("delete-mon/{id}")]
        public ApiResponse DeleteMonKhoiMenu([FromRoute] int id)
        {
            try
            {
                _menuService.DeleteMonKhoiMenu(id);
                return new();
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }

        [Permission(PermissionKeys.MenuView)]
        [HttpGet("mon-by-thuc-don")]
        public ApiResponse FindPagingMonByThucDon([FromQuery] FindPagingMonByIdThucDonDto dto)
        {
            try
            {
                var data = _menuService.FindPagingMonByThucDon(dto);
                return new(data);
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }
        [Permission(PermissionKeys.MenuView)]
        [HttpGet("{id}")]
        public ApiResponse GetById([FromRoute] int id)
        {
            try
            {
                var data = _menuService.GetById(id);
                return new(data);
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }
        [Permission(PermissionKeys.MenuView)]
        [HttpGet("mon/{id}")]
        public ApiResponse GetByIdMonVaoMenu([FromRoute] int id)
        {
            try
            {
                var data = _menuService.GetByIdMonVaoMenu(id);
                return new(data);
            }
            catch (Exception ex)
            {
                return OkException(ex);
            }
        }

    }
}