using RCP.Shared.ApplicationService.Database;
using RCP.Shared.ApplicationService.Interfaces;
using System.ComponentModel.DataAnnotations.Schema;

namespace RCP.Authentication.Domain
{
    [Table(nameof(RolePermission), Schema = DbSchemas.Core)]
    public class RolePermission : ISoftDeleted
    {
        public string RoleId { get; set; } = String.Empty;
        public int PermissionId { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? DeletedDate { get; set; }
        public bool Deleted { get; set; }
        public string? DeletedBy { get; set; }
    }
}
