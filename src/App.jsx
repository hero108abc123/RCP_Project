import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginAdmin from "./views/Login.jsx";
import Dashboard from "./views/Dashboard.jsx";
import UserManagement from "./views/Users.jsx";
import Movies from "./views/Movies.jsx";
import ProtectedRoute from "./views/components/ProtectedRoute.jsx";
import AdminLayout from "./views/components/AdminLayout.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Login */}
        <Route path="/admin/login" element={<LoginAdmin />} />

        {/* Admin routes with sidebar */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="movies" element={<Movies />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="schedules" element={<div>Suất chiếu</div>} />
          <Route path="profile" element={<div>Hồ sơ</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
