/**
 * Phân loại ngày áp dụng giá vé
 * Tương ứng với RCP.Shared.Constant.Constants.Cinema.GiaVeConstants
 */
export const GIA_VE_DATE_CONSTANTS = {
  NGAY_THUONG: 1, // Thứ 2 đến Thứ 6
  CUOI_TUAN: 2, // Thứ 7, Chủ Nhật
  NGAY_LE: 3, // Các ngày lễ theo quy định
} as const;

/**
 * Nhãn hiển thị cho giao diện
 */
export const GIA_VE_DATE_LABELS = {
  [GIA_VE_DATE_CONSTANTS.NGAY_THUONG]: "Ngày thường",
  [GIA_VE_DATE_CONSTANTS.CUOI_TUAN]: "Cuối tuần",
  [GIA_VE_DATE_CONSTANTS.NGAY_LE]: "Ngày lễ",
};

/**
 * Kiểu dữ liệu TypeScript cho loại ngày giá vé
 */
export type GiaVeDateType =
  (typeof GIA_VE_DATE_CONSTANTS)[keyof typeof GIA_VE_DATE_CONSTANTS];
