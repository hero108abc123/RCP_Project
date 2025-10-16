import React from "react";
import "../../styles/components.css";

function Navbar({ onLogout }) {
  return (
    <nav className="navbar">
      <h1>🎬 Movie Admin</h1>
      <button onClick={onLogout} className="btn-logout">Đăng xuất</button>
    </nav>
  );
}

export default Navbar;
