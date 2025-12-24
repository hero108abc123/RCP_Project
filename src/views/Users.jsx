// src/views/Users.jsx
import "../styles/users.css";
import { UserController } from "../controllers/UserController";

function Users() {
  const {
    users,
    selected,
    toggleSelect,
    deleteSelected,
    changeRole,
    selectAll
  } = UserController();

  return (
    <div className="page-content">
      <h2>Quản lý Người dùng</h2>

      {selected.length > 0 && (
        <button onClick={deleteSelected}>
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
                onChange={e => selectAll(e.target.checked)}
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
            <tr
              key={u.id}
              className={selected.includes(u.id) ? "selected" : ""}
            >
              <td>
                <input
                  type="checkbox"
                  checked={selected.includes(u.id)}
                  onChange={() => toggleSelect(u.id)}
                />
              </td>
              <td>{u.username}</td>
              <td>{u.fullname}</td>
              <td>{u.email}</td>
              <td>
                <select
                  value={u.role}
                  onChange={e => changeRole(u.id, e.target.value)}
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
