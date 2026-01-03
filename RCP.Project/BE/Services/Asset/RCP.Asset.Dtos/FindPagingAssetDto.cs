using RCP.Project.HttpRequest.BaseRequest;

namespace RCP.Asset.Dtos
{
    public class FindPagingAssetDto : BaseRequestPagingDto
    {

        // Custom filters
        public int? RapChieuId { get; set; }
        public int? LoaiTaiSan { get; set; }
    }
}