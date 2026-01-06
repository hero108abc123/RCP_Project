using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RCP.Lib.ApplicationService.Cloudinary.Interfaces;
using RCP.Lib.Domain.Dtos.Cloudinary;
using RCP.Menu.ApplicationService.MenuModule.Abstracts;
using RCP.Menu.Domain;
using RCP.Menu.Dtos.Menu;
using RCP.Menu.Infrastructure;
using RCP.Movie.ApplicationServices.Common;
using RCP.Project.HttpRequest.AppException;
using RCP.Project.HttpRequest.BaseRequest;
using RCP.Shared.Constant.HttpRequest.Error;
using RCP.Shared.Constant.Constants.Menu;
using System.Text.Json;
using RCP.Cinema.Infrastructure;

namespace RCP.Menu.ApplicationService.MenuModule.Implements
{
    public class MenuService : BaseMenuService, IMenuService
    {
        private CinemaDbContext _cimemaDbContext;
        public MenuService(
            MenuDbContext menuDbContext,
            ILogger<BaseMenuService> logger,
            IHttpContextAccessor httpContextAccessor,
            CinemaDbContext cimemaDbContext,
            IMapper mapper
            )
            : base(menuDbContext, logger, httpContextAccessor, mapper)
        {
            _cimemaDbContext = cimemaDbContext;
        }
        public void Create(CreateMenuDto dto)
        {
            _logger.LogInformation($"{nameof(Create)} dto = {JsonSerializer.Serialize(dto)}");
            var vietNamNow = GetVietnamTime();
            var currentUserId = getCurrentUserId();
            var menu = new ThucDon
            {
                IdCinema = dto.IdCinema,
                TenThucDon = dto.TenThucDon,
                MoTa = dto.MoTa,
                TongSoMon = dto.TongSoMon,
                CreatedBy = currentUserId,
                CreatedDate = vietNamNow,
                Deleted = false
            };
            _menuDbContext.ThucDons.Add(menu);
            _menuDbContext.SaveChanges();
        }
        public void Update(UpdateMenuDto dto)
        {
            _logger.LogInformation($"{nameof(Update)} dto = {JsonSerializer.Serialize(dto)}");
            var currentUserId = getCurrentUserId();
            var vietNamNow = GetVietnamTime();
            var menu = _menuDbContext.ThucDons.FirstOrDefault(x => x.Id == dto.Id && !x.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.NotFound);
            menu.IdCinema = dto.IdCinema;
            menu.TenThucDon = dto.TenThucDon;
            menu.MoTa = dto.MoTa;
            menu.TongSoMon = dto.TongSoMon;
            menu.ModifiedBy = currentUserId;
            menu.ModifiedDate = vietNamNow;
            _menuDbContext.ThucDons.Update(menu);
            _menuDbContext.SaveChanges();
        }
        public void Delete(int id)
        {
            _logger.LogInformation($"{nameof(Delete)} id = {id}");
            var vietNamNow = GetVietnamTime();
            var currentUserId = getCurrentUserId();
            var menu = _menuDbContext.ThucDons.FirstOrDefault(x => x.Id == id && !x.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.NotFound);
            menu.Deleted = true;
            menu.DeletedDate = vietNamNow;
            menu.DeletedBy = currentUserId;
            _menuDbContext.ThucDons.Update(menu);
            _menuDbContext.SaveChanges();
        }
        public BaseResponsePagingDto<ViewMenuDto> FindPaging(FindPagingMenuDto dto)
        {
            _logger.LogInformation($"{nameof(FindPaging)} dto = {JsonSerializer.Serialize(dto)}");

            var thucDonQuery = _menuDbContext.ThucDons
                .Where(td => !td.Deleted
                    && (string.IsNullOrEmpty(dto.Keyword)
                        || td.TenThucDon.Contains(dto.Keyword)
                        || td.MoTa.Contains(dto.Keyword)))
                .OrderBy(td => td.Id)
                .Select(td => new
                {
                    td.Id,
                    td.IdCinema,
                    td.TenThucDon,
                    td.TongSoMon
                });

            var totalItems = thucDonQuery.Count();
            var thucDonList = thucDonQuery.Paging(dto).ToList();

            var cinemaIds = thucDonList.Select(td => td.IdCinema).Distinct().ToList();
            var cinemas = _cimemaDbContext.Cinemas
                .Where(c => cinemaIds.Contains(c.Id) && !c.Deleted)
                .Select(c => new { c.Id, c.Name })
                .ToList();

            var data = thucDonList.Select(td => new ViewMenuDto
            {
                Id = td.Id,
                TenThucDon = td.TenThucDon,
                TongSoMon = td.TongSoMon,
                Cinema = new ViewCinema
                {
                    Id = td.IdCinema,
                    Name = cinemas.FirstOrDefault(c => c.Id == td.IdCinema)?.Name ?? string.Empty
                }
            }).ToList();

            var response = new BaseResponsePagingDto<ViewMenuDto>
            {
                Items = data,
                TotalItems = totalItems
            };

            return response;
        }

