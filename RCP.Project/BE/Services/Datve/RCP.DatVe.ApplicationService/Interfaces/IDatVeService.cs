
using RCP.DatVe.Dtos;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RCP.DatVe.ApplicationService.Interfaces
{
    public interface IDatVeService
    {
        Task<List<TrangThaiGheDto>> GetTrangThaiGhe(GetTrangThaiGheDto dto);
        Task<List<ViewGheTamGiuDto>> DatVeTam(DatVeTamDto dto);
        Task HuyDatVeTamBySession(string sessionId);
        Task HuyDatVeTam(int idGheTamGiu);
        Task<XacNhanDatVeByUserIdResposneDto> XacNhanDatVeByUserId(XacNhanDatVeByUserIdDto dto);
        Task<int> XacNhanDatVeByUserInfor(XacNhanDatVeByUserInfor dto);
        Task<ViewVeDto> GetVeById(int idVe);
        Task HuyVeBySessionId(HuyVeBySessionIdDto dto);
    }
}