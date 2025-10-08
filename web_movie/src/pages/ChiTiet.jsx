import React from "react";
import { useNavigate } from "react-router-dom";

export default function ChiTiet() {
  const navigate = useNavigate();

  return (
    <div style={pageStyle}>
      <h1>📄 Chi Tiết Phim</h1>
      <p>Xem thông tin chi tiết của bộ phim bạn chọn.</p>

      <button style={buttonStyle} onClick={() => navigate("/home")}>
        ⬅️ Quay lại Home
      </button>
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "linear-gradient(to bottom, #222, #000)",
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
  background: "#ffc107",
  color: "black",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px",
};
