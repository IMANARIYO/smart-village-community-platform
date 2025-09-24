import { create } from "zustand";
import { tokenStorage } from "@/features/auth/utils/tokenStorage";
import { UserProfileStorage } from "./utils/UserProfileStorage";
import UserService from "./authService";

interface User {
  id?: string;
  role?: string;
  [key: string]: unknown;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  setAuthenticated: (authenticated: boolean) => void;
  setUser: (user: User) => void;

  logout: () => void;
  checkAuth: () => void;
  initializeAuth: () => Promise<void>; // ✅ make it async
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: !!tokenStorage.getAccessToken(),
  user: null,

  setAuthenticated: (authenticated) => set({ isAuthenticated: authenticated }),

  setUser: (user) => set({ user, isAuthenticated: !!user }),

  logout: () => {
    tokenStorage.clearAuth();
    UserProfileStorage.clearUserProfile();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.clear();
    set({ isAuthenticated: false, user: null });
  },

  checkAuth: () => {
    const token = tokenStorage.getAccessToken();
    set({ isAuthenticated: !!token });
  },

  initializeAuth: async () => {
    const token = tokenStorage.getAccessToken();
    const userId = tokenStorage.getUserId();
    const userRole = tokenStorage.getUserRole();
    const refreshToken = tokenStorage.getRefreshToken();

    // ✅ If any piece of auth is missing, treat user as logged out
    if (!token || !refreshToken || !userId || !userRole) {
      console.warn("Auth initialization failed: missing token or user info");
      set({ isAuthenticated: false, user: null });
      return;
    }

    // ✅ Base state from tokens
    set({
      isAuthenticated: true,
      user: { id: userId, role: userRole },
    });

    // ✅ Load cached profile if available
    const cachedProfile = UserProfileStorage.getUserProfile();
    if (cachedProfile) {
      set((state) => ({
        user: { ...state.user, ...cachedProfile },
      }));
      return;
    }

    // ✅ Otherwise, fetch from API
    try {
      const profileResponse = await UserService.getMyProfile();
      if (profileResponse?.data) {
        UserProfileStorage.setUserProfile(profileResponse.data);
        set((state) => ({
          user: { ...state.user, ...profileResponse.data },
        }));
      }
    } catch (err) {
      console.error("Failed to fetch profile during auth init:", err);
    }
  },
}));
