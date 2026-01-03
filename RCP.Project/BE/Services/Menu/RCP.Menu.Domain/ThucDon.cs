using Microsoft.EntityFrameworkCore;
using RCP.Shared.ApplicationService.Database;
using RCP.Shared.ApplicationService.Interfaces;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RCP.Menu.Domain
{
    [Table(nameof(ThucDon), Schema = DbSchemas.Menu)]
    [Index(
      nameof(Id),
      IsUnique = false,
      Name = $"IX_{nameof(ThucDon)}"
    )]
    public class ThucDon : ISoftDeleted
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string TenMon { get; set; }
        public decimal Gia { get; set; }
        public string MoTa { get; set; }

        public string? AnhMinhHoa { get; set; }

        public int Loai { get; set; } // Để lọc hiển thị trên màn hình bán hàng

        public int TrangThai { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string? ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public DateTime? DeletedDate { get; set; }
        public bool Deleted { get; set; }
        public string? DeletedBy { get; set; }
    }
}
