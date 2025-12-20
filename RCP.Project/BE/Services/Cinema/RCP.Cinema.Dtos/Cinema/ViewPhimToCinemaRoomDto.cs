using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.Cinema.Dtos.Cinema
{
    public class ViewPhimToCinemaRoomDto
    {
        public int IdCinema {  get; set; }
    }

    public class ViewRoomCinemaDto
    {
        public int IdRoom { get; set; }
        public string Name { get; set; } = String.Empty;
        public string Description { get; set; } = String.Empty;
        //Vị trí
        public string Location { get; set; } = String.Empty;
        public int TongSoLuongGhe { get; set; }
        public int SoLuongGheThuong { get; set; }
        public int SoLuongGheVip { get; set; }
        public int SoLuongGheDoi { get; set; }
    }

    public class ViewPhimCinemaDto
    {
        public int IdPhim { get; set; }
        [Required, MaxLength(500)]
        public string TenPhim { get; set; } = string.Empty;

        [MaxLength(2000)]
        public string? MoTa { get; set; }

        [MaxLength(500)]
        public string? DaoDien { get; set; }

        [MaxLength(1000)]
        public string? DienVien { get; set; }

        public int ThoiLuongPhut { get; set; }

        public DateTime NgayKhoiChieu { get; set; }

        [MaxLength(20)]
        public string? NgonNgu { get; set; }

        [MaxLength(10)]
        public string? PhanLoaiDoTuoi { get; set; }

        public bool DangChieu { get; set; }
    }
    public class ViewPhimAnhCinemaDto
    {
        public int Id { get; set; }


        public int IdPhim { get; set; }

        [MaxLength(1000)]
        public string Url { get; set; } = string.Empty;

        [MaxLength(100)]
        public string? LoaiAnh { get; set; } 

        public bool LaAnhChinh { get; set; } = false; 
    }

    public class ViewPhimVideoCinemaDto
    {
        public int Id { get; set; }


        public int IdPhim { get; set; }

        [MaxLength(1000)]
        public string Url { get; set; } = string.Empty;

        [MaxLength(200)]
        public string? TieuDe { get; set; }

        [MaxLength(50)]
        public string? LoaiVideo { get; set; } // Trailer, BehindTheScenes,...
    }
}
