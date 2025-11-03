using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RCP.Movie.ApplicationServices.Common;
using RCP.Movie.ApplicationServices.PhimModule.Abstracts;
using RCP.Movie.Domain;
using RCP.Movie.Dtos.Phim;
using RCP.Movie.Infrastructure;
using RCP.Project.HttpRequest.AppException;
using RCP.Project.HttpRequest.BaseRequest;
using RCP.Shared.Constant.HttpRequest.Error;
using System.Security.Claims;
using System.Text.Json;

namespace RCP.Movie.ApplicationServices.PhimModule.Implements
{
    public class PhimService : BasePhimService, IPhimService
    {
        private readonly PhimDbContext _phimDbContext;
        private readonly string _uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
        public PhimService(PhimDbContext phimDbContext, ILogger<BasePhimService> logger, IHttpContextAccessor httpContextAccessor, IMapper mapper) : base(phimDbContext, logger, httpContextAccessor, mapper)
        {
            _phimDbContext = phimDbContext;
        }

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

        public ViewPhimDto CreatePhim(CreatePhimDto dto)
        {
            _logger.LogInformation($"{nameof(CreatePhim)} => dto = {JsonSerializer.Serialize(dto)}");

            var userId = GetCurrentUserId();
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
            _phimDbContext.SaveChanges();

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

            // Upload ảnh
            if (dto.AnhBia != null)
            {
                var imageUrl = SaveFile(dto.AnhBia, "images");
                _phimDbContext.PhimAnhs.Add(new PhimAnh
                {
                    PhimId = phim.Id,
                    Url = imageUrl,
                    LaAnhChinh = true,
                    LoaiAnh = "Poster"
                });
            }

            // Upload video trailer
            if (dto.TrailerFile != null)
            {
                var videoUrl = SaveFile(dto.TrailerFile, "videos");
                _phimDbContext.PhimVideos.Add(new PhimVideo
                {
                    PhimId = phim.Id,
                    Url = videoUrl,
                    LoaiVideo = "Trailer",
                    TieuDe = $"{phim.TenPhim} - Trailer"
                });
            }

            _phimDbContext.SaveChanges();

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
                AnhBia = _phimDbContext.PhimAnhs.FirstOrDefault(a => a.PhimId == phim.Id && a.LaAnhChinh)?.Url,
                TrailerUrl = _phimDbContext.PhimVideos.FirstOrDefault(v => v.PhimId == phim.Id && v.LoaiVideo == "Trailer")?.Url
            };
        }

        public ViewPhimDto UpdatePhim(int id, UpdatePhimDto dto)
        {
            var userId = GetCurrentUserId();
            var phim = _phimDbContext.Phims.Include(x => x.AnhList).Include(x => x.VideoList)
                .FirstOrDefault(x => x.Id == id && !x.Deleted);

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

            // Cập nhật ảnh mới
            if (dto.AnhBia != null)
            {
                var img = phim.AnhList.FirstOrDefault(a => a.LaAnhChinh);
                if (img != null)
                    _phimDbContext.PhimAnhs.Remove(img);

                var newUrl = SaveFile(dto.AnhBia, "images");
                _phimDbContext.PhimAnhs.Add(new PhimAnh
                {
                    PhimId = phim.Id,
                    Url = newUrl,
                    LaAnhChinh = true,
                    LoaiAnh = "Poster"
                });
            }

            // Cập nhật trailer
            if (dto.TrailerFile != null)
            {
                var trailer = phim.VideoList.FirstOrDefault(v => v.LoaiVideo == "Trailer");
                if (trailer != null)
                    _phimDbContext.PhimVideos.Remove(trailer);

                var videoUrl = SaveFile(dto.TrailerFile, "videos");
                _phimDbContext.PhimVideos.Add(new PhimVideo
                {
                    PhimId = phim.Id,
                    Url = videoUrl,
                    LoaiVideo = "Trailer",
                    TieuDe = $"{phim.TenPhim} - Trailer"
                });
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

            _phimDbContext.SaveChanges();

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
                AnhBia = phim.AnhList.FirstOrDefault(a => a.LaAnhChinh)?.Url,
                TrailerUrl = phim.VideoList.FirstOrDefault(v => v.LoaiVideo == "Trailer")?.Url
            };
        }


        public ViewPhimDto DeletePhim(int id)
        {
            var userId = GetCurrentUserId();
            var phim = _phimDbContext.Phims.FirstOrDefault(x => x.Id == id && !x.Deleted);
            if (phim == null)
                throw new UserFriendlyException(ErrorCodes.NotFound);

            phim.Deleted = true;
            phim.DeletedDate = DateTime.Now;
            phim.DeletedBy = userId;
            _phimDbContext.SaveChanges();

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
                AnhBia = phim.AnhList.FirstOrDefault(a => a.LaAnhChinh)?.Url,
                TrailerUrl = phim.VideoList.FirstOrDefault(v => v.LoaiVideo == "Trailer")?.Url
            };
        }

        private string SaveFile(IFormFile file, string folder)
        {
            var folderPath = Path.Combine(_uploadPath, folder);
            if (!Directory.Exists(folderPath))
                Directory.CreateDirectory(folderPath);

            var fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
            var filePath = Path.Combine(folderPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                file.CopyTo(stream);
            }

            return $"/uploads/{folder}/{fileName}";
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
