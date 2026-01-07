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
    const res = await api.get("api/app/phim", {
      params,
      headers: { "Content-Type": "application/json" },
      baseURL: process.env.EXPO_PUBLIC_BASE_API_URL,
    });

    console.log("Raw API response:", res.data);

    return {
      items: res.data?.data?.items ?? [],
      totalItems: res.data?.data?.totalItems ?? 0,
    };
  } catch (err) {
    processApiMsgError(err, "Lỗi khi lấy danh sách phim");
    return { items: [], totalItems: 0 };
  }
};

export const getMovieById = async (id: number): Promise<IMovie | null> => {
  try {
    const res = await api.get(`api/app/phim/${id}`, {
      headers: { "Content-Type": "application/json" },
      baseURL: process.env.EXPO_PUBLIC_BASE_API_URL,
    });
    return res.data?.data ?? null;
  } catch (err) {
    processApiMsgError(err, "Lỗi khi lấy thông tin phim");
    return null;
  }
};
