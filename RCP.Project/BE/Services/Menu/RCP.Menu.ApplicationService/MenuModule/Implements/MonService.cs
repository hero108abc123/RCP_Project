using AutoMapper;
using CloudinaryDotNet;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using RCP.Cinema.Infrastructure;
using RCP.Lib.ApplicationService.Cloudinary.Interfaces;
using RCP.Lib.Domain.Dtos.Cloudinary;
using RCP.Menu.ApplicationService.MenuModule.Abstracts;
using RCP.Menu.Domain;
using RCP.Menu.Dtos.Mon;
using RCP.Menu.Infrastructure;
using RCP.Movie.ApplicationServices.Common;
using RCP.Project.HttpRequest.AppException;
using RCP.Project.HttpRequest.BaseRequest;
using RCP.Shared.Constant.HttpRequest.Error;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace RCP.Menu.ApplicationService.MenuModule.Implements
{
    public class MonService : BaseMenuService, IMonService
    {
        private ICloudinaryService _cloudinaryService;

        public MonService(
            MenuDbContext menuDbContext,
            ILogger<BaseMenuService> logger,
            IHttpContextAccessor httpContextAccessor,
            ICloudinaryService cloudinaryService,
            IMapper mapper)
            : base(menuDbContext, logger, httpContextAccessor, mapper)
        {
            _cloudinaryService = cloudinaryService;
        }

        public async Task Create(CreateMonDto dto)
        {
            _logger.LogInformation($"{nameof(Create)} dto = {JsonSerializer.Serialize(dto)}");

            var vietNamNow = GetVietnamTime();
            var currentUserId = getCurrentUserId();

            var matHang = _menuDbContext.MatHangs.FirstOrDefault(x => x.Id == dto.IdHang && !x.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.NotFound);

            string urlAnhMinhHoa = string.Empty;

            if (dto.AnhMinhHoa != null)
            {
                var uploadResult = await _cloudinaryService.UploadImageAsync(new UploadFileDto
                {
                    File = dto.AnhMinhHoa,
                    Folder = "mon"
                });
                urlAnhMinhHoa = uploadResult.SecureUrl;
            }

            var mon = new Mon
            {
                IdHang = dto.IdHang,
                MoTa = dto.MoTa,
                Name = dto.Name,
                SoLuong = dto.SoLuong,
                AnhMinhHoa = urlAnhMinhHoa,
                Loai = dto.Loai,
                CreatedBy = currentUserId,
                CreatedDate = vietNamNow,
                Deleted = false
            };

            _menuDbContext.Mons.Add(mon);
            _menuDbContext.SaveChanges();
        }

        public async Task Update(UpdateMonDto dto)
        {
            _logger.LogInformation($"{nameof(Update)} dto = {JsonSerializer.Serialize(dto)}");

            var currentUserId = getCurrentUserId();
            var vietNamNow = GetVietnamTime();

            var mon = _menuDbContext.Mons.FirstOrDefault(x => x.Id == dto.Id && !x.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.NotFound);

            var matHang = _menuDbContext.MatHangs.FirstOrDefault(x => x.Id == dto.IdHang && !x.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.NotFound);

            string urlAnhMinhHoa = mon.AnhMinhHoa ?? string.Empty;

            if (dto.AnhMinhHoa != null)
            {
                var uploadResult = await _cloudinaryService.UploadImageAsync(new UploadFileDto
                {
                    File = dto.AnhMinhHoa,
                    Folder = "mon"
                });
                urlAnhMinhHoa = uploadResult.SecureUrl;
            }

            mon.IdHang = dto.IdHang;
            mon.MoTa = dto.MoTa;
            mon.Name = dto.Name;
            mon.SoLuong = dto.SoLuong;
            mon.AnhMinhHoa = urlAnhMinhHoa;
            mon.Loai = dto.Loai;
            mon.ModifiedBy = currentUserId;
            mon.ModifiedDate = vietNamNow;

            _menuDbContext.Mons.Update(mon);
            _menuDbContext.SaveChanges();
        }

        public BaseResponsePagingDto<ViewMonDto> FindPaging(FindPagingMonDto dto)
        {
            _logger.LogInformation($"{nameof(FindPaging)} dto = {JsonSerializer.Serialize(dto)}");

            var query = from m in _menuDbContext.Mons
                        join mh in _menuDbContext.MatHangs on m.IdHang equals mh.Id
                        where !m.Deleted && !mh.Deleted
                            && (string.IsNullOrEmpty(dto.Keyword)
                                || mh.TenMon.Contains(dto.Keyword)
                                || m.MoTa.Contains(dto.Keyword))
                        orderby m.Id
                        select new ViewMonDto
                        {
                            Id = m.Id,
                            Name = m.Name,
                            MoTa = m.MoTa,
                            SoLuong = m.SoLuong,
                            AnhMinhHoa = m.AnhMinhHoa,
                            Loai = m.Loai,
                            
                        };

            var data = query.Paging(dto).ToList();
            var totalItems = query.Count();

            var response = new BaseResponsePagingDto<ViewMonDto>
            {
                Items = data,
                TotalItems = totalItems
            };

            return response;
        }

        public ViewByIdDto GetById(int id)
        {
            _logger.LogInformation($"{nameof(GetById)} id = {id}");

            var mon = _menuDbContext.Mons.FirstOrDefault(x => x.Id == id && !x.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.NotFound);

            return new ViewByIdDto
            {
                Id = mon.Id,
                IdHang = mon.IdHang,
                Name = mon.Name,
                MoTa = mon.MoTa,
                SoLuong = mon.SoLuong,
                AnhMinhHoa = mon.AnhMinhHoa,
                Loai = mon.Loai
            };
        }

        public void Delete(int id)
        {
            _logger.LogInformation($"{nameof(Delete)} id = {id}");

            var vietNamNow = GetVietnamTime();
            var currentUserId = getCurrentUserId();

            var mon = _menuDbContext.Mons.FirstOrDefault(x => x.Id == id && !x.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.NotFound);

            mon.Deleted = true;
            mon.DeletedDate = vietNamNow;
            mon.DeletedBy = currentUserId;

            _menuDbContext.Mons.Update(mon);
            _menuDbContext.SaveChanges();
        }

        public List<ViewDropDownMonDto> GetDropDown()
        {
            _logger.LogInformation($"{nameof(GetDropDown)}");

            var query = from m in _menuDbContext.Mons
                        where !m.Deleted
                        orderby m.Id
                        select new ViewDropDownMonDto
                        {
                            Id = m.Id,
                            TenMon = m.Name
                        };

            return query.ToList();
        }
    }
}