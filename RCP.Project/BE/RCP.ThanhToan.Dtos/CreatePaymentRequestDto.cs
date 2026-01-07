using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VNPAY.Models.Enums;

namespace RCP.ThanhToan.Dtos
{
    public class CreatePaymentRequestDto
    {
        public decimal Amount { get; set; }
        public string? Description { get; set; }
        public string SessionId { get; set; } = string.Empty;
        public BankCode? BankCode { get; set; }
        public DisplayLanguage? Language { get; set; }
    }
}
