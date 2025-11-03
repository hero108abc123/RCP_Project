using RCP.Shared.ApplicationService.Database;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RCP.Movie.Domain
{
    [Table(nameof(TheLoai), Schema = DbSchemas.Movie)]
    public class TheLoai
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required, MaxLength(100)]
        public string TenTheLoai { get; set; } = string.Empty;

        [MaxLength(500)]
        public string? MoTa { get; set; }

        // 🔹 Quan hệ nhiều-nhiều ngược lại
        public ICollection<PhimTheLoai> PhimTheLoais { get; set; } = new List<PhimTheLoai>();
    }
}
