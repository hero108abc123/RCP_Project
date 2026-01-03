using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RCP.Lib.ApplicationService.Cloudinary.Interfaces; // Namespace chứa Interface
using RCP.Lib.Domain.Dtos.Cloudinary; // Namespace chứa DTO upload
using RCP.Movie.ApplicationServices.Common;
using RCP.Movie.ApplicationServices.PhimModule.Abstracts;
using RCP.Movie.Domain;
using RCP.Movie.Dtos.Phim;
using RCP.Movie.Infrastructure;
using RCP.Project.HttpRequest.AppException;
using RCP.Project.HttpRequest.BaseRequest;
using RCP.Shared.Constant.HttpRequest.Error;
using System.Text.Json;

namespace RCP.Movie.ApplicationServices.PhimModule.Implements
{
    public class PhimService : BasePhimService, IPhimService
    {
        private readonly PhimDbContext _phimDbContext;
        private readonly ICloudinaryService _cloudinaryService; // Inject Interface thay vì Cloudinary trực tiếp

        public PhimService(
            PhimDbContext phimDbContext,
            ILogger<BasePhimService> logger,
            IHttpContextAccessor httpContextAccessor,
            IMapper mapper,
            ICloudinaryService cloudinaryService) // Inject vào Constructor
            : base(phimDbContext, logger, httpContextAccessor, mapper)
        {
            _phimDbContext = phimDbContext;
            _cloudinaryService = cloudinaryService;
        }

        // Hàm FindPaging giữ nguyên (không đổi sang async trừ khi cần thiết)
        public BaseResponsePagingDto<ViewPhimDto> FindPaging(FindPhimDto dto)
        {
            _logger.LogInformation($"{nameof(FindPaging)} => dto = {JsonSerializer.Serialize(dto)}");

            var query = from phim in _phimDbContext.Phims
                        where !phim.Deleted &&
                            (string.IsNullOrEmpty(dto.Keyword) || phim.TenPhim.Contains(dto.Keyword))
                        orderby phim.CreatedDate descending
                        select new ViewPhimDto
                        {
                            Id = phim.Id,
                            TenPhim = phim.TenPhim,
                            MoTa = phim.MoTa,
                            DaoDien = phim.DaoDien,
                            DienVien = phim.DienVien,
                            ThoiLuongPhut = phim.ThoiLuongPhut,
                            NgayKhoiChieu = phim.NgayKhoiChieu,
                            NgonNgu = phim.NgonNgu,
                            PhanLoaiDoTuoi = phim.PhanLoaiDoTuoi,
                            AnhBia = phim.AnhList.FirstOrDefault(a => a.LaAnhChinh)!.Url,
                            TrailerUrl = phim.VideoList.FirstOrDefault(v => v.LoaiVideo == "Trailer")!.Url
                        };

            var total = query.Count();
            var items = query.Paging(dto).ToList();

            return new BaseResponsePagingDto<ViewPhimDto>
            {
                Items = items,
                TotalItems = total
            };
        }

