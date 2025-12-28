using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using RCP.Cinema.Infrastructure;
using RCP.Lib.ApplicationService.Cloudinary.Common;
using RCP.Lib.ApplicationService.Cloudinary.Interfaces;
using RCP.Lib.Domain.Dtos.Cloudinary;
using RCP.Project.HttpRequest.AppException;
using RCP.Shared.Constant.HttpRequest.Error;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace RCP.Lib.ApplicationService.Cloudinary.Implements
{
    public class CloudinaryService : BaseCloudinaryService, ICloudinaryService
    {
        private readonly CloudinaryDotNet.Cloudinary _cloudinary;

        private static readonly HashSet<string> AllowedImageTypes = new(StringComparer.OrdinalIgnoreCase)
        {
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/webp",
            "image/bmp"
        };

        private const long MaxFileSize = 10 * 1024 * 1024; // 10MB

        public CloudinaryService(
            CinemaDbContext cinemaDbContext,
            IConfiguration configuration,
            ILogger<CloudinaryService> logger,
            IHttpContextAccessor httpContextAccessor
        ) : base(cinemaDbContext, logger, httpContextAccessor)
        {
            var cloudName = configuration["Cloudinary:CLOUDINARY_CLOUD_NAME"]
                ?? throw new UserFriendlyException(ErrorCodes.CloudinaryConfigMissing);
            var apiKey = configuration["Cloudinary:CLOUDINARY_API_KEY"]
                ?? throw new UserFriendlyException(ErrorCodes.CloudinaryConfigMissing);
            var apiSecret = configuration["Cloudinary:CLOUDINARY_API_SECRET"]
                ?? throw new UserFriendlyException(ErrorCodes.CloudinaryConfigMissing);

            var account = new Account(cloudName, apiKey, apiSecret);
            _cloudinary = new CloudinaryDotNet.Cloudinary(account);
        }

        public async Task<UploadFileResultDto> UploadImageAsync(UploadFileDto uploadFileDto)
        {
            ValidateFile(uploadFileDto.File);

            using var stream = uploadFileDto.File.OpenReadStream();

            var uploadParams = new ImageUploadParams
            {
                File = new FileDescription(uploadFileDto.File.FileName, stream),
                Folder = uploadFileDto.Folder
            };

            _logger.LogInformation("Uploading to Cloudinary. FileName: {FileName}, Folder: {Folder}",
                uploadFileDto.File.FileName, uploadFileDto.Folder ?? "null");

            var result = await _cloudinary.UploadAsync(uploadParams);

            if (result.Error != null)
            {
                _logger.LogError("Cloudinary upload failed. Error: {Error}", result.Error.Message);
                throw new UserFriendlyException(ErrorCodes.CloudinaryUploadFailed);
            }

            _logger.LogInformation("Cloudinary upload success. Url: {Url}", result.SecureUrl);

            return new UploadFileResultDto
            {
                SecureUrl = result.SecureUrl?.ToString() ?? string.Empty,
                PublicId = result.PublicId,
                Url = result.Url?.ToString() ?? string.Empty
            };
        }

        private void ValidateFile(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                throw new UserFriendlyException(ErrorCodes.CloudinaryFileEmpty);
            }

            if (file.Length > MaxFileSize)
            {
                throw new UserFriendlyException(ErrorCodes.CloudinaryFileTooLarge);
            }

            if (!AllowedImageTypes.Contains(file.ContentType))
            {
                throw new UserFriendlyException(ErrorCodes.CloudinaryInvalidFileType);
            }
        }
    }
}