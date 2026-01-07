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

    // Backend bọc kết quả trong lớp ApiResponse, thuộc tính 'data'
    // Cấu trúc mong đợi: { success: true, data: { items: [], totalItems: 0 } }
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
    const res = await api.get(`api/app/room/ghe`, {
      params: params,
      baseURL: process.env.EXPO_PUBLIC_BASE_API_URL,
    });

    // Tương tự, lấy dữ liệu từ res.data.data
    const responseData = res.data?.data;

    return {
      items: responseData?.items ?? [],
      totalItems: responseData?.totalItems ?? 0,
    };
  } catch (err) {
    processApiMsgError(err, "Lỗi khi lấy danh sách ghế trong phòng chiếu");
    return Promise.reject(err);
  }
};
