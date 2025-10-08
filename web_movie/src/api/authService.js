import api from "../utils/axiosConfig";

// LOGIN - OpenIddict password flow
export const login = async (username, password) => {
  const data = new URLSearchParams({
    client_id: "client-web",
    client_secret: "mBSQUHmZ4be5bQYfhwS7hjJZ2zFOCU2e",
    grant_type: "password",
    username,
    password,
  });
  const res = await api.post("/connect/token", data);
  return res.data;
};

// REGISTER
export const register = async (user) => {
  const res = await api.post("/api/app/user/register", user);
  return res.data;
};
