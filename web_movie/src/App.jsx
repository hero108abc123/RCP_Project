import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// ==== Các trang chính ====
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import DatVe from "./pages/DatVe";
import PhimHot from "./pages/PhimHot";
import Hotline from "./pages/Hotline";
import ChiTiet from "./pages/ChiTiet";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* ==== LOGIN & REGISTER ==== */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ==== HOME ==== */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          {/* ==== ĐẶT VÉ ==== */}
          <Route
            path="/datve"
            element={
              <ProtectedRoute>
                <DatVe />
              </ProtectedRoute>
            }
          />

          {/* ==== CÁC TRANG PHỤ ==== */}
          <Route path="/phimhot" element={<PhimHot />} />
          <Route path="/hotline" element={<Hotline />} />
          <Route path="/chitiet" element={<ChiTiet />} />

          {/* ==== DEFAULT ==== */}
          <Route path="/" element={<Home />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
