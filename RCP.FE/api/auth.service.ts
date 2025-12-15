
import { processApiMsgError } from "@/libs/utils"
import { IConnectToken, ILogin } from "@/model/auth/auth.models"
import api from "@/utils/axios"

const login = async (body: ILogin) => {
  try {
    const params: IConnectToken = {
      grant_type: process.env.EXPO_PUBLIC_AUTH_GRANT_TYPE || '',
      username: body.username,
      password: body.password,
      scope: process.env.EXPO_PUBLIC_AUTH_SCOPE || '',
      client_id: process.env.EXPO_PUBLIC_AUTH_CLIENT_ID || '',
      client_secret: process.env.EXPO_PUBLIC_AUTH_CLIENT_SECRET || '',
    }

    const res = await api.post(`connect/token`, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      baseURL: process.env.EXPO_PUBLIC_BASE_API_URL,
    })
    return Promise.resolve(res.data)
  } catch (err) {
    processApiMsgError(err, '')
    
    return Promise.reject(err)
  }
}
export const AuthServices = {
  login,
}
