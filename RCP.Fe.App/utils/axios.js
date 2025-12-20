import axios from 'axios'
import * as SecureStore from 'expo-secure-store'

const refreshEndpoint = '/connect/token'

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    Pragma: 'no-store',
    Expires: '0',
  },
})
api.interceptors.request.use(
  async (config) => {
    const accessToken = await SecureStore.getItemAsync('accessToken')
    if (accessToken && !config.url?.includes(refreshEndpoint)) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    if (
      error.response.status === 401 &&
      !originalRequest.url.includes(refreshEndpoint)
    ) {
      const refreshToken = await SecureStore.getItemAsync('refreshToken')

      if (!refreshToken) {
        return Promise.reject(error)
      }

      return api
        .post(
          refreshEndpoint,
          {
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
            client_id: process.env.EXPO_PUBLIC_AUTH_CLIENT_ID,
            client_secret: process.env.EXPO_PUBLIC_AUTH_CLIENT_SECRET,
          },
          {
            headers: {
              'Content-Type': `application/x-www-form-urlencoded`,
              // Authorization: `Bearer ${refreshToken}`,
            },
            baseURL: process.env.EXPO_PUBLIC_AUTH_API_URL,
          },
        )
        .then(async (res) => {
          await SecureStore.setItemAsync('accessToken', res.data.access_token)
          await SecureStore.setItemAsync('refreshToken', res.data.refresh_token)
          api.defaults.headers.Authorization = `Bearer ${res.data.access_token}`
          return api(originalRequest)
        })
        .catch((err) => {
          // location.href = '/login'
          // SecureStore.deleteItemAsync('accessToken')
          // SecureStore.deleteItemAsync('refreshToken')
          console.error('Error refreshing token:', err)
          return Promise.reject(err)
        })
    }
    return Promise.reject(error)
  },
)

export default api