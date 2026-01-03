using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RCP.Lib.ApplicationService.Cloudinary.Interfaces;
using RCP.Lib.Domain.Dtos.Cloudinary;
using RCP.Menu.ApplicationService.MenuModule.Abstracts;
using RCP.Menu.Domain;
using RCP.Menu.Dtos;
using RCP.Menu.Infrastructure;
using RCP.Movie.ApplicationServices.Common;
using RCP.Project.HttpRequest.AppException;
using RCP.Project.HttpRequest.BaseRequest;
using RCP.Shared.Constant.HttpRequest.Error;
using System.Text.Json;

namespace RCP.Menu.ApplicationService.MenuModule.Implements
{
    public class MenuService : BaseMenuService, IMenuService
    {
        private readonly MenuDbContext _menuDbContext;
        private readonly ICloudinaryService _cloudinaryService; // 1. Inject Cloudinary

        public MenuService(
            MenuDbContext menuDbContext,
            ILogger<BaseMenuService> logger,
            IHttpContextAccessor httpContextAccessor,
            IMapper mapper,
            ICloudinaryService cloudinaryService) // 2. Thêm vào Constructor
            : base(menuDbContext, logger, httpContextAccessor, mapper)
        {
            _menuDbContext = menuDbContext;
            _cloudinaryService = cloudinaryService;
        }

        // --- CREATE (ASYNC) ---
        public async Task Create(CreateMenuDto dto)
        {
            _logger.LogInformation($"{nameof(Create)} dto={JsonSerializer.Serialize(new { dto.TenMon, dto.Gia })}"); // Log json trừ file ra cho nhẹ
            var currentUserId = getCurrentUserId();
            var now = GetVietnamTime();

            var menu = new ThucDon
            {
                TenMon = dto.TenMon,
                Gia = dto.Gia,
                MoTa = dto.MoTa,
                Loai = dto.Loai,
                TrangThai = dto.TrangThai,
                CreatedBy = currentUserId,
                CreatedDate = now,
                Deleted = false,
                AnhMinhHoa = null // Mặc định null, sẽ update sau khi upload
            };

            // --- UPLOAD ẢNH ---
            if (dto.AnhFile != null)
            {
                var uploadDto = new UploadFileDto
                {
                    File = dto.AnhFile,
                    Folder = "menu_items" // Tên folder trên Cloudinary
                };

                var result = await _cloudinaryService.UploadImageAsync(uploadDto);
                if (result != null)
                {
                    menu.AnhMinhHoa = result.Url; // Lưu URL trả về vào DB
                }
            }

            _menuDbContext.ThucDons.Add(menu);
            await _menuDbContext.SaveChangesAsync();
        }

        // --- UPDATE (ASYNC) ---
        public async Task Update(UpdateMenuDto dto)
        {
            _logger.LogInformation($"{nameof(Update)} id={dto.Id}");
            var currentUserId = getCurrentUserId();
            var now = GetVietnamTime();

            var menu = await _menuDbContext.ThucDons.FirstOrDefaultAsync(x => x.Id == dto.Id && !x.Deleted);
            if (menu == null) throw new UserFriendlyException(ErrorCodes.MenuErrorNotFound);
            // Nhớ định nghĩa Error Code

            menu.TenMon = dto.TenMon;
            menu.Gia = dto.Gia;
            menu.MoTa = dto.MoTa;
            menu.Loai = dto.Loai;
            menu.TrangThai = dto.TrangThai;
            menu.ModifiedBy = currentUserId;
            menu.ModifiedDate = now;

            // --- XỬ LÝ ẢNH UPDATE ---
            // Nếu có file mới được chọn
            if (dto.AnhFile != null)
            {
                var uploadDto = new UploadFileDto
                {
                    File = dto.AnhFile,
                    Folder = "menu_items"
                };

                var result = await _cloudinaryService.UploadImageAsync(uploadDto);
                if (result != null)
                {
                    menu.AnhMinhHoa = result.Url; // Ghi đè URL cũ bằng URL mới
                }
            }
            // Nếu không chọn file mới, giữ nguyên logic (Code FE thường sẽ gửi lại link cũ hoặc null file)

            _menuDbContext.ThucDons.Update(menu);
            await _menuDbContext.SaveChangesAsync();
        }

        // --- DELETE ---
        public void Delete(int id)
        {
            _logger.LogInformation($"{nameof(Delete)} id={id}");
            var currentUserId = getCurrentUserId();

            var menu = _menuDbContext.ThucDons.FirstOrDefault(x => x.Id == id && !x.Deleted);
            if (menu == null) throw new UserFriendlyException(ErrorCodes.MenuErrorNotFound);

            menu.Deleted = true;
            menu.DeletedDate = GetVietnamTime();
            menu.DeletedBy = currentUserId;

            _menuDbContext.ThucDons.Update(menu);
            _menuDbContext.SaveChanges();
        }

        // --- FIND PAGING ---
        public BaseResponsePagingDto<ViewMenuDto> Find(FindPagingMenuDto dto)
        {
            _logger.LogInformation($"{nameof(Find)}");

            var query = from m in _menuDbContext.ThucDons
                        where !m.Deleted
                        && (string.IsNullOrEmpty(dto.Keyword) || m.TenMon.Contains(dto.Keyword))
                        // Giả sử FindPagingMenuDto có trường Loai để lọc
                        // && (dto.Loai == null || m.Loai == dto.Loai) 
                        orderby m.Id descending
                        select new ViewMenuDto
                        {
                            Id = m.Id,
                            TenMon = m.TenMon,
                            Gia = m.Gia,
                            MoTa = m.MoTa,
                            AnhFile = m.AnhMinhHoa,
                            Loai = m.Loai,
                            // TenLoai = m.Loai.ToString(), // Nếu DTO có trường này
                            TrangThai = m.TrangThai
                        };

            var total = query.Count();
            var items = query.Paging(dto).ToList();

            return new BaseResponsePagingDto<ViewMenuDto>
            {
                Items = items,
                TotalItems = total
            };
        }

        // --- FIND BY ID ---
        public ViewMenuDto FindById(int id)
        {
            _logger.LogInformation($"{nameof(FindById)} id={id}");

            var menu = _menuDbContext.ThucDons.FirstOrDefault(x => x.Id == id && !x.Deleted);
            if (menu == null) throw new UserFriendlyException(ErrorCodes.MenuErrorNotFound);

            return new ViewMenuDto
            {
                Id = menu.Id,
                TenMon = menu.TenMon,
                Gia = menu.Gia,
                MoTa = menu.MoTa,
                AnhFile = menu.AnhMinhHoa,
                Loai = menu.Loai,
                TrangThai = menu.TrangThai
            };
        }
    }
}