import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// ✅ Lấy từ .env
const BASE_URL = process.env.EXPO_PUBLIC_BASE_API_URL;

// Tạo axios instance
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Request Interceptor - Tự động thêm token
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("access_token");
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log(`🔹 [API] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error("❌ [API] Request error:", error);
    return Promise.reject(error);
  }
);

// ✅ Response Interceptor - Tự động refresh token
api.interceptors.response.use(
  (response) => {
    console.log(`✅ [API] ${response.status}`);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await AsyncStorage.getItem("refresh_token");
        
        if (refreshToken) {
          const { auth } = await import("./auth");
          const newToken = await auth.refresh(refreshToken);
          
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error("❌ [API] Token refresh failed");
        await AsyncStorage.multiRemove(["access_token", "refresh_token", "token_expires_at"]);
      }
    }

    console.error("❌ [API]", error.response?.status, error.message);
    return Promise.reject(error);
  }
);

export default api;