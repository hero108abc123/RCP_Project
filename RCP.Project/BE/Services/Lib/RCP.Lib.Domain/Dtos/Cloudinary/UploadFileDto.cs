using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.Lib.Domain.Dtos.Cloudinary
{
    public class UploadFileDto
    {
        public IFormFile File { get; set; }
        public string? Folder { get; set; } = null;
    }
}