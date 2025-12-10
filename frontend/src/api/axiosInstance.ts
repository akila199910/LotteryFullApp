import axios, { AxiosError } from "axios";
import type { AuthContextType } from "../context/AuthContext";


let store: AuthContextType | null = null;

// Allow AuthContext to register itself
export const setAuthStore = (authStore: AuthContextType) => {
  store = authStore;
};

const api = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    if (store?.accessToken) {
      config.headers.Authorization = `Bearer ${store.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await api.post("/auth/refresh");

        const newAccessToken = refreshResponse.data.accessToken;

        store?.setAccessToken(newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshErr) {
        console.warn("Refresh token failed → Logging out");
        store?.logout?.();
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
