/**
 * Phân loại loại ghế
 * Tương ứng với RCP.Shared.Constant.Constants.Cinema.GheConstants
 */
export const GHE_TYPE_CONSTANTS = {
  THUONG: 1, // Ghế đơn tiêu chuẩn
  DOI: 2, // Ghế đôi (Sweetbox)
} as const;

/**
 * Trạng thái đặt ghế thực tế từ Server
 * Tương ứng với RCP.Shared.Constant.Constants.Cinema.TrangThaiDatGheConstants
 */
export const TRANG_THAI_GHE_CONSTANTS = {
  CHUA_DAT: 0, // Ghế trống (Available)
  DA_DAT: 1, // Ghế đã có người mua (Occupied)
  DANG_GIU: 3, // Ghế đang được giữ (Holding)
} as const;

/**
 * Nhãn hiển thị và màu sắc cho UI sơ đồ ghế
 */
export const GHE_UI_CONFIG = {
  TYPES: {
    [GHE_TYPE_CONSTANTS.THUONG]: { label: "Ghế thường", color: "#FFFFFF" },
    [GHE_TYPE_CONSTANTS.DOI]: { label: "Ghế đôi", color: "#FFC0CB" },
  },
  STATUS: {
    [TRANG_THAI_GHE_CONSTANTS.CHUA_DAT]: { label: "Trống", color: "#777777" },
    [TRANG_THAI_GHE_CONSTANTS.DA_DAT]: { label: "Đã đặt", color: "#FF0000" },
    [TRANG_THAI_GHE_CONSTANTS.DANG_GIU]: {
      label: "Đang giữ",
      color: "#FFFF00",
    },
  },
};
