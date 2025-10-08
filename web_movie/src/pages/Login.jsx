import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Box,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "./login.css";
import bannerLogin from "../assets/banner_login.jpg";
import nenLogin from "../assets/nen_login.jpg";

export default function Login() {
  const { handleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await handleLogin(username, password);
      navigate("/home"); // ✅ Login thành công → Home
    } catch {
      alert("Đăng nhập thất bại, vui lòng thử lại!");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-left">
        <img src={nenLogin} alt="login background" className="left-image" />
      </div>

      <div className="login-right">
        <div className="login-container">
          <img src={bannerLogin} alt="banner" className="login-banner" />
          <Typography variant="h6" align="center" sx={{ fontWeight: "bold", mt: 1 }}>
            Đăng nhập
          </Typography>

          <form onSubmit={submit} className="login-form">
            <TextField
              label="Email hoặc số điện thoại"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Mật khẩu"
              type={showPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button type="submit" fullWidth variant="contained" className="login-btn">
              Đăng nhập
            </Button>
          </form>

          <div className="login-links">
            <a href="#">Quên mật khẩu?</a>
            <Typography variant="body2" sx={{ color: "#666" }}>hoặc</Typography>
            <Button
              variant="contained"
              fullWidth
              className="register-btn"
              onClick={() => navigate("/register")}
            >
              Đăng ký tài khoản
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
