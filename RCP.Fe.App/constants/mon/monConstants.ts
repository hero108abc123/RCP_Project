/**
 * Phân loại món trong thực đơn
 * Tương ứng với RCP.Shared.Constant.Constants.Mon.MonConstants
 */
export const MON_CONSTANTS = {
  DON: 1, // Món đơn (ví dụ: 1 chai nước, 1 hộp bắp)
  COMBO: 2, // Món combo (ví dụ: 1 bắp + 2 nước)
} as const;

/**
 * Nhãn hiển thị cho UI
 */
export const MON_TYPE_LABELS = {
  [MON_CONSTANTS.DON]: "Món đơn",
  [MON_CONSTANTS.COMBO]: "Combo",
};

/**
 * Kiểu dữ liệu (Type) dựa trên hằng số để dùng cho TypeScript
 */
export type MonType = (typeof MON_CONSTANTS)[keyof typeof MON_CONSTANTS];
