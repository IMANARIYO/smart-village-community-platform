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
}));