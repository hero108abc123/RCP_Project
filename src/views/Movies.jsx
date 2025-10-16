import React, { useState } from "react";
import "../styles/movies.css";

function Movies() {
  const [movies, setMovies] = useState([
    { id: 1, title: "Avengers", genre: "Action", status: "Đang chiếu" },
    { id: 2, title: "Titanic", genre: "Romance", status: "Sắp chiếu" },
    { id: 3, title: "Inception", genre: "Sci-Fi", status: "Đang chiếu" },
  ]);

  const [selected, setSelected] = useState([]);
  const [form, setForm] = useState({ title: "", genre: "Action", status: "Đang chiếu" });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAdd = e => {
    e.preventDefault();
    const newMovie = { ...form, id: Date.now() };
    setMovies(prev => [...prev, newMovie]);
    setForm({ title: "", genre: "Action", status: "Đang chiếu" });
  };

  const handleSelect = id => {
    if (selected.includes(id)) setSelected(prev => prev.filter(s => s !== id));
    else setSelected(prev => [...prev, id]);
  };

  const handleDeleteSelected = () => {
    if (!selected.length) return;
    if (!window.confirm(`Xóa ${selected.length} phim đã chọn?`)) return;
    setMovies(prev => prev.filter(m => !selected.includes(m.id)));
    setSelected([]);
  };

  const handleGenreChange = (id, newGenre) => {
    setMovies(prev => prev.map(m => m.id === id ? { ...m, genre: newGenre } : m));
  };

  const handleStatusChange = (id, newStatus) => {
    setMovies(prev => prev.map(m => m.id === id ? { ...m, status: newStatus } : m));
  };

  return (
    <div className="movie-management">
      <h2>Quản lý Phim</h2>
      <p>Tổng số phim: <strong>{movies.length}</strong></p>

      <form className="movie-form" onSubmit={handleAdd}>
        <input type="text" name="title" placeholder="Tên phim" value={form.title} onChange={handleChange} required />
        <select name="genre" value={form.genre} onChange={handleChange}>
          <option value="Action">Action</option>
          <option value="Romance">Romance</option>
          <option value="Comedy">Comedy</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Horror">Horror</option>
        </select>
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="Đang chiếu">Đang chiếu</option>
          <option value="Sắp chiếu">Sắp chiếu</option>
          <option value="Ngừng chiếu">Ngừng chiếu</option>
        </select>
        <button type="submit">Thêm Phim</button>
      </form>

      {selected.length > 0 && (
        <button className="btn-delete-selected" onClick={handleDeleteSelected}>
          Xóa {selected.length} phim đã chọn
        </button>
      )}

      <table className="movie-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selected.length === movies.length && movies.length > 0}
                onChange={e => {
                  if (e.target.checked) setSelected(movies.map(m => m.id));
                  else setSelected([]);
                }}
              />
            </th>
            <th>Tên phim</th>
            <th>Thể loại</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {movies.map(m => (
            <tr key={m.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selected.includes(m.id)}
                  onChange={() => handleSelect(m.id)}
                />
              </td>
              <td>{m.title}</td>
              <td>
                <select value={m.genre} onChange={e => handleGenreChange(m.id, e.target.value)}>
                  <option value="Action">Action</option>
                  <option value="Romance">Romance</option>
                  <option value="Comedy">Comedy</option>
                  <option value="Sci-Fi">Sci-Fi</option>
                  <option value="Horror">Horror</option>
                </select>
              </td>
              <td>
                <select value={m.status} onChange={e => handleStatusChange(m.id, e.target.value)}>
                  <option value="Đang chiếu">Đang chiếu</option>
                  <option value="Sắp chiếu">Sắp chiếu</option>
                  <option value="Ngừng chiếu">Ngừng chiếu</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Movies;
