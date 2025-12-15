using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using RCP.Authentication.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.Authentication.Infrastructure
{
    public class AuthenticationDbContext : IdentityDbContext<AppUser>
    {
        public AuthenticationDbContext(DbContextOptions<AuthenticationDbContext> options) : base(options)
        {
        }
       
     
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
           
            modelBuilder.UseOpenIddict();
            base.OnModelCreating(modelBuilder);
        }
    }
}
