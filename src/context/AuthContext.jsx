import React from "react";
import { createContext, useState, useContext } from "react";

const AuthContext = createContext()

const AuthProvider = ({children}) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const login = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };
  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };
  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
