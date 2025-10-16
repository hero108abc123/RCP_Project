import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginAdmin from "./views/Login.jsx";
import Dashboard from "./views/Dashboard.jsx";
import UserManagement from "./views/Users.jsx";
// import ProtectedRoute from "./views/components/ProtectedRoute.jsx";
import Movies from "./views/Movies.jsx";

function App() {
  return (
    <Router>
      <Routes>
        
        {/* <Route path="/admin/login" element={<LoginAdmin />} /> */}

        {/* Dashboard */}
        <Route 
          path="/" 
          element={
            // <ProtectedRoute>
              <Dashboard />
            // </ProtectedRoute>
          } 
        />

        {/* User Management */}
        <Route 
          path="/users" 
          element={
            // <ProtectedRoute>
              <UserManagement />
            // </ProtectedRoute>
          } 
        />
        <Route path="/movies" element={<Movies />} />
      </Routes>
    </Router>
  );
}

export default App;
