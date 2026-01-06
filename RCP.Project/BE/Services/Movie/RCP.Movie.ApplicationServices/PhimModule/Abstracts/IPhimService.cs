using RCP.Movie.Dtos.Phim;
using RCP.Project.HttpRequest.BaseRequest;

namespace RCP.Movie.ApplicationServices.PhimModule.Abstracts
{
    public interface IPhimService
    {
        BaseResponsePagingDto<ViewPhimDto> FindPaging(FindPhimDto dto);
        Task<ViewPhimDto> CreatePhim(CreatePhimDto dto);
        Task<ViewPhimDto> UpdatePhim( UpdatePhimDto dto);
        ViewPhimDto DeletePhim(int id);
        public List<GetDropDownPhimDto> GetDropDown();
        public List<GetTheLoaiDto> GetTheLoai();
        public ViewPhimDto FindById(int id);
    }
}
