import axios from "axios";
import { apiConfig } from "./api-config";
import AsyncStorage from "@react-native-async-storage/async-storage";


const apiClient = axios.create({
    baseURL: apiConfig.baseUrl,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("access_token");

  // Nếu đã có token, tự động thêm header Authorization
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Nếu request gửi đến /connect/token thì dùng Accept text/plain
  if (config.url?.includes("/connect/token")) {
    config.headers["Accept"] = "text/plain";
  }

  // Nếu chưa có Content-Type, mặc định là application/json
  if (!config.headers["Content-Type"]) {
    config.headers["Content-Type"] = "application/json";
  }

  return config;
});
export default apiClient;
