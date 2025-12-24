// src/models/user.model.js
import apiClient from "../services/api-client";
import User from "./entities/UserModel.jsx";

export const getAllUsers = async () => {
  const res = await apiClient.get("/api/app/user");
  return res.data.map(u => new User(u));
};

export const updateUserRole = async (id, role) => {
  const res = await apiClient.put(`/api/app/user/${id}/role`, { role });
  return new User(res.data);
};

export const deleteUsersByIds = async (ids = []) => {
  await Promise.all(
    ids.map(id => apiClient.delete(`/api/app/user/${id}`))
  );
};
