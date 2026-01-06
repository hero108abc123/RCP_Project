import { processApiMsgError } from "@/libs/utils";
import {
  IFindMovieParams,
  IMovie,
  IPagingResponse,
} from "@/model/movie/movie.models";
import api from "@/utils/axios";

export const getAllMovie = async (
  params: IFindMovieParams
): Promise<IPagingResponse<IMovie>> => {
  try {
    // Lưu ý: api.get tham số thứ 2 là config object, params nằm trong đó
    const res = await api.get(`api/app/movie`, {
      params: params, // Axios sẽ tự convert object này thành query string (?keyword=...&pageNumber=...)
      headers: {
        "Content-Type": "application/json", // GET request thường không dùng x-www-form-urlencoded
      },
      baseURL: process.env.EXPO_PUBLIC_BASE_API_URL,
    });

    // Giả sử res.data trả về đúng cấu trúc { items: [], totalItems: 0 }
    return Promise.resolve(res.data);
  } catch (err) {
    processApiMsgError(err, "Lỗi khi lấy danh sách phim");
    return Promise.reject(err);
  }
};
