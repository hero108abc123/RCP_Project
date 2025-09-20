using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RCP.Authentication.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.Authentication.ApplicationService.Common
{
    public class BaseAuthService
    {
        public readonly AuthenticationDbContext _authDbContext;
        public readonly ILogger<BaseAuthService> _logger;
        public readonly IHttpContextAccessor _httpContextAccessor;
        protected readonly IMapper _mapper;

        public BaseAuthService(
            AuthenticationDbContext authDbContext,
            ILogger<BaseAuthService> logger,
            IHttpContextAccessor httpContextAccessor,
            IMapper mapper
        )
        {
            _authDbContext = authDbContext;
            _logger = logger;
            _httpContextAccessor = httpContextAccessor;
            _mapper = mapper;
        }
    }
}
