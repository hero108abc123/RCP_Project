import React from "react";
import { Navigate } from "react-router-dom";

/**
 * ProtectedRoute: bảo vệ route admin
 * Nếu không có token trong localStorage, redirect về login
 */
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("adminToken"); // token admin
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}

export default ProtectedRoute;
