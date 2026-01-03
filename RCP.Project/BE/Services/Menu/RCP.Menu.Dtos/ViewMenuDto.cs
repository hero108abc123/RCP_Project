namespace RCP.Menu.Dtos
{
    public class ViewMenuDto
    {
        public int Id { get; set; }
        public string TenMon { get; set; }
        public decimal Gia { get; set; }
        public string? MoTa { get; set; }

        public string? AnhFile { get; set; } // <--- Thêm dòng này để nhận file

        public int Loai { get; set; }
        public int TrangThai { get; set; }
    }
}
