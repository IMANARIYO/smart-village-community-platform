import type { ApiResponse, SmallPersonInfo, Village } from "../../../../types";

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

// Single item type for lists
export interface LeaderListItem extends Omit<Leader, "village"> {
  village: Village | null;
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
  deletedOnly?: boolean;
  includeDeleted?: boolean;
}
// API response type for list endpoints
export type GetLeadersApiResponse = ApiResponse<LeaderListItem[]>;
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

export interface ResidentPerson extends SmallPersonInfo {
  person_id: string;
  national_id: number;
  gender: "male" | "female";
  person_type: string;
  registration_date: string;
}

// Resident info
export interface ResidentPerson {
  person_id: string;
  first_name: string;
  last_name: string;
  national_id: number;
  phone_number: string;
  gender: "male" | "female";
  person_type: string;
  registration_date: string;
}

// Added by user
export interface AddedBy {
  user_id: string;
  phone_number: string;
  email: string | null;
  role: string;
  is_active: boolean;
  is_verified: boolean;
}

// Resident list item
export interface ResidentListItem {
  resident_id: string;
  status: string;
  has_account: boolean;
  person: ResidentPerson;
  added_by: AddedBy;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
  deleted_at: string | null;
}

// Village with optional leader
export interface VillageWithLeader {
  village_id: string;
  province: string;
  district: string;
  sector: string;
  cell: string;
  village: string;
  leader: null | { user_id: string; first_name: string; last_name: string }; // optional leader info
}

// API Response
export interface GetVillageResidentsApiResponse {
  success: boolean;
  message: string;
  village: VillageWithLeader;
  residents: ResidentListItem[];
}
