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

namespace RCP.DatVe.Domain
{
    [Table(nameof(Ve), Schema = DbSchemas.DatVe)]
    [Index(
      nameof(Id),
      IsUnique = false,
      Name = $"IX_{nameof(Ve)}"
    )]
    public class Ve: ISoftDeleted
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string? IdUser {  get; set; } 
        public string? HoVaTen { get; set; }
        public string? SoDienThoai { get; set; }
        public string? Email { get; set; }
        public string? DiaChi { get; set; }
        public DateTime? Birthday { get; set; }
        public  int IdCinema { get; set; }
        public int IdPhim { get; set; }
        public int IdRoom { get; set; }
        public List<int> IdGhe {  get; set; } = new List<int>();
        public string SessionId { get; set; } = string.Empty;
        //public int TrangThaiThanhToan { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string? ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public DateTime? DeletedDate { get; set; }
        public bool Deleted { get; set; }
        public string? DeletedBy { get; set; }
    }
}