        // Chuyển sang async Task
        public async Task<ViewPhimDto> CreatePhim(CreatePhimDto dto)
        {
            _logger.LogInformation($"{nameof(CreatePhim)} => dto = {JsonSerializer.Serialize(dto)}");

            var userId = getCurrentUserId();
            var phim = new Phim
            {
                TenPhim = dto.TenPhim ?? "",
                MoTa = dto.MoTa,
                DaoDien = dto.DaoDien,
                DienVien = dto.DienVien,
                ThoiLuongPhut = dto.ThoiLuongPhut,
                NgayKhoiChieu = dto.NgayKhoiChieu,
                NgonNgu = dto.NgonNgu,
                PhanLoaiDoTuoi = dto.PhanLoaiDoTuoi,
                CreatedBy = userId,
                CreatedDate = DateTime.Now,
                DangChieu = false,
                Deleted = false
            };

            _phimDbContext.Phims.Add(phim);
            await _phimDbContext.SaveChangesAsync(); // Dùng SaveChangesAsync

            // Lưu thể loại
            if (dto.TheLoaiIds != null && dto.TheLoaiIds.Any())
            {
                foreach (var id in dto.TheLoaiIds)
                {
                    _phimDbContext.PhimTheLoais.Add(new PhimTheLoai
                    {
                        PhimId = phim.Id,
                        TheLoaiId = id
                    });
                }
            }

            // --- UPLOAD ẢNH (Sử dụng Interface) ---
            if (dto.AnhBia != null)
            {
                // Giả định UploadFileDto có property File và Folder
                var uploadDto = new UploadFileDto
                {
                    File = dto.AnhBia,
                    Folder = "phim_poster"
                };

                var result = await _cloudinaryService.UploadImageAsync(uploadDto);

                if (result != null) // Kiểm tra kết quả
                {
                    _phimDbContext.PhimAnhs.Add(new PhimAnh
                    {
                        PhimId = phim.Id,
                        Url = result.Url, // Giả định property Url
                        LaAnhChinh = true,
                        LoaiAnh = "Poster"
                    });
                }
            }

            // --- UPLOAD VIDEO TRAILER ---
            if (dto.TrailerFile != null)
            {
                // LƯU Ý: Interface ICloudinaryService bạn cung cấp CHƯA có method upload video.
                // Bạn cần bổ sung method UploadVideoAsync vào interface.
                // Dưới đây là code ví dụ khi bạn đã bổ sung method đó:

                /*
                var videoUploadDto = new UploadFileDto 
                { 
                    File = dto.TrailerFile, 
                    Folder = "phim_trailer" 
                };
                
                // Giả định bạn thêm method này vào Interface
                var videoResult = await _cloudinaryService.UploadVideoAsync(videoUploadDto); 
                
                _phimDbContext.PhimVideos.Add(new PhimVideo
                {
                    PhimId = phim.Id,
                    Url = videoResult.Url,
                    LoaiVideo = "Trailer",
                    TieuDe = $"{phim.TenPhim} - Trailer"
                });
                */
            }

            await _phimDbContext.SaveChangesAsync();

            return MapToViewDto(phim);
        }

        // Chuyển sang async Task
        public async Task<ViewPhimDto> UpdatePhim(int id, UpdatePhimDto dto)
        {
            var userId = getCurrentUserId();
            var phim = await _phimDbContext.Phims
                .Include(x => x.AnhList)
                .Include(x => x.VideoList)
                .FirstOrDefaultAsync(x => x.Id == id && !x.Deleted); // Dùng FirstOrDefaultAsync

            if (phim == null)
                throw new UserFriendlyException(ErrorCodes.NotFound);

            phim.TenPhim = dto.TenPhim ?? phim.TenPhim;
            phim.MoTa = dto.MoTa ?? phim.MoTa;
            phim.DaoDien = dto.DaoDien ?? phim.DaoDien;
            phim.DienVien = dto.DienVien ?? phim.DienVien;
            phim.ThoiLuongPhut = dto.ThoiLuongPhut;
            phim.NgayKhoiChieu = dto.NgayKhoiChieu;
            phim.NgonNgu = dto.NgonNgu;
            phim.PhanLoaiDoTuoi = dto.PhanLoaiDoTuoi;
            phim.ModifiedDate = DateTime.Now;
            phim.ModifiedBy = userId;

            // --- CẬP NHẬT ẢNH ---
            if (dto.AnhBia != null)
            {
                var img = phim.AnhList.FirstOrDefault(a => a.LaAnhChinh);
                if (img != null)
                {
                    // TODO: Gọi service xóa ảnh cũ nếu cần (vd: DeleteImageAsync)
                    _phimDbContext.PhimAnhs.Remove(img);
                }

                var uploadDto = new UploadFileDto
                {
                    File = dto.AnhBia,
                    Folder = "phim_poster"
                };

                var result = await _cloudinaryService.UploadImageAsync(uploadDto);

                if (result != null)
                {
                    _phimDbContext.PhimAnhs.Add(new PhimAnh
                    {
                        PhimId = phim.Id,
                        Url = result.Url,
                        LaAnhChinh = true,
                        LoaiAnh = "Poster"
                    });
                }
            }

            // --- CẬP NHẬT TRAILER ---
            if (dto.TrailerFile != null)
            {
                var trailer = phim.VideoList.FirstOrDefault(v => v.LoaiVideo == "Trailer");
                if (trailer != null)
                {
                    _phimDbContext.PhimVideos.Remove(trailer);
                }

                // Tương tự Create, cần bổ sung UploadVideoAsync vào Interface
                /*
                var videoUploadDto = new UploadFileDto 
                { 
                    File = dto.TrailerFile, 
                    Folder = "phim_trailer" 
                };
                var videoResult = await _cloudinaryService.UploadVideoAsync(videoUploadDto);

                _phimDbContext.PhimVideos.Add(new PhimVideo
                {
                    PhimId = phim.Id,
                    Url = videoResult.Url,
                    LoaiVideo = "Trailer",
                    TieuDe = $"{phim.TenPhim} - Trailer"
                });
                */
            }

            // Cập nhật thể loại
            var old = _phimDbContext.PhimTheLoais.Where(x => x.PhimId == phim.Id);
            _phimDbContext.PhimTheLoais.RemoveRange(old);
            if (dto.TheLoaiIds != null && dto.TheLoaiIds.Any())
            {
                foreach (var idLoai in dto.TheLoaiIds)
                {
                    _phimDbContext.PhimTheLoais.Add(new PhimTheLoai
                    {
                        PhimId = phim.Id,
                        TheLoaiId = idLoai
                    });
                }
            }

            await _phimDbContext.SaveChangesAsync();

            return MapToViewDto(phim);
        }

