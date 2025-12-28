using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RCP.Cinema.ApplicationServices.Cinema.Interfaces;
using RCP.Lib.ApplicationService.Cloudinary.Interfaces;
using RCP.Lib.Domain.Dtos.Cloudinary;
using RCP.Project.Controller.Base;
using RCP.Project.Controller.Cinema;
using RCP.Project.HttpRequest;

namespace RCP.Project.Controller.Test
{
    [Route("api/app/test")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class CloudinaryController:BaseController
    {
        private readonly ICloudinaryService _cloudinaryService;
        public CloudinaryController(ILogger<CloudinaryController> logger, ICloudinaryService cloudinaryService) : base(logger)
        {
            _cloudinaryService = cloudinaryService;
        }


        [HttpPost("upload-file")]
        public async Task<IActionResult> TestUploadFile([FromForm]UploadFileDto dto)
        {
            try
            {
                var data = await _cloudinaryService.UploadImageAsync(dto);
                return Ok(new ApiResponse(data));
            }
            catch (Exception ex)
            {
                return Ok(OkException(ex));
            }
        }
    }
}
