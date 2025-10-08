import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/authService";
import {
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "./register.css";
import registerBanner from "../assets/register_banner.jpg";
import nenRegister from "../assets/nen_register.jpg";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    userName: "",
    fullName: "",
    email: "",
    phoneNumBer: "",
    password: "",
    birthDay: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      setMessage("🎉 Đăng ký thành công! Đang chuyển sang đăng nhập...");
      setTimeout(() => navigate("/login"), 2000);
    } catch {
      setMessage("⚠️ Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.");
    }
  };

  return (
    <Box className="register-wrapper">
      <Box className="register-left">
        <img src={nenRegister} alt="Background" className="left-image" />
      </Box>

      <Box className="register-right">
        <Box className="register-container">
          <img src={registerBanner} alt="Register Banner" className="register-banner" />

          <Typography variant="h5" sx={{ mb: 2 }}>
            Tạo tài khoản
          </Typography>

          <form onSubmit={handleSubmit} className="register-form">
            <TextField name="userName" label="Tên đăng nhập" fullWidth onChange={handleChange} />
            <TextField name="fullName" label="Họ và tên" fullWidth onChange={handleChange} />
            <TextField name="email" label="Email" fullWidth onChange={handleChange} />
            <TextField name="phoneNumBer" label="Số điện thoại" fullWidth onChange={handleChange} />
            <TextField
              name="password"
              label="Mật khẩu"
              type={showPassword ? "text" : "password"}
              fullWidth
              onChange={handleChange}
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
            <TextField
              name="birthDay"
              label="Ngày sinh"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
            />

            <Button type="submit" fullWidth variant="contained" className="register-btn">
              Đăng ký
            </Button>
          </form>

          {message && (
            <Typography sx={{ mt: 2, fontSize: "14px", color: "#444" }}>
              {message}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}
