using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using RCP.Cinema.Infrastructure;
using RCP.Menu.ApplicationService.MenuModule.Abstracts;
using RCP.Menu.Domain;
using RCP.Menu.Dtos.Hang;
using RCP.Menu.Infrastructure;
using RCP.Movie.ApplicationServices.Common;
using RCP.Project.HttpRequest.AppException;
using RCP.Project.HttpRequest.BaseRequest;
using RCP.Shared.Constant.HttpRequest.Error;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace RCP.Menu.ApplicationService.MenuModule.Implements
{
    public class HangService : BaseMenuService, IHangService
    {
        public HangService(
            MenuDbContext menuDbContext,
            ILogger<BaseMenuService> logger,
            IHttpContextAccessor httpContextAccessor,
            IMapper mapper)
            : base(menuDbContext, logger, httpContextAccessor, mapper)
        {
        }

        public void Create(CreateHangDto dto)
        {
            _logger.LogInformation($"{nameof(Create)} dto = {JsonSerializer.Serialize(dto)}");

            var vietNamNow = GetVietnamTime();
            var currentUserId = getCurrentUserId();

            var matHang = new MatHang
            {
                TenMon = dto.TenMon,
                MoTa = dto.MoTa,
                CreatedBy = currentUserId,
                CreatedDate = vietNamNow,
                Deleted = false
            };

            _menuDbContext.MatHangs.Add(matHang);
            _menuDbContext.SaveChanges();
        }

        public void Update(UpdateHangDto dto)
        {
            _logger.LogInformation($"{nameof(Update)} dto = {JsonSerializer.Serialize(dto)}");

            var currentUserId = getCurrentUserId();
            var vietNamNow = GetVietnamTime();

            var matHang = _menuDbContext.MatHangs.FirstOrDefault(x => x.Id == dto.Id && !x.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.NotFound);

            matHang.TenMon = dto.TenMon;
            matHang.MoTa = dto.MoTa;
            matHang.ModifiedBy = currentUserId;
            matHang.ModifiedDate = vietNamNow;

            _menuDbContext.MatHangs.Update(matHang);
            _menuDbContext.SaveChanges();
        }

        public void Delete(int id)
        {
            _logger.LogInformation($"{nameof(Delete)} id = {id}");

            var vietNamNow = GetVietnamTime();
            var currentUserId = getCurrentUserId();

            var matHang = _menuDbContext.MatHangs.FirstOrDefault(x => x.Id == id && !x.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.NotFound);

            matHang.Deleted = true;
            matHang.DeletedDate = vietNamNow;
            matHang.DeletedBy = currentUserId;

            _menuDbContext.MatHangs.Update(matHang);

            
            var khoHangs = _menuDbContext.KhoHangs
                .Where(kh => kh.IdMatHang == id && !kh.Deleted)
                .ToList();

            foreach (var khoHang in khoHangs)
            {
                khoHang.Deleted = true;
                khoHang.DeletedDate = vietNamNow;
                khoHang.DeletedBy = currentUserId;
            }

            _menuDbContext.KhoHangs.UpdateRange(khoHangs);
            _menuDbContext.SaveChanges();
        }

        public BaseResponsePagingDto<ViewHangDto> FindPaging(FindPagingHangDto dto)
        {
            _logger.LogInformation($"{nameof(FindPaging)} dto = {JsonSerializer.Serialize(dto)}");

            var query = _menuDbContext.MatHangs
                .Where(m => !m.Deleted
                    && (string.IsNullOrEmpty(dto.Keyword)
                        || m.TenMon.Contains(dto.Keyword)
                        || m.MoTa.Contains(dto.Keyword)))
                .OrderBy(m => m.Id)
                .Select(m => new ViewHangDto
                {
                    Id = m.Id,
                    TenMon = m.TenMon,
                    MoTa = m.MoTa
                });

            var totalItems = query.Count();
            var data = query.Paging(dto).ToList();

            var response = new BaseResponsePagingDto<ViewHangDto>
            {
                Items = data,
                TotalItems = totalItems
            };

            return response;
        }

        public ViewHangDto GetById(int id)
        {
            _logger.LogInformation($"{nameof(GetById)} id = {id}");

            var matHang = _menuDbContext.MatHangs
                .Where(m => m.Id == id && !m.Deleted)
                .Select(m => new ViewHangDto
                {
                    Id = m.Id,
                    TenMon = m.TenMon,
                    MoTa = m.MoTa
                })
                .FirstOrDefault();

            return matHang;
        }

        public List<ViewHangDto> GetDropDown()
        {
            _logger.LogInformation($"{nameof(GetDropDown)} ");

            var matHang = _menuDbContext.MatHangs
                .Where(m =>  !m.Deleted)
                .Select(m => new ViewHangDto
                {
                    Id = m.Id,
                    TenMon = m.TenMon,
                    MoTa = m.MoTa
                })
                .ToList();

            return matHang;

        }
    }
}