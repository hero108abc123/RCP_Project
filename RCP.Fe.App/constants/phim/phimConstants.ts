/**
 * Trạng thái chiếu của phim
 * Tương ứng với RCP.Shared.Constant.Constants.Phim.PhimConstants
 */
export const PHIM_CHIEU_CONSTANTS = {
  DA_CHIEU: 1, // Đã chiếu
  CHUA_CHIEU: 2, // Chưa chiếu
  DANG_CHIEU: 3, // Đang chiếu
} as const;

// Hoặc sử dụng Enum nếu bạn muốn chặt chẽ hơn về kiểu dữ liệu
export enum PhimStatus {
  DaChieu = 1,
  ChuaChieu = 2,
  DangChieu = 3,
}

/**
 * Danh sách hiển thị nhãn (Label) cho UI (nếu cần)
 */
export const PHIM_STATUS_LABELS = {
  [PHIM_CHIEU_CONSTANTS.DA_CHIEU]: "Đã chiếu",
  [PHIM_CHIEU_CONSTANTS.CHUA_CHIEU]: "Sắp chiếu",
  [PHIM_CHIEU_CONSTANTS.DANG_CHIEU]: "Đang chiếu",
};
