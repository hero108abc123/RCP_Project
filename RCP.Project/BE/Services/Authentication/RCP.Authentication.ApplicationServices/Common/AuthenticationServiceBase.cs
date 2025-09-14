using Microsoft.Extensions.Logging;
using RCP.Authentication.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.Authentication.ApplicationService.Common
{
    public abstract class AuthenticationServiceBase
    {
        protected readonly ILogger _logger;
        protected readonly AuthenticationDbContext _dbContext;

        protected AuthenticationServiceBase(ILogger logger, AuthenticationDbContext dbContext)
        {
            _logger = logger;
            _dbContext = dbContext;
        }
    }
}
