import { createContext, useContext, useState } from "react";
import { postData } from "../../services/api";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("user"));

  const login = async (email, password) => {
    const response = await postData(`/auth/login`, {
      email: email,
      password: password,
    });
    const token = response.token;
    localStorage.setItem("user", token);
    setUser(token);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
