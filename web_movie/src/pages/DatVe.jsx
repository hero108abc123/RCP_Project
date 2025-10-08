import React from "react";
import { useNavigate } from "react-router-dom";

export default function DatVe() {
  const navigate = useNavigate();

  return (
    <div style={pageStyle}>
      <h1>🎟️ Trang Đặt Vé</h1>
      <p>Chức năng đặt vé phim — chỉ dành cho người đã đăng nhập.</p>

      <button style={buttonStyle} onClick={() => navigate("/home")}>
        ⬅️ Quay lại Home
      </button>
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "linear-gradient(to bottom, #1b1b1b, #000)",
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "Roboto, sans-serif",
};

const buttonStyle = {
  marginTop: "20px",
  padding: "10px 20px",
  background: "#2196f3",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px",
};
