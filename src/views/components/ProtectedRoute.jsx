import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("access_token"); // phải trùng với key lưu token
  if (!token) return <Navigate to="/admin/login" replace />; 
  return children;
}

export default ProtectedRoute;
