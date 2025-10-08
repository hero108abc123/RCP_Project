import { createContext, useState, useEffect } from "react";
import { login } from "../api/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("access_token"));

  const handleLogin = async (username, password) => {
    const data = await login(username, password);
    setToken(data.access_token);
    localStorage.setItem("access_token", data.access_token);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("access_token");
  };

  return (
    <AuthContext.Provider value={{ token, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
