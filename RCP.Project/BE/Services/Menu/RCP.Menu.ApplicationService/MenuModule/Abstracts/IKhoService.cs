using RCP.Menu.Dtos.Kho;
using RCP.Project.HttpRequest.BaseRequest;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.Menu.ApplicationService.MenuModule.Abstracts
{
    public interface IKhoService
    {
        public void Create(CreateKhoDto dto);
        public void Update(UpdateKhoDto dto);
        public void Delete(int id);
        public BaseResponsePagingDto<ViewKhoPagingDto> FindPaging(FindPagingKhoDto dto);

        public BaseResponsePagingDto<ViewKhoDto> FindPagingHangTrongKho(FindPagingByIdKhoDto dto);
        public void CreateNhapHang(CreateNhapHangDto dto);
        public ViewKhoPagingDto GetById(int id);
        public void UpdateNhapHang(UpdateNhapHangDto dto);
        public void DeleteHangKhoiKho(int idKho, int idHang);
        public ViewMatHangTrongKhoDto GetMatHangTrongKhoById(int id);
        public List<ViewKhoByIdCinema> GetList(int idCinema);
    }
}
