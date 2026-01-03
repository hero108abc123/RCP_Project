using AutoMapper;
using Microsoft.AspNetCore.Identity;
using RCP.Authentication.Domain;
using RCP.Authentication.Dtos.Role;
using RCP.Authentication.Dtos.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.Authentication.ApplicationService.Common
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<AppUser, ViewUserDto>();
            CreateMap<AppUser, GetAuthMeDto>();
            CreateMap<IdentityRole, ViewRoleDto>();

        }
    }
}
