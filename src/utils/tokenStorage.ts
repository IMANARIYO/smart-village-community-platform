import type { RoleEnum } from "../features/auth/authTypes";

export const tokenStorage = {
  setAuth: (
    access: string,
    refresh: string,
    userId: string,
    role: RoleEnum
  ) => {
    sessionStorage.setItem("accessToken", access);
    sessionStorage.setItem("refreshToken", refresh);
    sessionStorage.setItem("userId", userId);
    sessionStorage.setItem("userRole", role);
  },

  getAccessToken: () => sessionStorage.getItem("accessToken"),
  getRefreshToken: () => sessionStorage.getItem("refreshToken"),
  getUserId: () => sessionStorage.getItem("userId"),
  getUserRole: (): RoleEnum | null => {
    const role = sessionStorage.getItem("userRole");
    return role ? (role as RoleEnum) : null;
  },

  clearAuth: () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("userRole");
  },
};
