// constants/cinema/gheConstants.ts

/**
 * Phân loại loại ghế
 */
export const GHE_TYPE_CONSTANTS = {
  THUONG: 1,
  DOI: 2,
} as const;

/**
 * Trạng thái đặt ghế
 * 0: Trống, 1: Đã đặt, 2: Người khác giữ, 3: Mình giữ
 */
export const TRANG_THAI_GHE_CONSTANTS = {
  CHUA_DAT: 0,
  DA_DAT: 1,
  NGUOI_KHAC_GIU: 2,
  DANG_GIU: 3,
} as const;