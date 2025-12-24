import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../views/Login.jsx";
// import Register from "../views/Register.jsx";
import Dashboard from "../views/Dashboard.jsx";
import Users from "../views/Users.jsx";
import Movies from "../views/Movies.jsx";
import Schedules from "../views/Schedules.jsx";
import Profile from "../views/Profile.jsx";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/schedules" element={<Schedules />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}
