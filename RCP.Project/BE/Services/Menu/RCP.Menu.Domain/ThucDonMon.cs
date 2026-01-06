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

namespace RCP.Menu.Domain
{
    [Table(nameof(ThucDonMon), Schema = DbSchemas.Menu)]
    [Index(
     nameof(Id),
     IsUnique = false,
     Name = $"IX_{nameof(ThucDonMon)}"
   )]
    public class ThucDonMon: ISoftDeleted
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int IdThucDon { get; set; }
        public int IdMon { get; set; }
        public int SoLuong { get; set; }
        public int TrangThai { get; set; }
        public decimal Gia { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string? ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public DateTime? DeletedDate { get; set; }
        public bool Deleted { get; set; }
        public string? DeletedBy { get; set; }
    }
}
