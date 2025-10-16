import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api";

const Register = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      // convert date input (yyyy-mm-dd) -> ISO datetime
      const isoBirthday = data.birthDay ? new Date(data.birthDay).toISOString() : null;

      const payload = {
        userName: data.userName,
        fullName: data.fullName,
        email: data.email,
        phoneNumBer: data.phoneNumBer,
        birthDay: isoBirthday, // ISO format
        password: data.password,
      };

      console.log("Payload sắp gửi:", payload); // kiểm tra ở console trước khi gửi

      const res = await registerUser(payload);

      console.log("Register response:", res);
      // tùy backend trả về gì, bạn xử lý tiếp
      alert("Đăng ký gửi thành công (xem console/Network để kiểm tra response).");
      // nếu bạn muốn redirect sau khi đăng ký:
      // navigate("/login");
    } catch (err) {
      // hiển thị lỗi chi tiết nếu có response từ server
      console.error("Register failed:", err.response?.data || err.message);
      alert("Đăng ký thất bại. Xem console để biết chi tiết.");
    }
  };

  return (
    <div className="auth-container">
      <div className="form-wrapper">
        <h2>Đăng ký</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group">
            <label>Tên đăng nhập</label>
            <input type="text" {...register("userName", { required: "Bắt buộc" })} />
            {errors.userName && <span className="error">{errors.userName.message}</span>}
          </div>

          <div className="input-group">
            <label>Họ và tên</label>
            <input type="text" {...register("fullName", { required: "Bắt buộc" })} />
            {errors.fullName && <span className="error">{errors.fullName.message}</span>}
          </div>

          <div className="input-group">
            <label>Số điện thoại</label>
            <input type="tel" {...register("phoneNumBer", { required: "Bắt buộc" })} />
            {errors.phoneNumBer && <span className="error">{errors.phoneNumBer.message}</span>}
          </div>

          <div className="input-group">
            <label>Email</label>
            <input type="email" {...register("email", { required: "Bắt buộc" })} />
            {errors.email && <span className="error">{errors.email.message}</span>}
          </div>

          <div className="input-group">
            <label>Ngày sinh</label>
            <input type="date" {...register("birthDay", { required: "Bắt buộc" })} />
            {errors.birthDay && <span className="error">{errors.birthDay.message}</span>}
          </div>

          <div className="input-group">
            <label>Mật khẩu</label>
            <input type="password" {...register("password", { required: "Bắt buộc", minLength: { value: 6, message: "Ít nhất 6 ký tự" } })} />
            {errors.password && <span className="error">{errors.password.message}</span>}
          </div>

          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? "Đang gửi..." : "Đăng ký"}
          </button>

          <p>Đã có tài khoản? <Link to="/login">Đăng nhập</Link></p>
        </form>
      </div>

      <div className="right-panel">
        <div className="content">
          <h2>Tham gia ngay!</h2>
          <p>Đăng ký để đặt vé xem phim nhanh chóng 🎬</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
