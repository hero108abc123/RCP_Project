using RCP.Cinema.Dtos.GiaVe;
using RCP.Project.HttpRequest.BaseRequest;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.Cinema.ApplicationServices.Cinema.Interfaces
{
    public interface IGiaVeService
    {
        public BaseResponsePagingDto<ViewGiaVeDto> FindPagingGiaVe(FindPagingGiaVeDto dto);
        public void CreateGiaVe(CreateGiaVeDto dto);
        public void UpdateGiaVe(UpdateGiaVeDto dto);
        public void DeleteGiaVe(int id);
        public ViewGiaVeDto FindById(int id);
    }
}
