import {
  ICinema,
  IFindCinemaParams,
  IPagingResponse,
} from "./../model/cinema/cinema.models";
import { processApiMsgError } from "@/libs/utils";
import api from "@/utils/axios";
import * as SecureStore from 'expo-secure-store';

export const getAllCinemas = async (
  params: IFindCinemaParams
): Promise<IPagingResponse<ICinema>> => {
  try {

    const token = await SecureStore.getItemAsync('accessToken');
    
    const res = await api.get(`api/app/cinema`, {
      params: params,
      headers: {
        "Content-Type": "application/json",
        ...(token && { "Authorization": `Bearer ${token}` }), // ✅ THÊM TOKEN VÀO HEADER
      },
      baseURL: process.env.EXPO_PUBLIC_BASE_API_URL,
    });

    const data = res.data?.data;
    return Promise.resolve(data);
  } catch (err) {
    processApiMsgError(err, "Lỗi khi lấy danh sách rạp");
    return Promise.reject(err);
  }
};