import api from "../../utils/api";
import { tokenStorage } from "../../utils/tokenStorage";
import { useAuthStore } from "@/store/authStore";
import type {
  LoginApiResponse,
  LoginPayload,
  RefreshTokenPayload,
  RegisterApiResponse,
  RegisterPayload,
  ResendOtpPayload,
  ResetConfirmPayload,
  ResetRequestPayload,
  VerifyEmailPayload,
} from "./authTypes";
import type { GetMyProfileResponse } from "./authTypes";
import { UserProfileStorage } from "./utils/UserProfileStorage";

const UserService = {
  login: async (data: LoginPayload): Promise<LoginApiResponse> => {
    const res = await api.post("/user/login/", data);

    if (res.data.success && res.data.data) {
      const { access, refresh, user } = res.data.data;
      tokenStorage.setAuth(access, refresh, user.id, user.role);
      const authStore = useAuthStore.getState();
      authStore.initializeAuth();
    }

    return res.data;
  },

  refreshToken: async (): Promise<{ access: string; refresh: string }> => {
    const refresh = tokenStorage.getRefreshToken();
    if (!refresh) throw new Error("No refresh token found");

    const res = await api.post("/user/token/refresh/", {
      refresh,
    } as RefreshTokenPayload);
    const { access, refresh: newRefresh } = res.data;
    const userId = tokenStorage.getUserId();
    const role = tokenStorage.getUserRole();

    if (!userId || !role) {
      throw new Error("User info missing from storage");
    }

    tokenStorage.setAuth(access, newRefresh, userId, role);
    const authStore = useAuthStore.getState();
    authStore.initializeAuth();
    return { access, refresh: newRefresh };
  },
  register: async (data: RegisterPayload): Promise<RegisterApiResponse> => {
    const res = await api.post("/user/register/", data);
    return res.data;
  },

  requestPasswordReset: async (data: ResetRequestPayload) => {
    const res = await api.post("/user/password-reset/request/", data);
    return res.data;
  },

  confirmPasswordReset: async (data: ResetConfirmPayload) => {
    const res = await api.post("/user/password-reset/confirm/", data);
    return res.data;
  },

  verifyEmail: async (data: VerifyEmailPayload) => {
    const res = await api.post("/user/verify_email/", data);
    return res.data;
  },

  resendOtp: async (data: ResendOtpPayload) => {
    const res = await api.post("/user/resend_otp/", data);
    return res.data;
  },

  getMyProfile: async (): Promise<GetMyProfileResponse> => {
    const res = await api.get("/me/");
    return res.data;
  },
  logout: () => {
    tokenStorage.clearAuth();
    UserProfileStorage.clearUserProfile();
    localStorage.removeItem("visitedVillage");
    const authStore = useAuthStore.getState();
    authStore.logout();
  },
};

export default UserService;
