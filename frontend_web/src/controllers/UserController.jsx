// src/controllers/UsersController.js
import apiClient from "../services/api-client.jsx"; // <- import axios instance


class UserController {
  constructor() {
    // ✅ Data cứng
    this.users = [
      { id: 1, username: "admin", fullname: "Admin", email: "admin@example.com", role: "Admin" },
      { id: 2, username: "khanhne", fullname: "Nguyen Xuan Khanh", email: "khanhne@gmail.com", role: "Admin" },
      { id: 3, username: "user1", fullname: "Lê Văn C", email: "user1@example.com", role: "User" },
    ];
  }

  // Lấy tất cả user
  async getAllUsers() {
    return [...this.users]; // trả về bản sao để tránh mutate trực tiếp
  }

  // Thêm user
  async addUser(user) {
    const newUser = { ...user, id: Date.now() };
    this.users.push(newUser);
    return newUser;
  }

  // Xóa user theo id
  async deleteUsersByIds(ids = []) {
    this.users = this.users.filter(u => !ids.includes(u.id));
  }

  // Cập nhật role
  async updateRole(id, role) {
    const index = this.users.findIndex(u => u.id === id);
    if (index !== -1) this.users[index].role = role;
    return this.users[index];
  }
}
// class UserController {
//   async getAllUsers() {
//     const res = await apiClient.get("/api/app/user"); // endpoint từ Swagger
//     return res.data;
//   }

//   async addUser(user) {
//     const res = await apiClient.post("/users", user);
//     return res.data;
//   }

//   async deleteUsersByIds(ids = []) {
//     const promises = ids.map(id => apiClient.delete(`/users/${id}`));
//     await Promise.all(promises);
//   }

//   async updateRole(id, role) {
//     const res = await apiClient.put(`/users/${id}`, { role });
//     return res.data;
//   }
// }

// Gán instance vào biến rồi export
const usersControllerInstance = new UserController();
export default usersControllerInstance;
