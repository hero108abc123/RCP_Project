import { processApiMsgError } from "@/libs/utils";
import { IFindGheParams, IGheInRoom } from "@/model/room/ghe.models";
import {
  IFindRoomParams,
  IPagingResponse,
  IRoom,
} from "@/model/room/room.models";

import api from "@/utils/axios";

export const getAllRoom = async (
  params: IFindRoomParams
): Promise<IPagingResponse<IRoom>> => {
  try {
    const res = await api.get(`api/app/room`, {
      params: params,
      baseURL: process.env.EXPO_PUBLIC_BASE_API_URL,
    });

    const responseData = res.data?.data;

    return {
      items: responseData?.items ?? [],
      totalItems: responseData?.totalItems ?? 0,
    };
  } catch (err) {
    processApiMsgError(err, "Lỗi khi lấy danh sách phòng chiếu");
    return Promise.reject(err);
  }
};

export const getAllGheInRoom = async (
  params: IFindGheParams
): Promise<IPagingResponse<IGheInRoom>> => {
  try {
    // Log các tham số gửi đi để kiểm tra idCinema và idRoom có đúng không
    console.log(">>> CALL API GET GHE - Params:", params);

    const res = await api.get(`api/app/room/ghe`, {
      params: params,
      baseURL: process.env.EXPO_PUBLIC_BASE_API_URL,
    });

    // LOG 1: Kiểm tra toàn bộ phản hồi từ Server
    console.log(">>> API RESPONSE FULL:", res.data);

    // LOG 2: Kiểm tra dữ liệu sau khi bóc tách lớp .data
    const responseData = res.data?.data;
    console.log(">>> DATA EXTRACTED (res.data.data):", responseData);

    // LOG 3: Kiểm tra mảng items thực tế
    if (responseData?.items) {
      console.log(`>>> SUCCESS: Tìm thấy ${responseData.items.length} ghế.`);
    } else {
      console.warn(
        ">>> WARNING: Thuộc tính 'items' bị trống hoặc không tồn tại."
      );
    }

    return {
      items: responseData?.items ?? [],
      totalItems: responseData?.totalItems ?? 0,
    };
  } catch (err: any) {
    // LOG LỖI: Xem lỗi mạng hoặc lỗi từ Server (401, 404, 500...)
    console.error(">>> API ERROR GHE:", err?.response?.data || err.message);
    processApiMsgError(err, "Lỗi khi lấy danh sách ghế trong phòng chiếu");
    return Promise.reject(err);
  }
};
