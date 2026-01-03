using RCP.Asset.Dtos;
using RCP.Project.HttpRequest.BaseRequest;

namespace RCP.Asset.ApplicationServices.AssetModule.Abstracts
{
    public interface IAssetService
    {
        public void Create(CreateAssetDto dto);
        public void Update(UpdateAssetDto dto);
        public void Delete(int id);
        public BaseResponsePagingDto<ViewAssetDto> Find(FindPagingAssetDto dto);
        public ViewAssetDto FindById(int id);
    }
}
