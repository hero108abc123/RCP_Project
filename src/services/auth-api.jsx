import apiClient from "./api-client";

// Endpoints OpenIddict
const endpoints = {
  login: "/connect/token",
  profile: "/api/app/user",
};

export const auth = {
  // ✅ Login
  login: async (username, password) => {
    const params = new URLSearchParams();
    params.append("grant_type", process.env.REACT_APP_AUTH_GRANT_TYPE);
    params.append("client_id", process.env.REACT_APP_AUTH_CLIENT_ID);
    params.append("client_secret", process.env.REACT_APP_AUTH_CLIENT_SECRET);
    params.append("username", username);
    params.append("password", password);
    params.append("scope", process.env.REACT_APP_AUTH_SCOPE);

    try {
      const res = await apiClient.post(endpoints.login, params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "text/plain", // OpenIddict yêu cầu
        },
      });

      if (res.data.access_token) {
        localStorage.setItem("access_token", res.data.access_token);
        localStorage.setItem("refresh_token", res.data.refresh_token || "");
        localStorage.setItem(
          "token_expires_at",
          (Date.now() + res.data.expires_in * 1000).toString()
        );
      }

      return res.data;
    } catch (error) {
      console.error(
        "❌ [AUTH LOGIN ERROR]",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  // ✅ Lấy profile
  getProfile: async () => {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("No access token found");

    try {
      const res = await apiClient.get(endpoints.profile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      console.error(
        "❌ [AUTH GET PROFILE ERROR]",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  // ✅ Logout
  logout: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("token_expires_at");
  },
};
