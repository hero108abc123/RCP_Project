// auth-api.js
import apiClient from "./api-client"; // import đúng kiểu default
import { apiConfig } from "./api-config";

export const register = async (fullName, userName, email, phoneNumber, birthDay, password) => {
  const url = apiConfig.endpoints.register;

  console.log("🔹 [REGISTER] Sending request:", url);
  console.log("🔹 Payload:", { fullName, userName, email, phoneNumber, birthDay, password });

  try {
    const res = await apiClient.post(url, {
      fullName,
      userName,
      email,
      phoneNumber,
      birthDay: birthDay || "2000-01-01T00:00:00",
      password,
    });

    console.log("✅ [REGISTER] Response:", res.data);
    return res.data;
  } catch (error) {
    handleApiError(error, "REGISTER");
    throw error;
  }
};

export const login = async (username, password) => {
  const url = apiConfig.endpoints.token;
  const params = new URLSearchParams();

  params.append("grant_type", "password");
  params.append("client_id", "client-web");
  params.append("client_secret", "mBSQUHmZ4be5bQYfhw57hjJ2zFQCU2e");
  params.append("username", username);
  params.append("password", password);
  params.append("scope", "openid offline_access");

  console.log("🔹 [LOGIN] Sending request:", url);
  console.log("🔹 [LOGIN] Payload:", { username });

  try {
    const res = await apiClient.post(url, params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "text/plain", // ⚙️ bắt buộc với OpenIddict
      },
    });

    console.log("✅ [LOGIN] Response:", res.data);
    return res.data;
  } catch (error) {
    handleApiError(error, "LOGIN");
    throw error;
  }
};

// 👉 Hàm xử lý lỗi chung
const handleApiError = (error, tag) => {
  console.log(`❌ [${tag}] Error:`, error.message);

  if (error.response) {
    console.log(`❌ [${tag}] Status:`, error.response.status);
    console.log(`❌ [${tag}] Data:`, error.response.data);
    console.log(`❌ [${tag}] URL:`, error.response.config.url);
  } else if (error.request) {
    console.log(`⚠️ [${tag}] No response from server.`);
  } else {
    console.log(`⚠️ [${tag}] Setup error:`, error.message);
  }
};
