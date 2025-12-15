using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RCP.Authentication.ApplicationService.Common;
using RCP.Authentication.ApplicationService.UserModule.Abstracts;
using RCP.Authentication.Domain;
using RCP.Authentication.Dtos.User;
using RCP.Authentication.Infrastructure;
using RCP.Project.HttpRequest.AppException;
using RCP.Project.HttpRequest.BaseRequest;
using RCP.Shared.Constant.Constants.Auth;
using RCP.Shared.Constant.HttpRequest.Error;
using System.Net.Mail;
using System.Text.Json;
using System.Text.RegularExpressions;

namespace RCP.Authentication.ApplicationService.UserModule.Implements
{
    public class UserService : BaseAuthService, IUserService
    {
        private static readonly TimeZoneInfo VietnamTimeZone = TimeZoneInfo.FindSystemTimeZoneById("SE Asia Standard Time");
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public UserService(
            AuthenticationDbContext authDbContext,
            ILogger<UserService> logger,
            IHttpContextAccessor httpContextAccessor,
            IMapper mapper,
            UserManager<AppUser> userManager,
            RoleManager<IdentityRole> roleManager)
            : base(authDbContext, logger, httpContextAccessor, mapper)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task RegisterUser(RegisterDto dto)
        {
            _logger.LogInformation($"{nameof(RegisterUser)}, dto = {JsonSerializer.Serialize(dto)}");
            var vietnamNow = GetVietnamTime();
            if (string.IsNullOrWhiteSpace(dto.UserName))
                throw new UserFriendlyException(ErrorCodes.AuthErrorUserNameRequired);

            if (string.IsNullOrWhiteSpace(dto.FullName))
                throw new UserFriendlyException(ErrorCodes.AuthErrorFullNameRequired);

            if (string.IsNullOrWhiteSpace(dto.Email))
                throw new UserFriendlyException(ErrorCodes.AuthErrorEmailRequired);

            if (string.IsNullOrWhiteSpace(dto.PhoneNumBer))
                throw new UserFriendlyException(ErrorCodes.AuthErrorPhoneNumberRequired);

            if (string.IsNullOrWhiteSpace(dto.Password))
                throw new UserFriendlyException(ErrorCodes.AuthErrorPasswordRequired);

            if (!IsValidEmail(dto.Email))
                throw new UserFriendlyException(ErrorCodes.AuthErrorInvalidEmail);

            if (!IsValidPhoneNumber(dto.PhoneNumBer))
                throw new UserFriendlyException(ErrorCodes.AuthErrorInvalidPhoneNumber);

            if (dto.Password.Length < AuthConstants.PasswordLength)
                throw new UserFriendlyException(ErrorCodes.AuthErrorPasswordTooWeak);

            if (dto.BirthDay == DateTime.MinValue || dto.BirthDay > DateTime.Now.AddYears(-13))
                throw new UserFriendlyException(ErrorCodes.AuthErrorInvalidBirthDay);

            var existingUser = await _userManager.FindByNameAsync(dto.UserName);
            if (existingUser != null)
                throw new UserFriendlyException(ErrorCodes.AuthErrorUserAlreadyExists);

            var existingEmailUser = await _userManager.FindByEmailAsync(dto.Email);
            if (existingEmailUser != null)
                throw new UserFriendlyException(ErrorCodes.AuthErrorUserAlreadyExists);

            if (!await _roleManager.RoleExistsAsync("CUSTOMER"))
            {
                await _roleManager.CreateAsync(new IdentityRole("CUSTOMER"));
            }

            // Create new user
            var newUser = new AppUser
            {
                Id = Guid.NewGuid().ToString(),
                UserName = dto.UserName,
                Email = dto.Email,
                FullName = dto.FullName,
                PhoneNumber = dto.PhoneNumBer,
                BirthDay = dto.BirthDay,
                EmailConfirmed = true,
                SecurityStamp = Guid.NewGuid().ToString(),
                CreatedDate = vietnamNow,
            };

            var result = await _userManager.CreateAsync(newUser, dto.Password);

            var roleResult = await _userManager.AddToRoleAsync(newUser, "CUSTOMER");
            _logger.LogInformation("User {UserName} registered successfully with ID {UserId}", dto.UserName, newUser.Id);
        }


