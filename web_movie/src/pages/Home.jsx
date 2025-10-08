// src/pages/Home.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  InputBase,
  Box,
  Button,
} from "@mui/material";
import { Menu as MenuIcon, AccountCircle, Search as SearchIcon } from "@mui/icons-material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../pages/home.css";

// Local assets (thay picsum bằng ảnh local của bạn)
import logo from "../assets/cgv_logo.jpg";
import poster1 from "../assets/poster1.jpg";
import poster2 from "../assets/poster2.jpg";
import poster3 from "../assets/poster3.jpg";
import poster4 from "../assets/poster4.jpg";
import poster5 from "../assets/poster5.jpg";
import poster6 from "../assets/poster6.jpg";
import poster7 from "../assets/poster7.jpg";
import poster8 from "../assets/poster8.jpg";

export default function Home() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const posterUrls = [poster1, poster2, poster3, poster4];

  const hotMovies = [
    { id: 1, title: "Sát thủ", time: "19:30", img: poster1 },
    { id: 2, title: "Học viện siêu anh hùng", time: "21:00", img: poster2 },
    { id: 3, title: "Tokyo Ghoul", time: "17:45", img: poster3 },
  ];

  const newMovies = [
    { id: 4, title: "Phim Mới A", time: "18:00", img: poster4 },
    { id: 5, title: "Phim Mới B", time: "20:10", img: poster5 },
    { id: 6, title: "Phim Mới C", time: "16:30", img: poster6 },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: false,
  };

  return (
    <div className="home-wrapper">

      {/* H1: logo */}
      <header className="home-header-top">
        <img src={logo} alt="logo" className="home-logo" />
      </header>

      {/* H2: navigation row (below logo) */}
      <AppBar position="static" className="home-nav-bar" elevation={0}>
        <Toolbar className="home-toolbar">
          <div className="nav-left">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setDrawerOpen(true)}
              size="large"
            >
              <MenuIcon />
            </IconButton>
          </div>

          <div className="nav-right">
            <div className="search-wrapper">
              <SearchIcon className="search-icon" />
              <InputBase
                placeholder="Tìm phim, rạp, diễn viên..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="search-input"
              />
            </div>

            <IconButton
              color="inherit"
              onClick={() => navigate("/login")}
              className="login-icon"
              size="large"
              aria-label="login"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      {/* Drawer menu (phimhot, hotline) */}
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 240 }} role="presentation" onClick={() => setDrawerOpen(false)}>
          <List>
            <ListItem button onClick={() => navigate("/phimhot")}>
              <ListItemText primary="Phim Hot" />
            </ListItem>
            <ListItem button onClick={() => navigate("/hotline")}>
              <ListItemText primary="Hotline" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* H3: poster slider */}
      <section className="poster-section">
        <div className="poster-slider">
          <Slider {...sliderSettings}>
            {posterUrls.map((u, idx) => (
              <div key={idx} className="poster-slide">
                <img src={u} alt={`poster-${idx}`} />
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* H4: Phim hot */}
      <section className="section">
        <h2 className="section-title">Phim Hot</h2>

        {/* H5: 3 movie cards */}
        <div className="movie-grid">
          {hotMovies.map((m) => (
            <div key={m.id} className="movie-card">
              <img src={m.img} alt={m.title} />
              <div className="movie-meta">
                <h3 className="movie-title">{m.title}</h3>
                <p className="movie-time">{m.time}</p>
                <Button variant="contained" size="small" onClick={() => navigate("/chitiet")}>
                  Chi tiết
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* H6: Phim mới */}
      <section className="section">
        <h2 className="section-title">Phim Mới</h2>

        {/* H7: 3 movie cards */}
        <div className="movie-grid">
          {newMovies.map((m) => (
            <div key={m.id} className="movie-card">
              <img src={m.img} alt={m.title} />
              <div className="movie-meta">
                <h3 className="movie-title">{m.title}</h3>
                <p className="movie-time">{m.time}</p>
                <Button variant="contained" size="small" onClick={() => navigate("/chitiet")}>
                  Chi tiết
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer quick links */}
      <footer className="home-footer">
        <div className="footer-inner">
          <span>© 2025 YourCinema</span>
          <div className="footer-links">
            <button onClick={() => navigate("/hotline")} className="link-btn">Hotline</button>
            <button onClick={() => navigate("/phimhot")} className="link-btn">Phim Hot</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
