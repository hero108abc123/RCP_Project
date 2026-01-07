import api from "@/utils/axios";
import { processApiMsgError } from "@/libs/utils";
import { ApiResponse } from "@/model/user/api-response";
import { ViewUser } from "@/model/user/users.models";

export const UserService = {
  getById: async (id: string): Promise<ViewUser> => {
    const res = await api.get<ApiResponse<ViewUser>>(`/users/${id}`);
    return res.data.data;
  },
  getMe: async (): Promise<ViewUser> => {
    const res = await api.get<ApiResponse<ViewUser>>(`/api/app/users/me`);
    return res.data.data;
  },
};
