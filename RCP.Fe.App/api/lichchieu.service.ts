import { processApiMsgError } from "@/libs/utils";
import {
  IFindLichChieuParams,
  ILichChieu,
  IPagingResponse,
} from "@/model/cinema/lichchieu.models";
import api from "@/utils/axios";

export const getAllCinemas = async (
  params: IFindLichChieuParams
): Promise<IPagingResponse<ILichChieu>> => {
  try {
    const res = await api.get(`api/app/lich-chieu`, {
      params: params,
      baseURL: process.env.EXPO_PUBLIC_BASE_API_URL,
    });

    // Cần lấy đúng thuộc tính 'data' từ ApiResponse của Backend
    const responseData = res.data?.data || res.data;

    return {
      items: responseData?.items ?? [],
      totalItems: responseData?.totalItems ?? 0,
    };
  } catch (err) {
    processApiMsgError(err, "Lỗi khi lấy danh sách lịch chiếu");
    return Promise.reject(err);
  }
};
