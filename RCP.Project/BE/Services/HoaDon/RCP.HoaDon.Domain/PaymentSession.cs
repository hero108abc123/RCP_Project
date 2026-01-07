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
    [Table(nameof(PaymentSession), Schema = DbSchemas.HoaDon)]
    [Index(
      nameof(Id),
      IsUnique = false,
      Name = $"IX_{nameof(PaymentSession)}"
    )]
    public class PaymentSession: ISoftDeleted
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string PaymentId { get; set; } = string.Empty; // PaymentId từ VNPAY
        public string SessionId { get; set; } = string.Empty;
        public string? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string? ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public DateTime? DeletedDate { get; set; }
        public bool Deleted { get; set; }
        public string? DeletedBy { get; set; }
    }
}
