using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using RCP.Movie.ApplicationServices.Common;
using RCP.Movie.Dtos.Phim;
using RCP.Movie.Infrastructure;
using RCP.Project.HttpRequest.BaseRequest;

namespace RCP.Movie.ApplicationServices.PhimModule.Implements
{
    public class PhimService : BasePhimService
    {
        private readonly PhimDbContext _phimDbContext;
        public PhimService(PhimDbContext phimDbContext, ILogger<BasePhimService> logger, IHttpContextAccessor httpContextAccessor, IMapper mapper) : base(phimDbContext, logger, httpContextAccessor, mapper)
        {
            _phimDbContext = phimDbContext;
        }

        public BaseResponsePagingDto<ViewPhimDto> FindPaging(FindPhimDto dto)
        {
            throw new NotImplementedException();
        }

        public ViewPhimDto CreatePhim(CreatePhimDto dto)
        {
            throw new NotImplementedException();
        }

        public ViewPhimDto UpdatePhim(int id, UpdatePhimDto dto)
        {
            throw new NotImplementedException();
        }


        public ViewPhimDto DeletePhim(int id)
        {
            throw new NotImplementedException();
        }

    }
}
