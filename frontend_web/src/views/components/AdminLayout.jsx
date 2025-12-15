import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import "../../styles/layout.css";

function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("token_expires_at");
    navigate("/admin/login");
  };

  return (
    <div className="admin-layout">
      {/* Sidebar cố định */}
      <Sidebar />

      <div className="main-area">
        {/* Navbar trên cùng */}
        <Navbar onLogout={handleLogout} />

        {/* Nội dung chính */}
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
