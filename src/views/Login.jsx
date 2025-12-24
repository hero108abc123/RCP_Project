import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../services/auth-api";
import "../styles/login.css";

function LoginAdmin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await auth.login(username, password);
      if (res.access_token) {
        localStorage.setItem("access_token", res.access_token);
        localStorage.setItem("refresh_token", res.refresh_token || "");
        navigate("/"); // Chuyển tới Dashboard
      } else {
        alert("❌ Sai thông tin đăng nhập hoặc không nhận được token.");
      }
    } catch (err) {
      alert(
        "Đăng nhập thất bại: " +
          (err.response?.data?.error_description || err.message)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="text"
          placeholder="Tên đăng nhập"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </form>
    </div>
  );
}

export default LoginAdmin;
