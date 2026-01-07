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

namespace RCP.Cinema.Domain
{

    [Table(nameof(GheLichChieu), Schema = DbSchemas.Cinema)]
    [Index(
      nameof(Id),
      IsUnique = false,
      Name = $"IX_{nameof(Ghe)}"
    )]
    public class GheLichChieu: ISoftDeleted
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int IdGhe { get; set; }
        public int IdLichChieu { get; set; }
        public int TrangThaiDatGhe { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string? ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public DateTime? DeletedDate { get; set; }
        public bool Deleted { get; set; }
        public string? DeletedBy { get; set; }

    }
}
