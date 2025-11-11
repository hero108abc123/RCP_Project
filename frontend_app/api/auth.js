import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// ✅ Lấy từ .env
const BASE_URL = process.env.EXPO_PUBLIC_BASE_API_URL;
const CLIENT_ID = process.env.EXPO_PUBLIC_AUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.EXPO_PUBLIC_AUTH_CLIENT_SECRET;
const GRANT_TYPE = process.env.EXPO_PUBLIC_AUTH_GRANT_TYPE;
const SCOPE = process.env.EXPO_PUBLIC_AUTH_SCOPE;

// Helper: Tạo URLSearchParams
const createFormData = (data) => {
  const params = new URLSearchParams();
  Object.entries(data).forEach(([key, value]) => params.append(key, value));
  return params;
};

export const auth = {
  // ✅ Login
  async login(username, password) {
    try {
      console.log("🔹 [LOGIN] Username:", username);

      const { data } = await axios.post(
        `${BASE_URL}connect/token`,
        createFormData({
          grant_type: GRANT_TYPE,
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          username,
          password,
          scope: SCOPE,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      // Lưu tokens
      await AsyncStorage.multiSet([
        ["access_token", data.access_token],
        ["refresh_token", data.refresh_token || ""],
        ["token_expires_at", (Date.now() + data.expires_in * 1000).toString()],
      ]);

      console.log("✅ [LOGIN] Success");
      return data;
    } catch (error) {
      console.error("❌ [LOGIN]", error.response?.status, error.response?.data);
      throw error;
    }
  },

  // ✅ Logout
  async logout() {
    try {
      await AsyncStorage.multiRemove([
        "access_token",
        "refresh_token",
        "token_expires_at",
      ]);
      console.log("✅ [LOGOUT] Success");
    } catch (error) {
      console.error("❌ [LOGOUT]", error);
    }
  },

  // ✅ Refresh Token
  async refresh(refreshToken) {
    try {
      console.log("🔄 [REFRESH] Refreshing token...");

      const { data } = await axios.post(
        `${BASE_URL}connect/token`,
        createFormData({
          grant_type: "refresh_token",
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          refresh_token: refreshToken,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      // Cập nhật tokens
      await AsyncStorage.multiSet([
        ["access_token", data.access_token],
        ["refresh_token", data.refresh_token || refreshToken],
        ["token_expires_at", (Date.now() + data.expires_in * 1000).toString()],
      ]);

      console.log("✅ [REFRESH] Token refreshed");
      return data.access_token;
    } catch (error) {
      console.error("❌ [REFRESH]", error.response?.data);
      throw error;
    }
  },

  // ✅ Check Authentication
  async isAuthenticated() {
    try {
      const token = await AsyncStorage.getItem("access_token");
      const expiresAt = await AsyncStorage.getItem("token_expires_at");

      if (!token || !expiresAt) return false;

      // Token hết hạn -> Thử refresh
      if (Date.now() >= parseInt(expiresAt)) {
        const refreshToken = await AsyncStorage.getItem("refresh_token");
        if (refreshToken) {
          try {
            await this.refresh(refreshToken);
            return true;
          } catch {
            return false;
          }
        }
        return false;
      }

      return true;
    } catch (error) {
      console.error("❌ [AUTH]", error);
      return false;
    }
  },
};