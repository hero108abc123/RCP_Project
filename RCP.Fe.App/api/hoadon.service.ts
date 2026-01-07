import { processApiMsgError } from "@/libs/utils";
import {
  UpdateHoaDonDto,
  UpdateHoaDonResponse,
  UpdateTrangThaiHoaDonDto,
} from "@/model/hoadon/hoadon.models";
import api from "@/utils/axios";

// --- API SERVICES ---

/**
 * Cập nhật thông tin hóa đơn (ví dụ: cập nhật list món ăn, tính lại tổng tiền)
 * Method: PUT
 * Endpoint: api/app/hoa-don
 */
export const updateHoaDon = async (
  dto: UpdateHoaDonDto
): Promise<UpdateHoaDonResponse> => {
  try {
    const res = await api.put(`api/app/hoa-don`, dto, {
      baseURL: process.env.EXPO_PUBLIC_BASE_API_URL,
    });
    return res.data;
  } catch (err) {
    processApiMsgError(err, "Cập nhật hóa đơn thất bại");
    return Promise.reject(err);
  }
};

/**
 * Cập nhật trạng thái hóa đơn
 * Method: PUT
 * Endpoint: api/app/hoa-don/trang-thai (Giả định dựa trên naming convention vì controller C# chưa show route con)
 */
export const updateTrangThaiHoaDon = async (
  dto: UpdateTrangThaiHoaDonDto
): Promise<any> => {
  try {
    // Lưu ý: Kiểm tra lại route bên BE, ở đây đang giả định là /trang-thai
    const res = await api.put(`api/app/hoa-don/trang-thai`, dto, {
      baseURL: process.env.EXPO_PUBLIC_BASE_API_URL,
    });
    return res.data;
  } catch (err) {
    processApiMsgError(err, "Lỗi khi cập nhật trạng thái hóa đơn");
    return Promise.reject(err);
  }
};