        public void AddMonVaoMenu(AddMonVaoMenuDto dto)
        {
            _logger.LogInformation($"{nameof(AddMonVaoMenu)} dto = {JsonSerializer.Serialize(dto)}");

            var vietNamNow = GetVietnamTime();
            var currentUserId = getCurrentUserId();

            // Validate Thực đơn tồn tại
            var thucDon = _menuDbContext.ThucDons.FirstOrDefault(x => x.Id == dto.IdThucDon && !x.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.MenuErrorThucDonNotFound);

            // Validate Món tồn tại
            var mon = _menuDbContext.Mons.FirstOrDefault(x => x.Id == dto.IdMon && !x.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.MenuErrorMonNotFound);

            // Kiểm tra món đã có trong thực đơn chưa
            var existingThucDonMon = _menuDbContext.ThucDonMons
                .FirstOrDefault(tdm => tdm.IdThucDon == dto.IdThucDon && tdm.IdMon == dto.IdMon && !tdm.Deleted);

            if (existingThucDonMon != null)
            {
                throw new UserFriendlyException(ErrorCodes.MenuErrorMonAlreadyInThucDon);
            }

            // Lấy kho của cinema
            var kho = _menuDbContext.Khos.FirstOrDefault(k => k.IdCinema == thucDon.IdCinema && !k.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.MenuErrorKhoNotFound);

            // Lấy thông tin nguyên liệu trong kho
            var khoHang = _menuDbContext.KhoHangs
                .FirstOrDefault(kh => kh.IdKho == kho.Id && kh.IdMatHang == mon.IdHang && !kh.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.MenuErrorNguyenLieuNotFound);

            // Tính số lượng món có thể bán
            if (mon.SoLuong <= 0)
            {
                throw new UserFriendlyException(ErrorCodes.MenuErrorInvalidSoLuongNguyenLieu);
            }

            int soLuongCoTheBan = khoHang.SoLuongTonKho / mon.SoLuong;

            // Xác định trạng thái
            int trangThai = soLuongCoTheBan > 0 ? MenuConstants.ConHang : MenuConstants.HetHang;

            if (soLuongCoTheBan <= 0)
            {
                _logger.LogWarning($"Không đủ nguyên liệu. Tồn kho: {khoHang.SoLuongTonKho}, Cần: {mon.SoLuong}. Món sẽ được thêm với trạng thái Hết hàng.");
            }

            // Tạo món trong thực đơn
            var thucDonMon = new ThucDonMon
            {
                IdThucDon = dto.IdThucDon,
                IdMon = dto.IdMon,
                SoLuong = soLuongCoTheBan,
                TrangThai = trangThai,
                Gia = dto.Gia,
                CreatedBy = currentUserId,
                CreatedDate = vietNamNow,
                Deleted = false
            };

            _menuDbContext.ThucDonMons.Add(thucDonMon);
            _menuDbContext.SaveChanges();

            _logger.LogInformation($"Đã thêm món vào thực đơn. Số lượng: {soLuongCoTheBan}, Trạng thái: {(trangThai == MenuConstants.ConHang ? "Còn hàng" : "Hết hàng")}");
        }

        public void UpdateMonVaoMenu(UpdateMonVaoDto dto)
        {
            _logger.LogInformation($"{nameof(UpdateMonVaoMenu)} dto = {JsonSerializer.Serialize(dto)}");

            var currentUserId = getCurrentUserId();
            var vietNamNow = GetVietnamTime();

            // Validate Thực đơn món tồn tại
            var thucDonMon = _menuDbContext.ThucDonMons.FirstOrDefault(x => x.Id == dto.Id && !x.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.MenuErrorThucDonMonNotFound);

            // Validate Thực đơn tồn tại
            var thucDon = _menuDbContext.ThucDons.FirstOrDefault(x => x.Id == dto.IdThucDon && !x.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.MenuErrorThucDonNotFound);

            // Validate Món tồn tại
            var mon = _menuDbContext.Mons.FirstOrDefault(x => x.Id == dto.IdMon && !x.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.MenuErrorMonNotFound);

            // Lấy kho của cinema
            var kho = _menuDbContext.Khos.FirstOrDefault(k => k.IdCinema == thucDon.IdCinema && !k.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.MenuErrorKhoNotFound);

            // Lấy thông tin nguyên liệu trong kho
            var khoHang = _menuDbContext.KhoHangs
                .FirstOrDefault(kh => kh.IdKho == kho.Id && kh.IdMatHang == mon.IdHang && !kh.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.MenuErrorNguyenLieuNotFound);

            // Tính lại số lượng món có thể bán
            if (mon.SoLuong <= 0)
            {
                throw new UserFriendlyException(ErrorCodes.MenuErrorInvalidSoLuongNguyenLieu);
            }

            int soLuongCoTheBan = khoHang.SoLuongTonKho / mon.SoLuong;

            // Xác định trạng thái
            int trangThai = soLuongCoTheBan > 0 ? MenuConstants.ConHang : MenuConstants.HetHang;

            if (soLuongCoTheBan <= 0)
            {
                _logger.LogWarning($"Không đủ nguyên liệu. Tồn kho: {khoHang.SoLuongTonKho}, Cần: {mon.SoLuong}. Món sẽ được cập nhật với trạng thái Hết hàng.");
            }

            // Cập nhật thông tin
            thucDonMon.IdThucDon = dto.IdThucDon;
            thucDonMon.IdMon = dto.IdMon;
            thucDonMon.SoLuong = soLuongCoTheBan;
            thucDonMon.TrangThai = trangThai;
            thucDonMon.Gia = dto.Gia;
            thucDonMon.ModifiedBy = currentUserId;
            thucDonMon.ModifiedDate = vietNamNow;

            _menuDbContext.ThucDonMons.Update(thucDonMon);
            _menuDbContext.SaveChanges();

            _logger.LogInformation($"Đã cập nhật món trong thực đơn. Số lượng: {soLuongCoTheBan}, Trạng thái: {(trangThai == MenuConstants.ConHang ? "Còn hàng" : "Hết hàng")}");
        }

