import axios, { type AxiosRequestConfig } from "axios";
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

// --- Helper method to refresh token ---
async function refreshToken(): Promise<string | null> {
  const refresh = tokenStorage.getRefreshToken();
  if (!refresh) {
    console.warn("No refresh token available.");
    return null;
  }

  try {
    console.log("Sending refresh token request to /user/token/refresh/");

    const res = await api.post(
      "/user/token/refresh/",
      { refresh },
      { headers: { "Content-Type": "application/json" } }
    );
    console.log("  response in refreshing token is ", res.data)

    const { access, refresh: newRefresh } = res.data.data;
    const userId = tokenStorage.getUserId();
    const role = tokenStorage.getUserRole();

    if (userId && role) {
      tokenStorage.setAuth(access, newRefresh, userId, role);
      console.log("Tokens updated in sessionStorage!");
    }

    return access;
  } catch (err) {
    console.error("Refresh token failed:", err);

    return null;
  }
}

// --- Attach access token to every request ---
api.interceptors.request.use(
  (config) => {
    const token = tokenStorage.getAccessToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    console.log("Sending request to:", config.url);
    return config;
  },
  (error) => Promise.reject(error)
);

// --- Handle 401 and retry original request ---
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest: AxiosRequestConfig & { _retry?: boolean } =
      error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      console.warn("401 detected. Attempting token refresh...");
      originalRequest._retry = true;

      const newAccessToken = await refreshToken();
      if (newAccessToken) {
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        console.log("Retrying original request:", originalRequest.url);
        return api(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
export { refreshToken };
