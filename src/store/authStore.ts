import { create } from 'zustand';
import { tokenStorage } from '@/utils/tokenStorage';

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
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: !!tokenStorage.getAccessToken(),
  user: null,
  setAuthenticated: (authenticated) => set({ isAuthenticated: authenticated }),
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  logout: () => {
    tokenStorage.clearAuth();
    set({ isAuthenticated: false, user: null });
  },
  checkAuth: () => {
    const token = tokenStorage.getAccessToken();
    set({ isAuthenticated: !!token });
  },
  initializeAuth: () => {
    const token = tokenStorage.getAccessToken();
    const userId = tokenStorage.getUserId();
    const userRole = tokenStorage.getUserRole();
    
    if (token && userId && userRole) {
      set({ 
        isAuthenticated: true, 
        user: { id: userId, role: userRole } 
      });
    } else {
      set({ isAuthenticated: false, user: null });
    }
  },
}));