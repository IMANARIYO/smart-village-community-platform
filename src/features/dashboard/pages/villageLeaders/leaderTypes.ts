import type { ApiResponse, Village } from "../../../../types";

export interface Leader {
  id?: string;
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

export interface GetLeadersParams {
  province?: string;
  district?: string;
  sector?: string;
  cell?: string;
  village_id?: string;
  search?: string;
  limit?: number;
  page?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  is_active?: boolean;
  deletedOnly?: boolean;
  includeDeleted?: boolean;
}

export interface GetLeadersApiResponse extends ApiResponse<Leader[]> {
  meta: LeadersMeta;
}

export type GetLeaderByIdApiResponse = ApiResponse<Leader>;
export type UpdateLeaderApiResponse = ApiResponse<Leader>;
export type PromoteLeaderApiResponse = ApiResponse<Leader>;

export interface LeaderFormData {
  first_name: string;
  last_name: string;
  phone_number: string;
  email?: string;
  national_id: number;
  village_id: string;
  role?: string;
}

export interface LeaderStats {
  total: number;
  active: number;
  inactive: number;
  byProvince: Record<string, number>;
  byDistrict: Record<string, number>;
  bySector: Record<string, number>;
  byCell: Record<string, number>;
  byVillage: Record<string, number>;
  recentlyAdded: number;
  recentlyUpdated: number;
}

export interface BulkUpdateData {
  is_active?: boolean;
  role?: string;
  village_id?: string;
}

export interface ImportResult {
  success: number;
  failed: number;
  errors: string[];
  warnings: string[];
}
