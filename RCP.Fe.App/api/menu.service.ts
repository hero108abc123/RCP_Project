import { processApiMsgError } from "@/libs/utils";
import { IPagingResponse } from "@/model/cinema/cinema.models";
import { IFindMenuParams, IMenu } from "@/model/menu/menu.models";
import api from "@/utils/axios";

export const getAllMenus = async (
  params: IFindMenuParams
): Promise<IPagingResponse<IMenu>> => {
  try {
    // Lưu ý: api.get tham số thứ 2 là config object, params nằm trong đó
    const res = await api.get(`api/app/menu`, {
      params: params, // Axios sẽ tự convert object này thành query string (?keyword=...&pageNumber=...)
      headers: {
        "Content-Type": "application/json", // GET request thường không dùng x-www-form-urlencoded
      },
      baseURL: process.env.EXPO_PUBLIC_BASE_API_URL,
    });

    // Giả sử res.data trả về đúng cấu trúc { items: [], totalItems: 0 }
    return Promise.resolve(res.data);
  } catch (err) {
    processApiMsgError(err, "Lỗi khi lấy danh sách menu");
    return Promise.reject(err);
  }
};
