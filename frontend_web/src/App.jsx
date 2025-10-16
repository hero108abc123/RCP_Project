import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import UserProfile from "./components/UserProfile";
import UserManagement from "./components/UserManagement";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/admin/users" element={<UserManagement />} />


          {/* Trang chủ */}
          <Route
            path="*"
            element={
              <div className="home">
                <h1>🎬 Web Đặt Vé Xem Phim</h1>
                <nav>
                  <Link to="/login">Đăng nhập</Link> |{" "}
                  <Link to="/register">Đăng ký</Link> |{" "}
                  <Link to="/profile">Trang cá nhân</Link> |{" "}
                  <Link to="/admin/users">Quản lý người dùng</Link>
                </nav>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
