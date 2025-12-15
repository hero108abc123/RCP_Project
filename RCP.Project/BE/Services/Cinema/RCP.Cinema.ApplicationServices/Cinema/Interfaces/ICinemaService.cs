using RCP.Cinema.Dtos.Cinema;
using RCP.Project.HttpRequest.BaseRequest;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.Cinema.ApplicationServices.Cinema.Interfaces
{
    public interface ICinemaService
    {
        public void Create(CreateCinemaDto dto);
        public void Update(UpdateCinemaDto dto);
        public BaseResponsePagingDto<ViewCinemaDto> Find(FindPagingDto dto);
        public void Delete(int id);
        public void AddPhimToCinemaRoom(AddPhimToCinemaRoomDto dto);
        public void UpdatePhimToCinemaRoom(UpdatePhimToCinemaRoomDto dto);

        public void DeletePhimToCinemaRoom(DeletePhimToCinemaRoomDto dto);
    }
}
