import React, { useEffect, useState } from "react";


const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getProfile(token)
        .then(res => setUser(res))
        .catch(err => console.error(err));
    }
  }, []);

  if (!user) return <p>Đang tải thông tin...</p>;

  return (
    <div className="profile-container">
      <h2>Thông tin cá nhân</h2>
      <p><b>Tên:</b> {user.fullName}</p>
      <p><b>Email:</b> {user.email}</p>
      <p><b>SĐT:</b> {user.phoneNumBer}</p>
    </div>
  );
};

export default Profile;
