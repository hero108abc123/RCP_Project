using Microsoft.EntityFrameworkCore;
using RCP.Shared.ApplicationService.Database;
using RCP.Shared.ApplicationService.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace RCP.HoaDon.Domain
{
    [Table(nameof(HoaDon), Schema = DbSchemas.HoaDon)]
    [Index(
      nameof(Id),
      IsUnique = false,
      Name = $"IX_{nameof(HoaDon)}"
    )]
    public class HoaDon :ISoftDeleted
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int IdCinema { get; set; }
        public int IdVe {  get; set; }
        public string SessionId { get; set; } = string.Empty;
        public string? IdUser { get; set; }
        public string? HoVaTen { get; set; }
        public string? SoDienThoai { get; set; }
        public string? Email { get; set; }
        public string? DiaChi { get; set; }
        public DateTime? Birthday { get; set; }
        public List<int>? IdMon { get; set; }
        public string TongTien { get; set; } = String.Empty;
        public int TrangThaiThanhToan { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string? ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public DateTime? DeletedDate { get; set; }
        public bool Deleted { get; set; }
        public string? DeletedBy { get; set; }
    }
}
