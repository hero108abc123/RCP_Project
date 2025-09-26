import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getProfile(token).then(setUser).catch(() => alert("Lỗi lấy thông tin user"));
    }
  }, []);

  if (!user) return <p>Đang tải...</p>;

  return (
    <div className="profile-container">
      <h2>Thông tin cá nhân</h2>
      <p><strong>Họ tên:</strong> {user.fullname}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>SĐT:</strong> {user.phone}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <Link to="/" className="back-btn">⬅ Trang chủ</Link>
    </div>
  );
};

export default UserProfile;
