using RCP.Movie.Dtos.Phim;
using RCP.Project.HttpRequest.BaseRequest;

namespace RCP.Movie.ApplicationServices.PhimModule.Abstracts
{
    public interface IPhimService
    {
        BaseResponsePagingDto<ViewPhimDto> FindPaging(FindPhimDto dto);
        ViewPhimDto CreatePhim(CreatePhimDto dto);
        ViewPhimDto UpdatePhim(int id, UpdatePhimDto dto);
        ViewPhimDto DeletePhim(int id);
    }
}
