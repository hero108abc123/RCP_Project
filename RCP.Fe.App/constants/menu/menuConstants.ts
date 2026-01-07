/**
 * Trạng thái hàng hóa trong thực đơn
 * Tương ứng với RCP.Shared.Constant.Constants.Menu.MenuConstants
 */
export const MENU_STATUS_CONSTANTS = {
  CON_HANG: 1, // Còn hàng
  HET_HANG: 2, // Hết hàng
} as const;

/**
 * Nhãn hiển thị giao diện
 */
export const MENU_STATUS_LABELS = {
  [MENU_STATUS_CONSTANTS.CON_HANG]: "Còn hàng",
  [MENU_STATUS_CONSTANTS.HET_HANG]: "Tạm hết hàng",
};

/**
 * Kiểu dữ liệu TypeScript cho trạng thái Menu
 */
export type MenuStatus =
  (typeof MENU_STATUS_CONSTANTS)[keyof typeof MENU_STATUS_CONSTANTS];
