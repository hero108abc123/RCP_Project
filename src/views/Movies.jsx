import React, { useEffect, useState } from "react";
import MovieController from "../controllers/MovieController";
import "../styles/movies.css";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    const data = await MovieController.getAllMovies();
    setMovies(data);
  };

  return (
    <div className="movies-page">
      <div className="movie-list">
        <h2>Danh sách phim</h2>
        <table>
          <thead>
            <tr>
              <th>Tên phim</th>
              <th>Thể loại</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {movies.map(m => (
              <tr
                key={m.id}
                onClick={() => setSelectedMovie(m)}
              >
                <td>{m.tenPhim}</td>
                <td>{m.theLoai.join(", ")}</td>
                <td>{m.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedMovie && (
        <div className="movie-detail">
          <h3>{selectedMovie.tenPhim}</h3>
          <p>{selectedMovie.moTa}</p>
        </div>
      )}
    </div>
  );
}

export default Movies;
