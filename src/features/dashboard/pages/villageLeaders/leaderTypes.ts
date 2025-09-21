import type { ApiResponse, Village } from "../../../../types";

export interface Leader {
  user_id: string;
  phone_number: string;
  email: string | null;
  role: string;
  is_active: boolean;
  person: {
    first_name: string;
    last_name: string;
    national_id: number;
  };
  village: Village;
}
export interface LeadersMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
}

export interface GetLeadersApiResponse extends ApiResponse<Leader[]> {
  meta: LeadersMeta;
}
export type GetLeaderByIdApiResponse = ApiResponse<Leader>;
export type UpdateLeaderApiResponse = ApiResponse<Leader>;
export type PromoteLeaderApiResponse = ApiResponse<Leader>;
