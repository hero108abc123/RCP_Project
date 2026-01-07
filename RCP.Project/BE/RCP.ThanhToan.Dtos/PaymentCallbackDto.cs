using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.ThanhToan.Dtos
{
    public class PaymentCallbackDto
    {
        public bool Success { get; set; }
        public string? TransactionId { get; set; }
        public decimal Amount { get; set; }
        public string? OrderInfo { get; set; }
        public string? PayDate { get; set; }
        public string? StatusCode { get; set; }
        public string? Message { get; set; }
    }
}
