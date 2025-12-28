using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.Lib.Domain.Dtos.Cloudinary
{
    public class UploadFileResultDto
    {
        public string SecureUrl { get; set; } = String.Empty;
        public string PublicId { get; set; } = String.Empty;
        public string Url { get; set; } = String.Empty;
    }
}
