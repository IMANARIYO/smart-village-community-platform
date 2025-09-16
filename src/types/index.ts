export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type Village = {
  village_id: string;
  village: string;
  cell?: string;
  sector?: string;
  district?: string;
  province?: string;
};
