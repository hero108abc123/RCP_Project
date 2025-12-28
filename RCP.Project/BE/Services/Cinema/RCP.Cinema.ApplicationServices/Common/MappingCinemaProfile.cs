using AutoMapper;
using RCP.Cinema.Dtos.Cinema;
using RCP.Cinema.Dtos.Room;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.Cinema.ApplicationServices.Common
{
    public class MappingCinemaProfile : Profile
    {
        public MappingCinemaProfile()
        {
            CreateMap<Domain.Cinema,ViewCinemaDto>();
            CreateMap<Domain.Room, ViewRoomDto>();
        }
    }
}
