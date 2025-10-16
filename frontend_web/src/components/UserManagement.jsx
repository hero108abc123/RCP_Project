import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUsers(token).then(setUsers).catch(() => alert("Bạn không có quyền xem danh sách user"));
    }
  }, []);

  return (
    <div className="management-container">
      <h2>Quản lý người dùng</h2>
      <table className="user-table">
        <thead>
          <tr><th>ID</th><th>Họ tên</th><th>Email</th><th>Role</th></tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.fullname}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/" className="back-btn">⬅ Trang chủ</Link>
    </div>
  );
};

export default UserManagement;
