import React from "react";
import "../../styles/movie.css";

function MovieDetail({ movie, onClose }) {
  if (!movie) return null;

  return (
    <div className="movie-detail-overlay">
      <div className="movie-detail">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>{movie.tenPhim}</h2>
        <p><strong>Mô tả:</strong> {movie.moTa}</p>
        <p><strong>Đạo diễn:</strong> {movie.daoDien}</p>
        <p><strong>Diễn viên:</strong> {movie.dienVien}</p>
        <p><strong>Thời lượng:</strong> {movie.thoiLuongPhut} phút</p>
        <p><strong>Ngày khởi chiếu:</strong> {new Date(movie.ngayKhoiChieu).toLocaleDateString()}</p>
        <p><strong>Ngôn ngữ:</strong> {movie.ngonNgu}</p>
        <p><strong>Phân loại độ tuổi:</strong> {movie.phanLoaiDoTuoi}</p>
        <p><strong>Thể loại IDs:</strong> {movie.theLoaiIds.join(", ")}</p>
        {movie.trailerFile && <video src={movie.trailerFile} controls width="100%"/>}
        {movie.anhBia && <img src={movie.anhBia} alt={movie.tenPhim} style={{width:"100%", marginTop:"10px"}} />}
      </div>
    </div>
  );
}

export default MovieDetail;
