/* eslint-disable @typescript-eslint/no-explicit-any */
export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
   errors?: Record<string, any> | null;
};

export interface SmallPersonInfo {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string | null;
}
export type Village = {
  village_id: string;
  village: string;
  cell?: string;
  sector?: string;
  district?: string;
  province?: string;
  village_leader?: SmallPersonInfo;
};
