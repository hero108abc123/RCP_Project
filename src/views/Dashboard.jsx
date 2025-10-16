import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import CardStats from "./components/CardStats.jsx";
import "../styles/dashboard.css";
import { Link } from "react-router-dom";

function Dashboard() {
  const [stats, setStats] = useState({ users: 0, movies: 0, schedules: 0 });

  useEffect(() => {
    setStats({ users: 42, movies: 15, schedules: 10 });
  }, []);

  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <h2>Tổng quan hệ thống</h2>
        <div className="stats-container">
        <Link to="/users">
        <CardStats title="Người dùng" value={stats.users} icon="👥" />
        </Link>
          
        <Link to="/movies"> 
        <CardStats title="Phim" value={stats.movies} icon="🎬" />
         </Link>
          
          <Link to="/schedules"> 
        <CardStats title="Suất chiếu" value={stats.schedules} icon="🕒" />
         </Link>
          
          
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
