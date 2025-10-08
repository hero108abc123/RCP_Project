import React from "react";
import { useNavigate } from "react-router-dom";

export default function PhimHot() {
  const navigate = useNavigate();

  return (
    <div style={pageStyle}>
      <h1>🔥 Phim Hot</h1>
      <p>Các bộ phim hot nhất hiện nay!</p>

      <button style={buttonStyle} onClick={() => navigate("/home")}>
        ⬅️ Quay lại Home
      </button>
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "linear-gradient(to bottom, #2c2c2c, #000)",
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
  background: "#e91e63",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px",
};
