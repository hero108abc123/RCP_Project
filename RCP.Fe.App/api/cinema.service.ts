import {
  ICinema,
  IFindCinemaParams,
  IPagingResponse,
} from "./../model/cinema/cinema.models";
import { processApiMsgError } from "@/libs/utils";
import api from "@/utils/axios";

export const getAllCinemas = async (
  params: IFindCinemaParams
): Promise<IPagingResponse<ICinema>> => {
  try {
    // Lưu ý: api.get tham số thứ 2 là config object, params nằm trong đó
    const res = await api.get(`api/app/cinema`, {
      params: params, // Axios sẽ tự convert object này thành query string (?keyword=...&pageNumber=...)
      headers: {
        "Content-Type": "application/json", // GET request thường không dùng x-www-form-urlencoded
      },
      baseURL: process.env.EXPO_PUBLIC_BASE_API_URL,
    });

     const data = res.data?.data;
    // Giả sử res.data trả về đúng cấu trúc { items: [], totalItems: 0 }
    return Promise.resolve(data);
  } catch (err) {
    processApiMsgError(err, "Lỗi khi lấy danh sách rạp");
    return Promise.reject(err);
  }
};
