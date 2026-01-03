using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using RCP.Asset.ApplicationServices.AssetModule.Abstracts;
using RCP.Asset.Domain;
using RCP.Asset.Dtos;
using RCP.Asset.Infrastructure;
using RCP.Movie.ApplicationServices.Common;
using RCP.Project.HttpRequest.AppException;
using RCP.Project.HttpRequest.BaseRequest;
using RCP.Shared.Constant.HttpRequest.Error;
using System.Text.Json;

namespace RCP.Asset.ApplicationServices.AssetModule.Implements
{
    public class AssetService : BaseAssetService, IAssetService
    {
        private readonly AssetDbContext _assetDbContext;

        public AssetService(
            AssetDbContext assetDbContext,
            ILogger<AssetService> logger,
            IHttpContextAccessor httpContextAccessor,
            IMapper mapper)
            : base(assetDbContext, logger, httpContextAccessor, mapper)
        {
            _assetDbContext = assetDbContext;
        }

        public void Create(CreateAssetDto dto)
        {
            _logger.LogInformation($"{nameof(Create)} dto={JsonSerializer.Serialize(dto)}");
            var currentUserId = getCurrentUserId();
            var vietNamNow = GetVietnamTime();

            // Validate mã tài sản trùng lặp (nếu cần)
            var existsCode = _assetDbContext.TaiSans.Any(x => x.MaTaiSan == dto.MaTaiSan && !x.Deleted);
            if (existsCode)
            {
                // Giả định bạn có mã lỗi này, nếu chưa có hãy thêm vào file Constant
                throw new UserFriendlyException(ErrorCodes.AssetErrorAlreadyExists);
            }

            var asset = new TaiSan
            {
                MaTaiSan = dto.MaTaiSan,
                TenTaiSan = dto.TenTaiSan,
                LoaiTaiSan = dto.LoaiTaiSan,
                SoLuong = dto.SoLuong,
                NguyenGia = dto.NguyenGia,
                NgayBatDauSuDung = dto.NgayBatDauSuDung,
                ThoiGianKhauHaoThang = dto.ThoiGianKhauHaoThang,
                TrangThai = dto.TrangThai,
                RapChieuId = dto.RapChieuId,
                PhongChieuId = dto.PhongChieuId,

                // Audit fields
                CreatedBy = currentUserId,
                CreatedDate = vietNamNow,
                Deleted = false
            };

            _assetDbContext.TaiSans.Add(asset);
            _assetDbContext.SaveChanges();
        }

        public void Update(UpdateAssetDto dto)
        {
            _logger.LogInformation($"{nameof(Update)} dto={JsonSerializer.Serialize(dto)}");
            var currentUserId = getCurrentUserId();
            var vietNamNow = GetVietnamTime();

            var asset = _assetDbContext.TaiSans.FirstOrDefault(x => x.Id == dto.Id && !x.Deleted)
                 ?? throw new UserFriendlyException(ErrorCodes.AssetErrorNotFound);

            // Kiểm tra trùng mã nếu người dùng sửa mã tài sản
            if (asset.MaTaiSan != dto.MaTaiSan)
            {
                var existsCode = _assetDbContext.TaiSans.Any(x => x.MaTaiSan == dto.MaTaiSan && x.Id != dto.Id && !x.Deleted);
                if (existsCode) throw new UserFriendlyException(ErrorCodes.AssetErrorAlreadyExists);
            }

            // Cập nhật thông tin
            asset.MaTaiSan = dto.MaTaiSan;
            asset.TenTaiSan = dto.TenTaiSan;
            asset.LoaiTaiSan = dto.LoaiTaiSan;
            asset.SoLuong = dto.SoLuong;
            asset.NguyenGia = dto.NguyenGia;
            asset.NgayBatDauSuDung = dto.NgayBatDauSuDung;
            asset.ThoiGianKhauHaoThang = dto.ThoiGianKhauHaoThang;
            asset.TrangThai = dto.TrangThai;
            asset.RapChieuId = dto.RapChieuId;
            asset.PhongChieuId = dto.PhongChieuId;

            // Audit update
            asset.ModifiedBy = currentUserId;
            asset.ModifiedDate = vietNamNow;

            _assetDbContext.TaiSans.Update(asset);
            _assetDbContext.SaveChanges();
        }

