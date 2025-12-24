import React, { useEffect, useState } from "react";
import ScheduleController from "../controllers/ScheduleController";
import "../styles/schedule.css";

function Schedules() {
  const [schedules, setSchedules] = useState([]);
  const [form, setForm] = useState({
    movie: "",
    date: "",
    time: "",
    room: ""
  });

  useEffect(() => {
    loadSchedules();
  }, []);

  const loadSchedules = async () => {
    const data = await ScheduleController.getAll();
    setSchedules(data);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const newSchedule = await ScheduleController.create(form);
    setSchedules(prev => [...prev, newSchedule]);
    setForm({ movie:"", date:"", time:"", room:"" });
  };

  const handleDelete = async id => {
    if (!window.confirm("Xóa suất chiếu này?")) return;
    await ScheduleController.delete(id);
    setSchedules(prev => prev.filter(s => s.id !== id));
  };

  return (
    <div className="schedule-page">
      <h2>🎬 Quản lý Suất Chiếu</h2>

      <form className="schedule-form" onSubmit={handleSubmit}>
        <input name="movie" placeholder="Tên phim" value={form.movie} onChange={handleChange} required />
        <input type="date" name="date" value={form.date} onChange={handleChange} required />
        <input type="time" name="time" value={form.time} onChange={handleChange} required />
        <input name="room" placeholder="Phòng" value={form.room} onChange={handleChange} />
        <button type="submit">➕ Thêm</button>
      </form>

      <table className="schedule-table">
        <thead>
          <tr>
            <th>Phim</th>
            <th>Ngày</th>
            <th>Giờ</th>
            <th>Phòng</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {schedules.map(s => (
            <tr key={s.id}>
              <td>{s.movie}</td>
              <td>{s.date}</td>
              <td>{s.time}</td>
              <td>{s.room}</td>
              <td>
                <button className="btn-delete" onClick={() => handleDelete(s.id)}>
                  ❌
                </button>
              </td>
            </tr>
          ))}
          {schedules.length === 0 && (
            <tr>
              <td colSpan="5" className="empty">Chưa có suất chiếu</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Schedules;