        public ViewPhimDto DeletePhim(int id)
        {
            var userId = getCurrentUserId();
            var phim = _phimDbContext.Phims.Include(x => x.AnhList).Include(x => x.VideoList)
                        .FirstOrDefault(x => x.Id == id && !x.Deleted);
            if (phim == null)
                throw new UserFriendlyException(ErrorCodes.NotFound);

            phim.Deleted = true;
            phim.DeletedDate = DateTime.Now;
            phim.DeletedBy = userId;
            _phimDbContext.SaveChanges();

            return MapToViewDto(phim);
        }

        public List<GetDropDownPhimDto> GetDropDown()
        {
            _logger.LogInformation($"{nameof(GetDropDown)}");

            var query = from m in _phimDbContext.Phims
                        where !m.Deleted
                        orderby m.Id
                        select new GetDropDownPhimDto
                        {
                            Id = m.Id,
                            TenPhim = m.TenPhim
                        };

            return query.ToList();
        }

        // Helper Method
        private ViewPhimDto MapToViewDto(Phim phim)
        {
            var anhBia = _phimDbContext.PhimAnhs
                            .Where(a => a.PhimId == phim.Id && a.LaAnhChinh)
                            .Select(a => a.Url).FirstOrDefault();

            var trailer = _phimDbContext.PhimVideos
                            .Where(v => v.PhimId == phim.Id && v.LoaiVideo == "Trailer")
                            .Select(v => v.Url).FirstOrDefault();

            return new ViewPhimDto
            {
                Id = phim.Id,
                TenPhim = phim.TenPhim,
                MoTa = phim.MoTa,
                DaoDien = phim.DaoDien,
                DienVien = phim.DienVien,
                ThoiLuongPhut = phim.ThoiLuongPhut,
                NgayKhoiChieu = phim.NgayKhoiChieu,
                NgonNgu = phim.NgonNgu,
                PhanLoaiDoTuoi = phim.PhanLoaiDoTuoi,
                AnhBia = anhBia,
                TrailerUrl = trailer
            };
        }

        public List<GetTheLoaiDto> GetTheLoai()
        {
            _logger.LogInformation($"{nameof(GetTheLoai)}");
            var query = from tl in _phimDbContext.TheLoais
                        where !tl.Deleted
                        orderby tl.Id 
                        select tl;
            var data = query.ToList();
            var result = _mapper.Map<List<GetTheLoaiDto>>(data);
            return result;
        }
    }
}