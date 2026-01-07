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
    // Lưu ý: api.get tham số thứ 2 là config object, params nằm trong đó
    const res = await api.get(`api/app/room`, {
      params: params, // Axios sẽ tự convert object này thành query string (?keyword=...&pageNumber=...)
      headers: {
        "Content-Type": "application/json", // GET request thường không dùng x-www-form-urlencoded
      },
      baseURL: process.env.EXPO_PUBLIC_BASE_API_URL,
    });

    // Giả sử res.data trả về đúng cấu trúc { items: [], totalItems: 0 }
    return Promise.resolve(res.data);
  } catch (err) {
    processApiMsgError(err, "Lỗi khi lấy danh sách phong chiếu");
    return Promise.reject(err);
  }
};

export const getAllGheInRoom = async (
  params: IFindGheParams
): Promise<IPagingResponse<IGheInRoom>> => {
  try {
    // Lưu ý: api.get tham số thứ 2 là config object, params nằm trong đó
    const res = await api.get(`api/app/room/ghe`, {
      params: params, // Axios sẽ tự convert object này thành query string (?keyword=...&pageNumber=...)
      headers: {
        "Content-Type": "application/json", // GET request thường không dùng x-www-form-urlencoded
      },
      baseURL: process.env.EXPO_PUBLIC_BASE_API_URL,
    });

    // Giả sử res.data trả về đúng cấu trúc { items: [], totalItems: 0 }
    return Promise.resolve(res.data);
  } catch (err) {
    processApiMsgError(err, "Lỗi khi lấy danh sách ghế trong phòng chiếu");
    return Promise.reject(err);
  }
};
