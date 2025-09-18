import type { ApiResponse } from "../../types";
export type RoleEnum = "resident" | "admin" | "leader";
export interface LoginPayload {
  phone_number: string;
  password: string;
}
export interface LoginSuccessData {
  access: string;
  refresh: string;
  user: {
    id: string;
    phone_number: string;
    role: "resident" | "admin" | "leader";
  };
}

export type LoginApiResponse = ApiResponse<LoginSuccessData>;

export interface RegisterPayload {
  phone_number: string;
  password: string;
  confirm_password: string;
  person: {
    first_name: string;
    last_name: string;
    national_id: number;
    gender: "male" | "female";
  };
  location_id: string;
}

export interface RegisterResponse {
  id: string;
  phone_number: string;
  password: string;
  role: "resident" | "admin" | "leader";
}
export type RegisterApiResponse = ApiResponse<RegisterResponse>;

export interface ResetRequestPayload {
  email: string;
}

export interface ResetConfirmPayload {
  email: string;
  otp: string;
  new_password: string;
}

export interface VerifyEmailPayload {
  email: string;
  otp_code: string;
}

export interface ResendOtpPayload {
  email: string;
}

export interface RefreshTokenPayload {
  refresh: string;
}
