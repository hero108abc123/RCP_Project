using Microsoft.AspNetCore.Http;

namespace RCP.Menu.Dtos.Menu
{
    public class CreateMenuDto
    {
        public int IdCinema { get; set; }

        public string TenThucDon { get; set; } = String.Empty;
        //public decimal Gia { get; set; }
        public string MoTa { get; set; } = String.Empty;
        public int TongSoMon { get; set; }
    }
}
