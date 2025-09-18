import axios from "axios";
import { tokenStorage } from "./tokenStorage";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "0",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = tokenStorage.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.error("API error:", error.response?.data || error.message);

    if (error.response?.status === 401) {
      const refresh = tokenStorage.getRefreshToken();
      if (refresh) {
        try {
          const res = await axios.post(
            `${import.meta.env.VITE_API_URL}/user/token/refresh/`,
            {
              refresh,
            }
          );
          const { access, refresh: newRefresh } = res.data;

          const userId = tokenStorage.getUserId();
          const role = tokenStorage.getUserRole();
          if (userId && role) {
            tokenStorage.setAuth(access, newRefresh, userId, role);
          }

          error.config.headers.Authorization = `Bearer ${access}`;
          return api(error.config);
        } catch (refreshError) {
          console.error("Refresh token failed:", refreshError);
          tokenStorage.clearAuth();
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
