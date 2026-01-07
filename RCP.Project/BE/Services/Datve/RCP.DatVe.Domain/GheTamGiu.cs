using Microsoft.EntityFrameworkCore;
using RCP.Shared.ApplicationService.Database;
using RCP.Shared.ApplicationService.Interfaces;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RCP.DatVe.Domain
{
    [Table(nameof(GheTamGiu), Schema = DbSchemas.DatVe)]
    [Index(nameof(IdGhe), nameof(Deleted), Name = $"IX_{nameof(GheTamGiu)}_IdGhe_Deleted")]
    public class GheTamGiu : ISoftDeleted
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public int IdGhe { get; set; }
        public int IdRoom { get; set; }
        public int IdCinema { get; set; }
        public int IdPhim { get; set; }
        public int IdLichChieu { get; set; }
        public string? IdUser { get; set; }
        public string SessionId { get; set; } = string.Empty; // Để track session người dùng

        public DateTime NgayGioGiuGhe { get; set; } // Thời gian bắt đầu giữ
        public DateTime NgayGioHetHan { get; set; } // Thời gian hết hạn (10 phút)

        public string? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string? ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public DateTime? DeletedDate { get; set; }
        public bool Deleted { get; set; }
        public string? DeletedBy { get; set; }
    }
}