import axios, { type AxiosRequestConfig } from "axios";
import { tokenStorage } from "./tokenStorage";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

// Add request interceptor to handle CORS
api.interceptors.request.use(
  (config) => {
    // Remove any client-side CORS headers that might cause issues
    delete config.headers['Access-Control-Allow-Origin'];
    delete config.headers['Access-Control-Allow-Methods'];
    delete config.headers['Access-Control-Allow-Headers'];
    
    const token = tokenStorage.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // console.log("API Request:", {
    //   method: config.method?.toUpperCase(),
    //   url: config.url,
    //   baseURL: config.baseURL,
    //   fullURL: `${config.baseURL}${config.url}`,
    //   headers: config.headers
    // });
    
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// --- Helper method to refresh token ---
async function refreshToken(): Promise<string | null> {
  const refresh = tokenStorage.getRefreshToken();
  if (!refresh) {
    console.warn("No refresh token available.");
    return null;
  }

  try {


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
