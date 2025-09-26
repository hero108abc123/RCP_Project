import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await login(data.username, data.password);
      localStorage.setItem("token", res.access_token);
      alert("Đăng nhập thành công!");
      navigate("/profile");
    } catch (err) {
      console.error("Login failed:", err);
      alert("Sai tài khoản hoặc mật khẩu!");
    }
  };

  return (
    <div className="auth-container">
      <div className="form-wrapper">
        <h2>Đăng nhập</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group">
            <label>Tài khoản</label>
            <input
              type="text"
              {...register("username", { required: true })}
              placeholder="Nhập tài khoản"
            />
          </div>
          <div className="input-group">
            <label>Mật khẩu</label>
            <input
              type="password"
              {...register("password", { required: true })}
              placeholder="Nhập mật khẩu"
            />
          </div>
          <button type="submit" className="submit-btn">
            Đăng nhập
          </button>
          <p>
            Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
