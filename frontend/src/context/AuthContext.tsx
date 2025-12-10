import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { setAuthStore } from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

export interface AuthContextType {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  setAccessToken: () => {},
  loading: true,
  login: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🔥 IMPORTANT: tell axiosInstance about the store
  useEffect(() => {
    setAuthStore({
      accessToken,
      setAccessToken,
      login,
      logout,
      loading,
    });
  }, [accessToken, loading]);

  useEffect(() => {
    async function refreshToken() {
      try {
        const res = await api.post("/auth/refresh");
        setAccessToken(res.data.accessToken);
      } catch {
        setAccessToken(null); 
      }
      setLoading(false); 
    }

    refreshToken();
  }, []);

  const login = async (email: string, password: string) => {
    const res = await api.post("/auth/login", { email, password });
    setAccessToken(res.data.accessToken);
  };

  const logout = () => {
    setAccessToken(null);
    api.post("/auth/logout");
    navigate("/"); 
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, setAccessToken, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
