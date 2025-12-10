import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { setAuthStore } from "../api/axiosInstance";

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

  useEffect(() => {
    setAuthStore({
      accessToken,
      setAccessToken,
      login: async () => {},
      logout,
      loading,
    });
  }, [accessToken, loading]);

  useEffect(() => {
    async function refreshAccessToken() {
      try {
        const res = await api.post("/auth/refresh");
        setAccessToken(res.data.accessToken);
      } catch {}
      setLoading(false);
    }
    refreshAccessToken();
  }, []);

  const login = async (email: string, password: string) => {
    const res = await api.post("/auth/login", { email, password });

    setAccessToken(res.data.accessToken);
  };

  const logout = () => {
    setAccessToken(null);
    // Optionally call backend to clear cookie
    // api.post("/auth/logout")
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
