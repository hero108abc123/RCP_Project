using RCP.Cinema.Dtos.LichChieu;
using RCP.Project.HttpRequest.BaseRequest;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.Cinema.ApplicationServices.Cinema.Interfaces
{
    public interface ILichChieuService
    {
        public void AddPhimToCinemaRoom(AddPhimToCinemaRoomDto dto);
        public void UpdatePhimToCinemaRoom(UpdatePhimToCinemaRoomDto dto);

        public void DeletePhimToCinemaRoom(int id);
        public BaseResponsePagingDto<ViewPhimToCinemaRoomDto> FindPagingCinemaRoomMovie(FindPagingCinemaRoomPhimDto dto);
        public GetByIdLichChieuDto GetById(int id);
    }
}
