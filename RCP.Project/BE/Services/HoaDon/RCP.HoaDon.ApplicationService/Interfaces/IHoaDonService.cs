using RCP.HoaDon.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCP.HoaDon.ApplicationService.Interfaces
{
    public interface IHoaDonService
    {
        public UpdateHoaDonResponseDto Update(UpdateHoaDonDto dto);
    }
}
