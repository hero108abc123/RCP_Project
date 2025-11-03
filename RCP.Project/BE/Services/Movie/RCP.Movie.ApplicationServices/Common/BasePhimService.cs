using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using RCP.Movie.Infrastructure;

namespace RCP.Movie.ApplicationServices.Common
{
    public class BasePhimService
    {
        public readonly PhimDbContext _phimDbContext;
        public readonly ILogger<BasePhimService> _logger;
        public readonly IHttpContextAccessor _httpContextAccessor;
        protected readonly IMapper _mapper;

        public BasePhimService(
            PhimDbContext phimDbContext,
            ILogger<BasePhimService> logger,
            IHttpContextAccessor httpContextAccessor,
            IMapper mapper
        )
        {
            _phimDbContext = phimDbContext;
            _logger = logger;
            _httpContextAccessor = httpContextAccessor;
            _mapper = mapper;
        }
    }
}
