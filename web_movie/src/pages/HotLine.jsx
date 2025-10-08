import React from "react";
import { useNavigate } from "react-router-dom";

export default function Hotline() {
  const navigate = useNavigate();

  return (
    <div style={pageStyle}>
      <h1>☎️ Hotline</h1>
      <p>Liên hệ hỗ trợ: 1900-1234 (24/7)</p>

      <button style={buttonStyle} onClick={() => navigate("/home")}>
        ⬅️ Quay lại Home
      </button>
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "linear-gradient(to bottom, #1e1e1e, #000)",
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
  background: "#9c27b0",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px",
};