        public void DeleteMonKhoiMenu(int id)
        {
            _logger.LogInformation($"{nameof(DeleteMonKhoiMenu)} id = {id}");

            var vietNamNow = GetVietnamTime();
            var currentUserId = getCurrentUserId();

            var thucDonMon = _menuDbContext.ThucDonMons.FirstOrDefault(x => x.Id == id && !x.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.MenuErrorThucDonMonNotFound);

            thucDonMon.Deleted = true;
            thucDonMon.DeletedDate = vietNamNow;
            thucDonMon.DeletedBy = currentUserId;

            _menuDbContext.ThucDonMons.Update(thucDonMon);
            _menuDbContext.SaveChanges();

            _logger.LogInformation($"Đã xóa món khỏi thực đơn. Id: {id}");
        }
        public BaseResponsePagingDto<ViewMonByIdThucDonDto> FindPagingMonByThucDon(FindPagingMonByIdThucDonDto dto)
        {
            _logger.LogInformation($"{nameof(FindPagingMonByThucDon)} dto = {JsonSerializer.Serialize(dto)}");

            var thucDon = _menuDbContext.ThucDons.FirstOrDefault(x => x.Id == dto.IdThucDon && !x.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.MenuErrorThucDonNotFound);

            var query = from tdm in _menuDbContext.ThucDonMons
                        join m in _menuDbContext.Mons on tdm.IdMon equals m.Id
                        where !tdm.Deleted && !m.Deleted
                            && tdm.IdThucDon == dto.IdThucDon
                            && (string.IsNullOrEmpty(dto.Keyword)
                                || m.Name.Contains(dto.Keyword)
                                || m.MoTa.Contains(dto.Keyword))
                        orderby tdm.Id
                        select new ViewMonByIdThucDonDto
                        {
                            Id = tdm.Id,
                            SoLuong = tdm.SoLuong,
                            TrangThai = tdm.TrangThai,
                            Gia = tdm.Gia,
                            Mon = new ViewMon
                            {
                                Id = m.Id,
                                IdHang = m.IdHang,
                                Name = m.Name,
                                MoTa = m.MoTa,
                                SoLuong = m.SoLuong,
                                AnhMinhHoa = m.AnhMinhHoa,
                                Loai = m.Loai
                            }
                        };

            var totalItems = query.Count();
            var data = query.Paging(dto).ToList();

            var response = new BaseResponsePagingDto<ViewMonByIdThucDonDto>
            {
                Items = data,
                TotalItems = totalItems
            };

            return response;
        }
        public GetByIdDto GetById(int id)
        {
            _logger.LogInformation($"{nameof(GetById)} id = {id}");

            var menu = _menuDbContext.ThucDons
                .Where(x => x.Id == id && !x.Deleted)
                .Select(x => new GetByIdDto
                {
                    Id = x.Id,
                    IdCinema = x.IdCinema,
                    TenThucDon = x.TenThucDon,
                    MoTa = x.MoTa,
                    TongSoMon = x.TongSoMon
                })
                .FirstOrDefault()
                ?? throw new UserFriendlyException(ErrorCodes.NotFound);

            return menu;
        }
        public GetByIdMonVaoMenuDto GetByIdMonVaoMenu(int id)
        {
            _logger.LogInformation($"{nameof(GetByIdMonVaoMenu)} id = {id}");

            var thucDonMon = _menuDbContext.ThucDonMons
                .Where(x => x.Id == id && !x.Deleted)
                .Select(x => new GetByIdMonVaoMenuDto
                {
                    Id = x.Id,
                    IdThucDon = x.IdThucDon,
                    IdMon = x.IdMon,
                    Gia = x.Gia
                })
                .FirstOrDefault()
                ?? throw new UserFriendlyException(ErrorCodes.MenuErrorThucDonMonNotFound);

            return thucDonMon;
        }
    }

}