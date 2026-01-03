using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RCP.Cinema.ApplicationServices.Cinema.Interfaces;
using RCP.Cinema.ApplicationServices.Common;
using RCP.Cinema.Dtos.GiaVe;
using RCP.Cinema.Infrastructure;
using RCP.Project.HttpRequest.AppException;
using RCP.Project.HttpRequest.BaseRequest;
using RCP.Shared.Constant.HttpRequest.Error;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace RCP.Cinema.ApplicationServices.Cinema.Implements
{
    public class GiaVeService : BaseCinemaService, IGiaVeService
    {
        public GiaVeService(
            CinemaDbContext cinemaDbContext,
            ILogger<GiaVeService> logger,
            IHttpContextAccessor httpContextAccessor,
            IMapper mapper)
            : base(cinemaDbContext, logger, httpContextAccessor, mapper)
        {

        }

        public BaseResponsePagingDto<ViewGiaVeDto> FindPagingGiaVe (FindPagingGiaVeDto dto)
        {
            _logger.LogInformation($"{nameof(FindPagingGiaVe)} dto = {JsonSerializer.Serialize(dto)}");
            var query = from gv in _cinemaDbContext.GiaVes
                        where !gv.Deleted
                        orderby gv.Id
                        select gv;

            var data = query.Paging(dto).ToList();
            var items = _mapper.Map<List<ViewGiaVeDto>>(data);
            return new BaseResponsePagingDto<ViewGiaVeDto>
            {
                Items = items,
                TotalItems = query.Count()
            };
        }

        public void CreateGiaVe(CreateGiaVeDto dto)
        {
            _logger.LogInformation($"{nameof(CreateGiaVe)} dto = {JsonSerializer.Serialize(dto)}");
            var vietNamNow = GetVietnamTime();
            var currentUserId = getCurrentUserId();

            var giaVe = new Domain.GiaVe
            {
                GiaCuoiTuan = dto.GiaCuoiTuan,
                GiaNgayLe = dto.GiaNgayLe,
                GiaNgayThuong = dto.GiaNgayThuong,
                TrangThaiNgay = dto.TrangThaiNgay,
                HangGhe = dto.HangGhe,
                CreatedBy = currentUserId,
                CreatedDate = vietNamNow,
            };

            _cinemaDbContext.GiaVes.Add(giaVe); 
            _cinemaDbContext.SaveChanges();
        }


        public void UpdateGiaVe(UpdateGiaVeDto dto)
        {
            _logger.LogInformation($"{nameof(UpdateGiaVe)} dto = {JsonSerializer.Serialize(dto)}");
            var vietNamNow = GetVietnamTime();
            var currentUserId = getCurrentUserId();

            var giaVe = _cinemaDbContext.GiaVes.FirstOrDefault( x => x.Id == dto.Id  && !x.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.CinemaErrorGiaVeNotFound);

            giaVe.GiaCuoiTuan = dto.GiaCuoiTuan;
            giaVe.GiaNgayLe = dto.GiaNgayLe;
            giaVe.GiaNgayThuong = dto.GiaNgayThuong;
            giaVe.TrangThaiNgay = dto .TrangThaiNgay;
            giaVe.HangGhe = dto.HangGhe;
            giaVe.ModifiedBy = currentUserId;
            giaVe.ModifiedDate = vietNamNow;

            _cinemaDbContext.GiaVes.Update(giaVe);
            _cinemaDbContext.SaveChanges();
        }

        public void DeleteGiaVe(int id) 
        { 
            _logger.LogInformation($"{nameof(DeleteGiaVe)}");
            var vietNamNow = GetVietnamTime();
            var currentUserId = getCurrentUserId();

            var giaVe = _cinemaDbContext.GiaVes.FirstOrDefault(x => x.Id == id && !x.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.CinemaErrorGiaVeNotFound);


            giaVe.Deleted = true;
            giaVe.DeletedDate = vietNamNow;
            giaVe.DeletedBy = currentUserId;


            _cinemaDbContext.GiaVes.Update(giaVe);
            _cinemaDbContext.SaveChanges();
        }

        public ViewGiaVeDto FindById(int id)
        {
            _logger.LogInformation($"{nameof(FindById)}");
            var vietNamNow = GetVietnamTime();
            var currentUserId = getCurrentUserId();

            var giaVe = _cinemaDbContext.GiaVes.FirstOrDefault(x => x.Id == id && !x.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.CinemaErrorGiaVeNotFound);
            var response = new ViewGiaVeDto
            {
                Id = giaVe.Id,
                GiaCuoiTuan = giaVe.GiaCuoiTuan,
                GiaNgayLe = giaVe.GiaNgayLe,
                GiaNgayThuong = giaVe.GiaNgayThuong,
                HangGhe = giaVe.HangGhe,
                TrangThaiNgay = giaVe.TrangThaiNgay,
            };
            return response;
        }
    }
    }
