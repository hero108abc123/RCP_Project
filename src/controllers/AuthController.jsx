import api from "../services/api.jsx";

export const AuthController = {
  login: async (username, password) => {
    const res = await api.post("/auth/login", { username, password });
    localStorage.setItem("token", res.data.token);
    return res.data;
  },
  register: async (data) => {
    const res = await api.post("/auth/register", data);
    return res.data;
  },
  getProfile: async () => {
    const res = await api.get("/auth/profile");
    return res.data;
  },
};
