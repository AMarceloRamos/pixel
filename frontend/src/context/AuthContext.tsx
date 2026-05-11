import { createContext, useContext, useEffect, useState } from "react";
import { getUserFromToken } from "../utils/auth";

type User = {
  id: string;
  email: string;
  userName: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);

useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    setUser(getUserFromToken());
  }
}, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setUser(getUserFromToken());
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);