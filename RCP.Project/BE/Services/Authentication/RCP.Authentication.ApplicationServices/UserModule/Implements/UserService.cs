using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using RCP.Authentication.ApplicationService.Common;
using RCP.Authentication.ApplicationService.UserModule.Abstracts;
using RCP.Shared.Constant.Constants.Auth;
using RCP.Authentication.Domain;
using RCP.Authentication.Dtos.User;
using RCP.Authentication.Infrastructure;
using RCP.Project.HttpRequest.AppException;
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
            ILogger<BaseAuthService> logger,
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
                SecurityStamp = Guid.NewGuid().ToString()
            };

            var result = await _userManager.CreateAsync(newUser, dto.Password);

            var roleResult = await _userManager.AddToRoleAsync(newUser, "CUSTOMER");
            _logger.LogInformation("User {UserName} registered successfully with ID {UserId}", dto.UserName, newUser.Id);
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