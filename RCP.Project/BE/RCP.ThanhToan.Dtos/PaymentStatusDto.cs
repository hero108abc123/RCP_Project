using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.ThanhToan.Dtos
{
    public class PaymentStatusDto
    {
        public string? TransactionId { get; set; }
        public string? Status { get; set; }
        public decimal Amount { get; set; }
        public string? Message { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? PaymentDate { get; set; }
    }
}
