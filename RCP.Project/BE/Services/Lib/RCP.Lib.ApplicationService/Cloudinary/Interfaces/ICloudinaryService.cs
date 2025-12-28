using RCP.Lib.Domain.Dtos.Cloudinary;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.Lib.ApplicationService.Cloudinary.Interfaces
{
    public interface ICloudinaryService
    {
        public  Task<UploadFileResultDto> UploadImageAsync(UploadFileDto uploadFileDto);
    }
}
