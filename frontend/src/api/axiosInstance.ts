import axios, { AxiosError } from "axios";
import type { AuthContextType } from "../context/AuthContext";

let store: AuthContextType | null = null;

export const setAuthStore = (authStore: AuthContextType) => {
  store = authStore;
};

const api = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL,
  withCredentials: true,
});

// Add access token to headers
api.interceptors.request.use(
  (config) => {
    if (store?.accessToken) {
      config.headers.Authorization = `Bearer ${store.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle refresh logic
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    if (!store?.accessToken) {
      return Promise.reject(error);
    }
    // Access token expired → try refresh once
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await api.post("/auth/refresh");
        const newToken = refreshResponse.data.accessToken;

        store?.setAccessToken(newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return api(originalRequest);
      } catch (refreshErr) {
        store?.logout?.(); // log out the user
        return Promise.reject(refreshErr); // STOP LOOP
      }
    }

    return Promise.reject(error);
  }
);

export default api;
