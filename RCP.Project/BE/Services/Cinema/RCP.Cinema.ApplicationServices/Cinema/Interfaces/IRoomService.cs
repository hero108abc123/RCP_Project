using RCP.Cinema.Dtos.Room;
using RCP.Project.HttpRequest.BaseRequest;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.Cinema.ApplicationServices.Cinema.Interfaces
{
    public interface IRoomService
    {
        public void Create(CreateRoomDto dto);
        public void Update(UpdateRoomDto dto);
        public void Delete(int idCinema,int id);
        public BaseResponsePagingDto<ViewRoomDto> Find(FindPagingRoomDto dto);
    }
}