        public void Delete(int id)
        {
            _logger.LogInformation($"{nameof(Delete)} id = {id}");
            var vietNamNow = GetVietnamTime();
            var currentUserId = getCurrentUserId();

            var asset = _assetDbContext.TaiSans.FirstOrDefault(x => x.Id == id && !x.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.AssetErrorNotFound);

            asset.Deleted = true;
            asset.DeletedDate = vietNamNow;
            asset.DeletedBy = currentUserId;

            _assetDbContext.TaiSans.Update(asset);
            _assetDbContext.SaveChanges();
        }

        public BaseResponsePagingDto<ViewAssetDto> Find(FindPagingAssetDto dto)
        {
            _logger.LogInformation($"{nameof(Find)} dto={JsonSerializer.Serialize(dto)}");

            var query = from a in _assetDbContext.TaiSans
                        where !a.Deleted
                        // Tìm theo từ khóa (Mã hoặc Tên)
                        && (string.IsNullOrEmpty(dto.Keyword)
                            || a.TenTaiSan.Contains(dto.Keyword)
                            || a.MaTaiSan.Contains(dto.Keyword))
                        // Filter theo Rạp (nếu có trong Dto)
                        && (dto.RapChieuId == null || a.RapChieuId == dto.RapChieuId)
                        // Filter theo Loại (nếu có)
                        && (dto.LoaiTaiSan == null || a.LoaiTaiSan == dto.LoaiTaiSan)
                        orderby a.Id descending
                        select a;

            var data = query.Paging(dto).ToList();

            // Map sang ViewDto (Giả sử bạn đã config AutoMapper cho TaiSan -> ViewAssetDto)
            // Nếu muốn tính khấu hao cho danh sách, cần cấu hình trong AutoMapper Profile hoặc dùng vòng lặp ở đây
            var items = _mapper.Map<List<ViewAssetDto>>(data);

            return new BaseResponsePagingDto<ViewAssetDto>
            {
                Items = items,
                TotalItems = query.Count()
            };
        }

        public ViewAssetDto FindById(int id)
        {
            _logger.LogInformation($"{nameof(FindById)} id={id}");

            var asset = _assetDbContext.TaiSans.FirstOrDefault(x => x.Id == id && !x.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.AssetErrorNotFound);

            // --- TÍNH TOÁN KHẤU HAO ---
            decimal giaTriConLai = 0;
            if (asset.ThoiGianKhauHaoThang > 0)
            {
                var khauHaoThang = asset.NguyenGia / asset.ThoiGianKhauHaoThang;
                var soThangDaDung = ((DateTime.Now.Year - asset.NgayBatDauSuDung.Year) * 12) + DateTime.Now.Month - asset.NgayBatDauSuDung.Month;

                if (soThangDaDung < 0) soThangDaDung = 0;

                giaTriConLai = asset.NguyenGia - (khauHaoThang * soThangDaDung);
                if (giaTriConLai < 0) giaTriConLai = 0;
            }

            // Map thủ công (Manual Mapping) tương tự RoomService
            var result = new ViewAssetDto
            {
                Id = asset.Id,
                MaTaiSan = asset.MaTaiSan,
                TenTaiSan = asset.TenTaiSan,
                LoaiTaiSan = asset.LoaiTaiSan,
                SoLuong = asset.SoLuong,
                NguyenGia = asset.NguyenGia,
                NgayBatDauSuDung = asset.NgayBatDauSuDung,
                ThoiGianKhauHaoThang = asset.ThoiGianKhauHaoThang,
                TrangThai = asset.TrangThai,
                RapChieuId = asset.RapChieuId,
                PhongChieuId = asset.PhongChieuId,

                // Trả về giá trị tính toán
                GiaTriConLai = giaTriConLai
            };

            return result;
        }
    }
}