import React, { useState } from "react";
import "../styles/movies.css";
// import "../styles/movie_details.css";

function Movies() {
  const [movies, setMovies] = useState([
    { 
      id: 1, 
      tenPhim: "Avengers", 
      theLoai: ["Action"], 
      status: "Đang chiếu", 
      moTa: "Siêu anh hùng hội tụ", 
      daoDien: "Joss Whedon", 
      dienVien: "Robert Downey Jr., Chris Evans", 
      thoiLuongPhut: 143, 
      ngayKhoiChieu: "2025-11-15", 
      ngonNgu: "English", 
      phanLoaiDoTuoi: "13+", 
      trailerFile: "", 
      anhBia: "" 
    },
    { 
      id: 2, 
      tenPhim: "Titanic", 
      theLoai: ["Romance"], 
      status: "Sắp chiếu", 
      moTa: "Câu chuyện tình yêu trên con tàu Titanic", 
      daoDien: "James Cameron", 
      dienVien: "Leonardo DiCaprio, Kate Winslet", 
      thoiLuongPhut: 195, 
      ngayKhoiChieu: "2025-12-01", 
      ngonNgu: "English", 
      phanLoaiDoTuoi: "PG-13", 
      trailerFile: "", 
      anhBia: "" 
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
  };

  return (
    <div className="movies-page">
      <div className="movie-list">
        <h2>Danh sách Phim</h2>
        <table>
          <thead>
            <tr>
              <th>Tên phim</th>
              <th>Thể loại</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {movies.map(movie => (
              <tr 
                key={movie.id} 
                onClick={() => handleSelectMovie(movie)}
                className={selectedMovie?.id === movie.id ? "selected" : ""}
              >
                <td>{movie.tenPhim}</td>
                <td>{movie.theLoai.join(", ")}</td>
                <td>{movie.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedMovie && (
        <div className="movie-detail">
          <h2>Chi tiết phim: {selectedMovie.tenPhim}</h2>
          <p><strong>Thể loại:</strong> {selectedMovie.theLoai.join(", ")}</p>
          <p><strong>Trạng thái:</strong> {selectedMovie.status}</p>
          <p><strong>Mô tả:</strong> {selectedMovie.moTa}</p>
          <p><strong>Đạo diễn:</strong> {selectedMovie.daoDien}</p>
          <p><strong>Diễn viên:</strong> {selectedMovie.dienVien}</p>
          <p><strong>Thời lượng:</strong> {selectedMovie.thoiLuongPhut} phút</p>
          <p><strong>Ngày khởi chiếu:</strong> {selectedMovie.ngayKhoiChieu}</p>
          <p><strong>Ngôn ngữ:</strong> {selectedMovie.ngonNgu}</p>
          <p><strong>Phân loại độ tuổi:</strong> {selectedMovie.phanLoaiDoTuoi}</p>
          {selectedMovie.anhBia && <img src={selectedMovie.anhBia} alt={selectedMovie.tenPhim} />}
          {selectedMovie.trailerFile && (
            <video controls src={selectedMovie.trailerFile}></video>
          )}
        </div>
      )}
    </div>
  );
}

export default Movies;
