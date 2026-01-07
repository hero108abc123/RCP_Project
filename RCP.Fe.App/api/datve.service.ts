import { processApiMsgError } from "@/libs/utils";
import { GetTrangThaiGheDto, IGheTam } from "@/model/datve/ghetam.models";
import {
  DatVeTamDto,
  IHuyVe,
  IVe,
  XacNhanDatVeByUserIdDto,
  XacNhanDatVeByUserIdResponseDto,
  XacNhanDatVeByUserInfor,
} from "@/model/datve/ve.models";
import api from "@/utils/axios";

// --- API SERVICES ---

/**
 * Lấy trạng thái tất cả ghế trong phòng chiếu
 * Trạng thái: 0: Trống, 1: Đã đặt, 2: Người khác giữ, 3: Mình giữ
 */
export const getTrangThaiGhe = async (
  dto: GetTrangThaiGheDto
): Promise<any[]> => {
  try {
    const res = await api.post(`api/app/dat-ve/trang-thai-ghe`, dto, {
      baseURL: process.env.EXPO_PUBLIC_BASE_API_URL,
    });
    return res.data;
  } catch (err) {
    processApiMsgError(err, "Không thể lấy trạng thái ghế");
    return Promise.reject(err);
  }
};

/**
 * Đặt vé tạm thời (Giữ ghế trong 10 phút)
 */
export const datVeTam = async (dto: DatVeTamDto): Promise<IGheTam> => {
  try {
    const res = await api.post(`api/app/dat-ve/dat-ve-tam`, dto, {
      baseURL: process.env.EXPO_PUBLIC_BASE_API_URL,
    });
    return res.data;
  } catch (err) {
    processApiMsgError(err, "Lỗi khi giữ ghế");
    return Promise.reject(err);
  }
};

/**
 * Hủy tất cả ghế tạm giữ trong session
 */
export const huyDatVeTamBySession = async (
  sessionId: string
): Promise<void> => {
  try {
    await api.delete(`api/app/dat-ve/huy-dat-ve-tam-by-session`, {
      params: { sessionId },
      baseURL: process.env.EXPO_PUBLIC_BASE_API_URL,
    });
  } catch (err) {
    processApiMsgError(err, "Lỗi khi hủy session giữ ghế");
    return Promise.reject(err);
  }
};

/**
 * Hủy đặt vé tạm của 1 ghế cụ thể
 */
export const huyDatVeTam = async (idGheTamGiu: number): Promise<void> => {
  try {
    await api.delete(`api/app/dat-ve/huy-dat-ve-tam/${idGheTamGiu}`, {
      baseURL: process.env.EXPO_PUBLIC_BASE_API_URL,
    });
  } catch (err) {
    processApiMsgError(err, "Lỗi khi hủy ghế đang giữ");
    return Promise.reject(err);
  }
};

/**
 * Xác nhận đặt vé cho User đã đăng nhập
 */
export const xacNhanDatVeByUserId = async (
  dto: XacNhanDatVeByUserIdDto
): Promise<XacNhanDatVeByUserIdResponseDto> => {
  try {
    const res = await api.post(`api/app/dat-ve/xac-nhan-by-user-id`, dto, {
      baseURL: process.env.EXPO_PUBLIC_BASE_API_URL,
    });
    return res.data;
  } catch (err) {
    processApiMsgError(err, "Xác nhận đặt vé thất bại");
    return Promise.reject(err);
  }
};

/**
 * Xác nhận đặt vé cho khách hàng offline (nhân viên đặt)
 */
export const xacNhanDatVeByUserInfor = async (
  dto: XacNhanDatVeByUserInfor
): Promise<{ idVe: number }> => {
  try {
    const res = await api.post(`api/app/dat-ve/xac-nhan-by-user-infor`, dto, {
      baseURL: process.env.EXPO_PUBLIC_BASE_API_URL,
    });
    return res.data;
  } catch (err) {
    processApiMsgError(err, "Lỗi khi xác nhận thông tin khách hàng");
    return Promise.reject(err);
  }
};

/**
 * Lấy chi tiết vé theo ID (Dùng để in vé hoặc thanh toán)
 */
export const getVeById = async (idVe: number): Promise<IVe> => {
  try {
    const res = await api.get(`api/app/dat-ve/${idVe}`, {
      baseURL: process.env.EXPO_PUBLIC_BASE_API_URL,
    });
    return res.data;
  } catch (err) {
    processApiMsgError(err, "Không tìm thấy thông tin vé");
    return Promise.reject(err);
  }
};

/**
 * Hủy vé theo SessionId (Vé chưa thanh toán)
 */
export const huyVeBySessionId = async (dto: IHuyVe): Promise<void> => {
  try {
    await api.delete(`api/app/dat-ve/huy-ve-by-session`, {
      data: dto, // Lưu ý: Với Delete Method có Body trong Axios cần bọc trong key 'data'
      baseURL: process.env.EXPO_PUBLIC_BASE_API_URL,
    });
  } catch (err) {
    processApiMsgError(err, "Lỗi khi hủy vé");
    return Promise.reject(err);
  }
};
