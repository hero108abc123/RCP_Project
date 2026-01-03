using AutoMapper;
using RCP.Movie.Dtos.Phim;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.Movie.ApplicationServices.Common
{
    public class MappingPhimProfile : Profile
    {
        public MappingPhimProfile() { 
            CreateMap<Domain.TheLoai,GetTheLoaiDto>();
        }
    }
}
