import React, { useState, useEffect } from "react";
import "../styles/schedule.css";
import { ScheduleApi } from "../services/scheduleApi";

function Schedules() {
  const [schedules, setSchedules] = useState([]);
  const [form, setForm] = useState({ movie:"", date:"", time:"", room:"" });

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const data = await ScheduleApi.getAll();
      setSchedules(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await ScheduleApi.create(form);
      setForm({ movie:"", date:"", time:"", room:"" });
      fetchSchedules();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async id => {
    if(!window.confirm("Xóa suất chiếu này?")) return;
    try {
      await ScheduleApi.delete(id);
      fetchSchedules();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="schedule-management">
      <h2>Quản lý Suất Chiếu</h2>
      <form className="schedule-form" onSubmit={handleSubmit}>
        <input name="movie" placeholder="Movie" value={form.movie} onChange={handleChange} required />
        <input type="date" name="date" value={form.date} onChange={handleChange} required />
        <input type="time" name="time" value={form.time} onChange={handleChange} required />
        <input name="room" placeholder="Room" value={form.room} onChange={handleChange} />
        <button type="submit">Thêm Suất Chiếu</button>
      </form>

      <table className="schedule-table">
        <thead>
          <tr>
            <th>Movie</th>
            <th>Date</th>
            <th>Time</th>
            <th>Room</th>
            <th>Action</th>
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
                <button onClick={() => handleDelete(s.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Schedules;
