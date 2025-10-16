import api from "../services/api.js";
import User from "../models/UserModel.js";

export const UserController = {
  getAllUsers: async () => {
    const res = await api.get("/users");
    return res.data.map(u => new User(u.id, u.name, u.email, u.role));
  },
  deleteUser: async (id) => await api.delete(`/users/${id}`)
};
