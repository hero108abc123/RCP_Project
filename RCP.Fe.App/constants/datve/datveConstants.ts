/**
 * Trạng thái thanh toán của vé
 * Tương ứng với RCP.Shared.Constant.Constants.DatVe.DatVeConstants
 */
export const DAT_VE_STATUS_CONSTANTS = {
  CHUA_THANH_TOAN: 1, // Chưa thanh toán
  DA_THANH_TOAN: 2, // Đã thanh toán thành công
  LOI: 3, // Giao dịch lỗi/Thất bại
} as const;

/**
 * Nhãn hiển thị cho giao diện (UI Labels)
 */
export const DAT_VE_STATUS_LABELS = {
  [DAT_VE_STATUS_CONSTANTS.CHUA_THANH_TOAN]: "Chờ thanh toán",
  [DAT_VE_STATUS_CONSTANTS.DA_THANH_TOAN]: "Đã thanh toán",
  [DAT_VE_STATUS_CONSTANTS.LOI]: "Lỗi thanh toán",
};

/**
 * Màu sắc tương ứng cho từng trạng thái (thường dùng cho Badge/Tag)
 */
export const DAT_VE_STATUS_COLORS = {
  [DAT_VE_STATUS_CONSTANTS.CHUA_THANH_TOAN]: "#FFA500", // Cam
  [DAT_VE_STATUS_CONSTANTS.DA_THANH_TOAN]: "#008000", // Xanh lá
  [DAT_VE_STATUS_CONSTANTS.LOI]: "#FF0000", // Đỏ
};

/**
 * Kiểu dữ liệu TypeScript
 */
export type DatVeStatus =
  (typeof DAT_VE_STATUS_CONSTANTS)[keyof typeof DAT_VE_STATUS_CONSTANTS];
