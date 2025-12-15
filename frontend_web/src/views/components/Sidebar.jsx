import React from "react";
import { Link } from "react-router-dom";
import "../../styles/components.css";
import "../../styles/sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/movies">Quản lý phim</Link></li>
        <li><Link to="/users">Người dùng</Link></li>
        <li><Link to="/schedules">Suất chiếu</Link></li>
        <li><Link to="/profile">Hồ sơ</Link></li>
      </ul>
    </aside>
  );
}

export default Sidebar;
