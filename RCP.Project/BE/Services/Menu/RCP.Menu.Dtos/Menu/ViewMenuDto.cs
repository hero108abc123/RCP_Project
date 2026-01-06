namespace RCP.Menu.Dtos.Menu
{
    public class ViewMenuDto
    {
        public int Id { get; set; }
        public ViewCinema Cinema { get; set; } = new ViewCinema();

        public string TenThucDon { get; set; } = String.Empty;
        //public decimal Gia { get; set; }
        //public string MoTa { get; set; } = String.Empty;
        public int TongSoMon { get; set; }
    }

    public class ViewCinema
    {
        public int Id { get; set; }
        public string Name { get; set; } = String.Empty;
    }

    

}
