import React, { useState, useEffect } from "react";
import UsersController from "../controllers/UserController.jsx";
import "../styles/users.css";

function Users() {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await UsersController.getAllUsers();
      // đảm bảo data là mảng
      if (Array.isArray(data)) setUsers(data);
      else setUsers([]);
    } catch (error) {
      console.error("Không lấy được user:", error);
    }
  };

  const handleSelect = id => {
    if (selected.includes(id)) setSelected(prev => prev.filter(s => s !== id));
    else setSelected(prev => [...prev, id]);
  };

  const handleDeleteSelected = async () => {
    if (!selected.length) return;
    if (!window.confirm(`Xóa ${selected.length} user đã chọn?`)) return;

    try {
      await UsersController.deleteUsersByIds(selected);
      fetchUsers();
      setSelected([]);
    } catch (error) {
      console.error("Xóa thất bại:", error);
    }
  };

  const handleRoleChange = async (id, role) => {
    try {
      await UsersController.updateRole(id, role);
      fetchUsers();
    } catch (error) {
      console.error("Cập nhật role thất bại:", error);
    }
  };

  return (
    <div className="page-content">
      <h2>Quản lý Người dùng</h2>

      {selected.length > 0 && (
        <button onClick={handleDeleteSelected}>
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
            <th>Fullname</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id} className={selected.includes(u.id) ? "selected" : ""}>
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
                <select
                  value={u.role}
                  onChange={e => handleRoleChange(u.id, e.target.value)}
                >
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
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