        public async Task<ViewUserDto> FindById(string id)
        {
            _logger.LogInformation($"{nameof(FindById)} id={id}");
            var user = await _userManager.FindByIdAsync(id);
            var roles = await _userManager.GetRolesAsync(user);
            var data = _mapper.Map<ViewUserDto>(user);
            data.Roles = roles.Select(r => new ViewUserRoleDto { Name = r }).ToList();
            return data;
        }
        public async Task<BaseResponsePagingDto<ViewUserDto>> FindPaging(FindPagingUserDto dto)
        {
            _logger.LogInformation($"{nameof(FindPaging)} dto={JsonSerializer.Serialize(dto)}");

            var query = _userManager.Users.AsNoTracking().AsQueryable();

            var totalCount = await query.CountAsync();

            var users = await query
                    .OrderBy(x => x.UserName)
                    .Paging(dto)
                    .ToListAsync();
            var items = _mapper.Map<List<ViewUserDto>>(users);

            return new BaseResponsePagingDto<ViewUserDto>
            {
                Items = items,
                TotalItems = totalCount,
            };
        }
        public async Task Update(string id, UpdateUserDto dto)
        {
            _logger.LogInformation($"{nameof(Update)} dto={JsonSerializer.Serialize(dto)}");

            var user = await _userManager.FindByIdAsync(id)
                ?? throw new UserFriendlyException(ErrorCodes.AuthErrorUserNotFound);

            var transaction = await _authDbContext.Database.BeginTransactionAsync();
            user.UserName = dto.UserName ?? user.UserName;
            user.FullName = dto.FullName ?? user.FullName;
            user.PhoneNumber = dto.PhoneNumber ?? user.PhoneNumber;
            user.Email = dto.Email ?? user.Email;
            user.BirthDay = dto.BirthDay;

            await _userManager.UpdateAsync(user);
            await _userManager.RemoveFromRolesAsync(user, (await _userManager.GetRolesAsync(user)).ToArray());
            await _userManager.AddToRolesAsync(user, dto.RoleNames);

            await _authDbContext.SaveChangesAsync();
            await transaction.CommitAsync();
        }
        public async Task SetRoleForUser(string id,SetRoleForUserDto dto)
        {
            _logger.LogInformation($"{nameof(SetRoleForUser)} dto={JsonSerializer.Serialize(dto)}");

            var transaction = await _authDbContext.Database.BeginTransactionAsync();
            var user = await _userManager.FindByIdAsync(id)
                ?? throw new UserFriendlyException(ErrorCodes.AuthErrorUserNotFound);

            await _userManager.RemoveFromRolesAsync(user, (await _userManager.GetRolesAsync(user)).ToArray());
            await _userManager.AddToRolesAsync(user, dto.RoleNames);
            await _authDbContext.SaveChangesAsync();
            await transaction.CommitAsync();
        }

        public async Task<GetAuthMeDto> GetAuthMe()
        {
            _logger.LogInformation($"{nameof(GetAuthMe)}");
            var currentUserId = getCurrentUserId();

            var currentUser = await _authDbContext.Users.FirstOrDefaultAsync(x => x.Id == currentUserId && !x.Deleted)
                ?? throw new UserFriendlyException(ErrorCodes.AuthErrorUserNotFound);

            var roles = await _userManager.GetRolesAsync(currentUser);

            var result = new GetAuthMeDto
            {
                Id = Guid.Parse(currentUser.Id),
                FullName = currentUser.FullName,
                UserName = currentUser.UserName,
                Email = currentUser.Email,
                PhoneNumber = currentUser.PhoneNumber,
                BirthDay = currentUser.BirthDay,
                Roles = new List<GetRoleAuthMeDto>()
            };


            foreach (var roleName in roles)
            {
                var role = await _roleManager.FindByNameAsync(roleName);
                if (role != null)
                {

                    var permissions = await _authDbContext.RoleClaims
                        .Where(rc => rc.RoleId == role.Id && rc.ClaimType == CustomClaimTypes.Permission)
                        .Select(rc => rc.ClaimValue)
                        .ToListAsync();

                    var roleDto = new GetRoleAuthMeDto
                    {
                        Id = Guid.Parse(role.Id),
                        Name = role.Name,
                        Permissions = new List<GetPermissionAuthMeDto>()
                    };

                    foreach (var permissionKey in permissions)
                    {
                        var permissionInfo = PermissionKeys.All
                            .FirstOrDefault(p => p.Key == permissionKey);

                        if (permissionInfo != default)
                        {
                            roleDto.Permissions.Add(new GetPermissionAuthMeDto
                            {
                                Key = permissionInfo.Key,
                                Name = permissionInfo.Name,
                                Category = permissionInfo.Category
                            });
                        }
                        else
                        {

                            roleDto.Permissions.Add(new GetPermissionAuthMeDto
                            {
                                Key = permissionKey,
                                Name = permissionKey,
                                Category = "Other"
                            });
                        }
                    }

                    result.Roles.Add(roleDto);
                }
            }

            return result;
        }

        public bool IsValidEmail(string email)
        {
            try
            {
                var addr = new MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }

        public bool IsValidPhoneNumber(string phoneNumber)
        {
            var pattern = @"^(0[3|5|7|8|9])+([0-9]{8})$";
            return Regex.IsMatch(phoneNumber, pattern);
        }


        private static DateTime GetVietnamTime()
        {
            return TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, VietnamTimeZone);
        }
    }
}