using Microsoft.EntityFrameworkCore;
using RCP.Shared.ApplicationService.Database;
using RCP.Shared.ApplicationService.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace RCP.Menu.Domain
{
    [Table(nameof(ThongKeKho), Schema = DbSchemas.Menu)]
    [Index(
      nameof(Id),
      IsUnique = false,
      Name = $"IX_{nameof(ThongKeKho)}"
    )]
    public class ThongKeKho:ISoftDeleted
    {
        public int Id { get; set; }
        public int IdKho { get; set; }
        public int IdMatHang { get; set; }
        public int SoLuongNhap { get; set; }
        public decimal DonGiaNhap { get; set; }
        public decimal TongGiaTriNhapHang { get; set; }
        public DateTime NgayNhap { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string? ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public DateTime? DeletedDate { get; set; }
        public bool Deleted { get; set; }
        public string? DeletedBy { get; set; }
    }
}
