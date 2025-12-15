using Microsoft.AspNetCore.Identity;
using RCP.Shared.ApplicationService.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.Authentication.Domain
{
    public class AppUser : IdentityUser,ISoftDeleted
    {
        [MaxLength(250)]
        public string FullName { get; set; } = String.Empty;
        public DateTime BirthDay { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string? ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public DateTime? DeletedDate { get; set; }
        public bool Deleted { get; set; }
        public string? DeletedBy { get; set; }



    }
}
