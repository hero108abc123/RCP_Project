import axios from "axios";

const API_URL = "https://localhost:7144";

// ==== Đăng nhập ====
export const login = async (username, password) => {
  const params = new URLSearchParams();
  params.append("grant_type", "password");
  params.append("client_id", "default-client"); // trùng với seed backend
  params.append("username", username);
  params.append("password", password);

  const res = await axios.post(`${API_URL}/connect/token`, params, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  return res.data;
};

// ==== Đăng ký ====
export const registerUser = async (data) => {
  const res = await axios.post(`${API_URL}/api/app/user/register`, data, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};


