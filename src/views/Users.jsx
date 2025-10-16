import React, { useState } from "react";
import "../styles/users.css";

function Users() {
  const [users, setUsers] = useState([
    { id: 1, username: "admin", fullname: "Admin User", email: "admin@example.com", role: "Admin" },
    { id: 2, username: "staff1", fullname: "Staff One", email: "staff1@example.com", role: "Staff" },
    { id: 3, username: "user1", fullname: "User One", email: "user1@example.com", role: "User" },
  ]);

  const [selected, setSelected] = useState([]);
  const [form, setForm] = useState({ username: "", fullname: "", email: "", role: "User" });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAdd = e => {
    e.preventDefault();
    const newUser = { ...form, id: Date.now() };
    setUsers(prev => [...prev, newUser]);
    setForm({ username: "", fullname: "", email: "", role: "User" });
  };

  const handleDeleteSelected = () => {
    if (!selected.length) return;
    if (!window.confirm(`Xóa ${selected.length} user đã chọn?`)) return;
    setUsers(prev => prev.filter(u => !selected.includes(u.id)));
    setSelected([]);
  };

  const handleSelect = id => {
    if (selected.includes(id)) setSelected(prev => prev.filter(s => s !== id));
    else setSelected(prev => [...prev, id]);
  };

  const handleRoleChange = (id, newRole) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, role: newRole } : u));
  };

  return (
    <div className="user-management">
      <h2>Quản lý Người dùng</h2>
      <p>Tổng số user: <strong>{users.length}</strong></p>

      <form className="user-form" onSubmit={handleAdd}>
        <input type="text" name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
        <input type="text" name="fullname" placeholder="Full Name" value={form.fullname} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="User">User</option>
          <option value="Admin">Admin</option>
          <option value="Staff">Staff</option>
        </select>
        <button type="submit">Thêm User</button>
      </form>

      {selected.length > 0 && (
        <button className="btn-delete-selected" onClick={handleDeleteSelected}>
          Xóa {selected.length} user đã chọn
        </button>
      )}

      <table className="user-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selected.length === users.length && users.length > 0}
                onChange={e => {
                  if (e.target.checked) setSelected(users.map(u => u.id));
                  else setSelected([]);
                }}
              />
            </th>
            <th>Username</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selected.includes(u.id)}
                  onChange={() => handleSelect(u.id)}
                />
              </td>
              <td>{u.username}</td>
              <td>{u.fullname}</td>
              <td>{u.email}</td>
              <td>
                <select value={u.role} onChange={e => handleRoleChange(u.id, e.target.value)}>
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                  <option value="Staff">Staff</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
