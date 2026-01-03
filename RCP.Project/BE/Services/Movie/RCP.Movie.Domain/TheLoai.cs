using RCP.Shared.ApplicationService.Database;
using RCP.Shared.ApplicationService.Interfaces;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RCP.Movie.Domain
{
    [Table(nameof(TheLoai), Schema = DbSchemas.Movie)]
    public class TheLoai:ISoftDeleted
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required, MaxLength(100)]
        public string TenTheLoai { get; set; } = string.Empty;

        [MaxLength(500)]
        public string? MoTa { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string? ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public DateTime? DeletedDate { get; set; }
        public bool Deleted { get; set; }
        public string? DeletedBy { get; set; }
        // 🔹 Quan hệ nhiều-nhiều ngược lại
        public ICollection<PhimTheLoai> PhimTheLoais { get; set; } = new List<PhimTheLoai>();
    }
}
