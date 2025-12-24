// src/controllers/useUsersController.js
import { useEffect, useState } from "react";
import * as UserModel from "../models/user.model";

export const UserController = () => {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const data = await UserModel.getAllUsers();
    setUsers(data);
  };

  const toggleSelect = (id) => {
    setSelected(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : [...prev, id]
    );
  };

  const deleteSelected = async () => {
    await UserModel.deleteUsersByIds(selected);
    setSelected([]);
    loadUsers();
  };

  const changeRole = async (id, role) => {
    await UserModel.updateUserRole(id, role);
    loadUsers();
  };

  const selectAll = (checked) => {
    setSelected(checked ? users.map(u => u.id) : []);
  };

  return {
    users,
    selected,
    toggleSelect,
    deleteSelected,
    changeRole,
    selectAll
  };
};
