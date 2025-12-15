import api from "../services/api-config";
import qs from "qs";

export const AuthController = {
  login: async (username, password) => {
    const data = qs.stringify({
      username,
      password,
      grant_type: "password",
      client_id: "web_admin",
      client_secret: "mBSQUHmZ4be5bQYfhwS7hjJZ2zFOCU2e",
      scope: "openid profile",
    });

    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "text/plain",
    };

    const res = await api.post("/connect/token", data, { headers });

    if (res.data?.access_token) {
      localStorage.setItem("token", res.data.access_token);
    }

    return res.data;
  },

  getProfile: async () => {
    const token = localStorage.getItem("token");
    const res = await api.get("/api/app/user", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },
};
