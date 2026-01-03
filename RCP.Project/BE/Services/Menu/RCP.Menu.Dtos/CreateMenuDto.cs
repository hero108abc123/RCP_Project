using Microsoft.AspNetCore.Http;

namespace RCP.Menu.Dtos
{
    public class CreateMenuDto
    {
        public string TenMon { get; set; }
        public decimal Gia { get; set; }
        public string? MoTa { get; set; }

        public IFormFile? AnhFile { get; set; } // <--- Thêm dòng này để nhận file

        public int Loai { get; set; }
        public int TrangThai { get; set; }
    }
}
