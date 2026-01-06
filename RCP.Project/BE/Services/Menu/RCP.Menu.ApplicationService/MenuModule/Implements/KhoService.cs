using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using RCP.Cinema.Infrastructure;
using RCP.Lib.ApplicationService.Cloudinary.Interfaces;
using RCP.Menu.ApplicationService.MenuModule.Abstracts;
using RCP.Menu.Domain;
using RCP.Menu.Dtos.Kho;
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
    public class KhoService : BaseMenuService, IKhoService
    {
        private readonly CinemaDbContext _cinemaDbContext;

        public KhoService(
            MenuDbContext menuDbContext,
            ILogger<BaseMenuService> logger,
            IHttpContextAccessor httpContextAccessor,
            CinemaDbContext cinemaDbContext,
            IMapper mapper)
            : base(menuDbContext, logger, httpContextAccessor, mapper)
        {
            _cinemaDbContext = cinemaDbContext;
        }
        public void Create(CreateKhoDto dto)
        {
            _logger.LogInformation($"{nameof(Create)} dto = {JsonSerializer.Serialize(dto)}");

            var vietNamNow = GetVietnamTime();
            var currentUserId = getCurrentUserId();

            var kho = new Kho
            {
                IdCinema = dto.IdCinema,
                TenKho = dto.TenKho,
                CreatedBy = currentUserId,
                CreatedDate = vietNamNow,
                Deleted = false
            };

            _menuDbContext.Khos.Add(kho);
            _menuDbContext.SaveChanges();
        }

        public void Update(UpdateKhoDto dto)
        {
            _logger.LogInformation($"{nameof(Update)} dto = {JsonSerializer.Serialize(dto)}");

            var currentUserId = getCurrentUserId();
            var vietNamNow = GetVietnamTime();

            var kho = _menuDbContext.Khos.FirstOrDefault(x => x.Id == dto.Id && !x.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.NotFound);

            kho.IdCinema = dto.IdCinema;
            kho.TenKho = dto.TenKho;
            kho.ModifiedBy = currentUserId;
            kho.ModifiedDate = vietNamNow;

            _menuDbContext.Khos.Update(kho);
            _menuDbContext.SaveChanges();
        }

        public void Delete(int id)
        {
            _logger.LogInformation($"{nameof(Delete)} id = {id}");

            var vietNamNow = GetVietnamTime();
            var currentUserId = getCurrentUserId();

            var kho = _menuDbContext.Khos.FirstOrDefault(x => x.Id == id && !x.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.NotFound);

            kho.Deleted = true;
            kho.DeletedDate = vietNamNow;
            kho.DeletedBy = currentUserId;

            _menuDbContext.Khos.Update(kho);

            var khoHangs = _menuDbContext.KhoHangs
                .Where(kh => kh.IdKho == id && !kh.Deleted)
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
        public BaseResponsePagingDto<ViewKhoPagingDto> FindPaging(FindPagingKhoDto dto)
        {
            _logger.LogInformation($"{nameof(FindPaging)} dto = {JsonSerializer.Serialize(dto)}");

            var khoQuery = _menuDbContext.Khos
                .Where(k => !k.Deleted
                    && (string.IsNullOrEmpty(dto.Keyword) || k.TenKho.Contains(dto.Keyword)))
                .OrderBy(k => k.Id)
                .Select(k => new
                {
                    k.Id,
                    k.TenKho,
                    k.IdCinema
                });

            var totalItems = khoQuery.Count();
            var khoList = khoQuery.Paging(dto).ToList();

            var cinemaIds = khoList.Select(k => k.IdCinema).Distinct().ToList();
            var cinemas = _cinemaDbContext.Cinemas
                .Where(c => cinemaIds.Contains(c.Id) && !c.Deleted)
                .Select(c => new { c.Id, c.Name })
                .ToList();

            var data = khoList.Select(k => new ViewKhoPagingDto
            {
                Id = k.Id,
                TenKho = k.TenKho,
                Cinema = new CinemaDto
                {
                    Id = k.IdCinema,
                    Name = cinemas.FirstOrDefault(c => c.Id == k.IdCinema)?.Name ?? string.Empty
                }
            }).ToList();

            var response = new BaseResponsePagingDto<ViewKhoPagingDto>
            {
                Items = data,
                TotalItems = totalItems
            };

            return response;
        }

        public BaseResponsePagingDto<ViewKhoDto> FindPagingHangTrongKho(FindPagingByIdKhoDto dto)
        {
            _logger.LogInformation($"{nameof(FindPagingHangTrongKho)} dto = {JsonSerializer.Serialize(dto)}");

            var kho = _menuDbContext.Khos.FirstOrDefault(x => x.Id == dto.IdKho && !x.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.NotFound);

            var query = from kh in _menuDbContext.KhoHangs
                        join mh in _menuDbContext.MatHangs on kh.IdMatHang equals mh.Id
                        where !kh.Deleted && !mh.Deleted
                            && kh.IdKho == dto.IdKho
                            && (string.IsNullOrEmpty(dto.Keyword)
                                || mh.TenMon.Contains(dto.Keyword)
                                || mh.MoTa.Contains(dto.Keyword))
                        orderby kh.Id
                        select new ViewMatHangDto
                        {
                            Id = mh.Id,
                            TenMon = mh.TenMon,
                            MoTa = mh.MoTa,
                            SoLuongNhap = kh.SoLuongNhap,
                            SoLuongDaBan = kh.SoLuongDaBan,
                            SoLuongTonKho = kh.SoLuongTonKho,
                            //GiaNhap = kh.DonGiaNhap
                        };

            var totalItems = query.Count();
            if (totalItems == 0)
                return null;

            var hangs = query.Paging(dto).ToList();

            var items = new List<ViewKhoDto>
            {
                  new ViewKhoDto
                  {
                        //Id = kho.Id,
                        Hangs = hangs
                  }
            };

            var response = new BaseResponsePagingDto<ViewKhoDto>
            {
                Items = items,
                TotalItems = totalItems
            };

            return response;
        }

        public void CreateNhapHang(CreateNhapHangDto dto)
        {
            _logger.LogInformation($"{nameof(CreateNhapHang)} dto = {JsonSerializer.Serialize(dto)}");

            var vietNamNow = GetVietnamTime();
            var currentUserId = getCurrentUserId();

     
            var kho = _menuDbContext.Khos.FirstOrDefault(x => x.Id == dto.IdKho  && !x.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.NotFound );


            var matHang = _menuDbContext.MatHangs.FirstOrDefault(x => x.Id == dto.IdMatHang && !x.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.NotFound);

    
            var existingKhoHang = _menuDbContext.KhoHangs
                .FirstOrDefault(kh => kh.IdKho == dto.IdKho && kh.IdMatHang == dto.IdMatHang && !kh.Deleted);

            if (existingKhoHang != null)
            {

                existingKhoHang.SoLuongNhap += dto.SoLuongNhap;
                existingKhoHang.SoLuongTonKho += dto.SoLuongNhap;
                existingKhoHang.ModifiedBy = currentUserId;
                existingKhoHang.ModifiedDate = vietNamNow;

                _menuDbContext.KhoHangs.Update(existingKhoHang);
            }
            else
            {

                var khoHang = new KhoHang
                {
                    IdKho = dto.IdKho,
                    IdMatHang = dto.IdMatHang,
                    SoLuongNhap = dto.SoLuongNhap,
                    SoLuongDaBan = 0,
                    SoLuongTonKho = dto.SoLuongNhap,
                    CreatedBy = currentUserId,
                    CreatedDate = vietNamNow,
                    Deleted = false
                };

                _menuDbContext.KhoHangs.Add(khoHang);
            }

            var tongGiaTriNhapHang = dto.DonGiaNhap * dto.SoLuongNhap;

            var thongKeKho = new ThongKeKho
            {
                IdKho = dto.IdKho,
                IdMatHang = dto.IdMatHang,
                SoLuongNhap = dto.SoLuongNhap,
                DonGiaNhap = dto.DonGiaNhap,
                TongGiaTriNhapHang = tongGiaTriNhapHang,
                NgayNhap = vietNamNow,
                CreatedBy = currentUserId,
                CreatedDate = vietNamNow,
                Deleted = false
            };

            _menuDbContext.ThongKeKhos.Add(thongKeKho);
            _menuDbContext.SaveChanges();
        }

        public ViewKhoPagingDto GetById(int id)
        {
            _logger.LogInformation($"{nameof(GetById)} ");

            var kho = _menuDbContext.Khos
                .Where(k => k.Id == id && !k.Deleted)
                .Select(k => new { k.Id, k.TenKho, k.IdCinema })
                .FirstOrDefault();

            if (kho == null)
                return null;

            var cinema = _cinemaDbContext.Cinemas
                .Where(c => c.Id == kho.IdCinema && !c.Deleted)
                .Select(c => new { c.Id, c.Name })
                .FirstOrDefault();

            return new ViewKhoPagingDto
            {
                Id = kho.Id,
                TenKho = kho.TenKho,
                Cinema = new CinemaDto
                {
                    Id = kho.IdCinema,
                    Name = cinema?.Name ?? string.Empty
                }
            };
        }
        public void UpdateNhapHang(UpdateNhapHangDto dto)
        {
            _logger.LogInformation($"{nameof(UpdateNhapHang)} dto = {JsonSerializer.Serialize(dto)}");

            var vietNamNow = GetVietnamTime();
            var currentUserId = getCurrentUserId();

            var thongKeKho = _menuDbContext.ThongKeKhos
                .Where(tk => tk.Id == dto.Id && !tk.Deleted)
                .FirstOrDefault()
                ?? throw new UserFriendlyException(ErrorCodes.NotFound);

       
            var kho = _menuDbContext.Khos.FirstOrDefault(x => x.Id == dto.IdKho && !x.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.NotFound);

            var matHang = _menuDbContext.MatHangs.FirstOrDefault(x => x.Id == dto.IdMatHang && !x.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.NotFound);

         
            var khoHang = _menuDbContext.KhoHangs
                .FirstOrDefault(kh => kh.IdKho == thongKeKho.IdKho && kh.IdMatHang == thongKeKho.IdMatHang && !kh.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.NotFound);


            khoHang.SoLuongTonKho -= thongKeKho.SoLuongNhap;
            khoHang.SoLuongNhap -= thongKeKho.SoLuongNhap;

   
            khoHang.SoLuongNhap += dto.SoLuongNhap;
            khoHang.SoLuongTonKho += dto.SoLuongNhap;
            khoHang.ModifiedBy = currentUserId;
            khoHang.ModifiedDate = vietNamNow;

            _menuDbContext.KhoHangs.Update(khoHang);

       
            var tongGiaTriNhapHang = dto.DonGiaNhap * dto.SoLuongNhap;

            thongKeKho.IdKho = dto.IdKho;
            thongKeKho.IdMatHang = dto.IdMatHang;
            thongKeKho.SoLuongNhap = dto.SoLuongNhap;
            thongKeKho.DonGiaNhap = dto.DonGiaNhap;
            thongKeKho.TongGiaTriNhapHang = tongGiaTriNhapHang;
            thongKeKho.ModifiedBy = currentUserId;
            thongKeKho.ModifiedDate = vietNamNow;

            _menuDbContext.ThongKeKhos.Update(thongKeKho);
            _menuDbContext.SaveChanges();
        }

        public void DeleteHangKhoiKho(int idKho, int idHang)
        {
            _logger.LogInformation($"{nameof(DeleteHangKhoiKho)} idKho = {idKho}, idHang = {idHang}");

            var vietNamNow = GetVietnamTime();
            var currentUserId = getCurrentUserId();

            
            var khoHang = _menuDbContext.KhoHangs
                .FirstOrDefault(kh => kh.IdKho == idKho && kh.IdMatHang == idHang && !kh.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.NotFound);

            
            khoHang.Deleted = true;
            khoHang.DeletedDate = vietNamNow;
            khoHang.DeletedBy = currentUserId;

            _menuDbContext.KhoHangs.Update(khoHang);
            _menuDbContext.SaveChanges();
        }

        public ViewMatHangTrongKhoDto GetMatHangTrongKhoById(int id)
        {
            _logger.LogInformation($"{nameof(GetMatHangTrongKhoById)} id = {id}");

            var hangTrongKho = (from tk in _menuDbContext.ThongKeKhos
                                where tk.Id == id && !tk.Deleted
                                select new ViewMatHangTrongKhoDto
                                {
                                    Id = tk.Id,
                                    IdKho = tk.IdKho,
                                    IdMatHang = tk.IdMatHang,
                                    SoLuongNhap = tk.SoLuongNhap,
                                    DonGiaNhap = tk.DonGiaNhap
                                }).FirstOrDefault();

            return hangTrongKho;
        }

        public List<ViewKhoByIdCinema> GetList(int idCinema)
        {
            _logger.LogInformation($"{nameof(GetList)} idCinema = {idCinema}");

            var query = from k in _menuDbContext.Khos
                        where !k.Deleted && k.IdCinema == idCinema
                        orderby k.Id
                        select new ViewKhoByIdCinema
                        {
                            Id = k.Id,
                            IdCinema = k.IdCinema,
                            TenKho = k.TenKho
                        };

            return query.ToList();
        }
    }
}
