import { processApiMsgError } from "@/libs/utils";
import { IConnectToken, ILogin, IRegister } from "@/model/auth/auth.models";
import api from "@/utils/axios";

const login = async (body: ILogin) => {
  try {
    console.log("🚀 ~ file: auth.service.ts:2 ~ login ~ body:", body);
    const params: IConnectToken = {
      grant_type: process.env.EXPO_PUBLIC_AUTH_GRANT_TYPE || "",
      username: body.username,
      password: body.password,
      scope: process.env.EXPO_PUBLIC_AUTH_SCOPE || "",
      client_id: process.env.EXPO_PUBLIC_AUTH_CLIENT_ID || "",
      client_secret: process.env.EXPO_PUBLIC_AUTH_CLIENT_SECRET || "",
    };

    const res = await api.post(`connect/token`, params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      baseURL: process.env.EXPO_PUBLIC_BASE_API_URL,
    });
    console.log(res.data);
    return Promise.resolve(res.data);
  } catch (err) {
    processApiMsgError(err, "");

    return Promise.reject(err);
  }
};
const register = async (body: IRegister) => {
  try {
    console.log("🚀 ~ file: auth.service.ts ~ register ~ body:", body);
    
    const res = await api.post(`api/app/users/register`, body, {
      headers: {
        "Content-Type": "application/json",
      },
      baseURL: process.env.EXPO_PUBLIC_BASE_API_URL,
    });
    
    console.log(res.data);
    return Promise.resolve(res.data);
  } catch (err) {
    processApiMsgError(err, "");
    return Promise.reject(err);
  }
};
export const AuthServices = {
  login,
  register,
};
