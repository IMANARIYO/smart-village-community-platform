import type { ApiResponse } from "../../../../types";

export interface Leader {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  village_id: string;
  role: "leader";
  assigned_at: string;
}

export type GetLeadersApiResponse = ApiResponse<Leader[]>;
export type GetLeaderByIdApiResponse = ApiResponse<Leader>;
export type UpdateLeaderApiResponse = ApiResponse<Leader>;
export type PromoteLeaderApiResponse = ApiResponse<Leader>;
