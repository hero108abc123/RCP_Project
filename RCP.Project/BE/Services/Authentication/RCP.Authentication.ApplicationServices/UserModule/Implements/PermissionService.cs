using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RCP.Authentication.ApplicationService.Common;
using RCP.Authentication.ApplicationService.UserModule.Abstracts;
using RCP.Authentication.Dtos.Permission;
using RCP.Authentication.Infrastructure;
using RCP.Project.HttpRequest.AppException;
using RCP.Project.HttpRequest.BaseRequest;
using RCP.Shared.Constant.HttpRequest.Error;
using System.Security.Claims;
using System.Text.Json;

namespace RCP.Authentication.ApplicationService.UserModule.Implements
{
    public class PermissionService : BaseAuthService, IPermissionService
    {
        public PermissionService(
            AuthenticationDbContext authDbContext,
            ILogger<PermissionService> logger,
            IHttpContextAccessor httpContextAccessor,
            IMapper mapper
            ) : base(authDbContext, logger, httpContextAccessor, mapper)
        {
        }

        /// <summary>
        /// Lấy danh sách quyền có phân trang.
        /// </summary>
        public async Task<BaseResponsePagingDto<ViewPermissionDto>> FindPaging(FindPagingPermissionDto dto)
        {
            _logger.LogInformation($"{nameof(FindPaging)} dto={JsonSerializer.Serialize(dto)}");

            var query = _authDbContext.Permissions
                .AsNoTracking()
                .Where(x => !x.Deleted);

            if (!string.IsNullOrEmpty(dto.Keyword))
            {
                var keyword = dto.Keyword.ToLower();
                query = query.Where(x =>
                    x.Name.ToLower().Contains(keyword) ||
                    x.Key.ToLower().Contains(keyword) ||
                    x.Category.ToLower().Contains(keyword)
                );
            }

            var total = await query.CountAsync();

            var items = await query
                .OrderBy(x => x.Category)
                .ThenBy(x => x.Name)
                .Paging(dto)
                .Select(x => new ViewPermissionDto
                {
                    Id = x.Id,
                    Name = x.Name,
                    Key = x.Key,
                    Category = x.Category,
                    Description = x.Description
                })
                .ToListAsync();

            return new BaseResponsePagingDto<ViewPermissionDto>
            {
                Items = items,
                TotalItems = total
            };
        }

        /// <summary>
        /// Lấy chi tiết quyền theo Id.
        /// </summary>
        public async Task<ViewPermissionDto?> FindById(int id)
        {
            _logger.LogInformation($"{nameof(FindById)} id={id}");

            var permission = await _authDbContext.Permissions
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == id && !x.Deleted);

            if (permission == null)
                return null;

            return new ViewPermissionDto
            {
                Id = permission.Id,
                Name = permission.Name,
                Key = permission.Key,
                Category = permission.Category,
                Description = permission.Description
            };
        }

        /// <summary>
        /// Thêm mới quyền.
        /// </summary>
        public async Task Create(CreatePermissionDto dto)
        {
            _logger.LogInformation($"{nameof(Create)} dto={JsonSerializer.Serialize(dto)}");

            var exists = await _authDbContext.Permissions
                .AnyAsync(x => x.Key == dto.Key && !x.Deleted);

            if (exists)
                throw new UserFriendlyException(ErrorCodes.AuthErrorPermissionKeyExists);

            var currentUserId = GetCurrentUserId();

            if (currentUserId == null)
                throw new UserFriendlyException(ErrorCodes.Unauthorized);

            var entity = new Domain.Permission
            {
                Name = dto.Name,
                Key = dto.Key,
                Category = dto.Category,
                Description = dto.Description,
                CreatedBy = currentUserId,
                CreatedDate = DateTime.UtcNow
            };

            _authDbContext.Permissions.Add(entity);
            await _authDbContext.SaveChangesAsync();
        }

        /// <summary>
        /// Cập nhật thông tin quyền.
        /// </summary>
        public async Task Update(int Id, UpdatePermissionDto dto)
        {
            _logger.LogInformation($"{nameof(Update)} dto={JsonSerializer.Serialize(dto)}");

            var permission = await _authDbContext.Permissions
                .FirstOrDefaultAsync(x => x.Id == Id && !x.Deleted);

            if (permission == null)
                throw new UserFriendlyException(ErrorCodes.NotFound);


            permission.Name = dto.Name;
            permission.Category = dto.Category;
            permission.Description = dto.Description;
            permission.Key = dto.Key;

            await _authDbContext.SaveChangesAsync();
        }

        /// <summary>
        /// Xóa mềm (soft delete) quyền.
        /// </summary>
        public async Task<bool> Delete(int id)
        {
            _logger.LogInformation($"{nameof(Delete)} id={id}");

            var permission = await _authDbContext.Permissions
                .FirstOrDefaultAsync(x => x.Id == id && !x.Deleted);

            if (permission == null)
                throw new UserFriendlyException(ErrorCodes.NotFound);

            var currentUserId = GetCurrentUserId();
            if (currentUserId == null)
                throw new UserFriendlyException(ErrorCodes.Unauthorized);

            permission.Deleted = true;
            permission.DeletedBy = currentUserId;
            permission.DeletedDate = DateTime.UtcNow;

            await _authDbContext.SaveChangesAsync();
            return true;
        }

        /// <summary>
        /// Lấy toàn bộ danh sách quyền (dạng dropdown hoặc tree view).
        /// </summary>
        public async Task<List<ViewPermissionDto>> GetAll()
        {
            _logger.LogInformation($"{nameof(GetAll)}");

            return await _authDbContext.Permissions
                .AsNoTracking()
                .Where(x => !x.Deleted)
                .OrderBy(x => x.Category)
                .Select(x => new ViewPermissionDto
                {
                    Id = x.Id,
                    Name = x.Name,
                    Key = x.Key,
                    Category = x.Category,
                    Description = x.Description
                })
                .ToListAsync();
        }


        private string? GetCurrentUserId()
        {
            var user = _httpContextAccessor.HttpContext?.User;
            if (user == null || !user.Identity?.IsAuthenticated == true)
                return null;

            // Thử lấy theo claim "sub" (chuẩn JWT) hoặc "userId"
            var userId = user.FindFirst(ClaimTypes.NameIdentifier)?.Value
                      ?? user.FindFirst("sub")?.Value
                      ?? user.FindFirst("userId")?.Value;

            return userId;
        }

    }
}
