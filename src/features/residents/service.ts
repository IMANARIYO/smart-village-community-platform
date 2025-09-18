/* eslint-disable @typescript-eslint/no-explicit-any */
// features/resident/ResidentService.ts
import type { ApiResponse } from "../../types";
import api from "../../utils/api";

export type GenderEnum = "male" | "female" | "other";

export type PersonTypeEnum = "resident" | "child" | "visitor";

export type ResidentStatusEnum = "PENDING" | "APPROVED" | "REJECTED";
export interface Person {
  person_id?: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  national_id?: string | number;
  gender?: GenderEnum;
  person_type: PersonTypeEnum;
  registration_date?: string;
}

export interface Village {
  village_id: string;
  province?: string;
  district?: string;
  sector?: string;
  cell?: string;
  village?: string;
}

export interface UserReference {
  user_id: string;
  person: Person;
}

export interface Resident {
  resident_id: string;
  person: Person;
  person_name?: string;
  village: Village;
  location_name?: string;
  status: ResidentStatusEnum;
  has_account: boolean;
  added_by: UserReference;
  added_by_email?: string | null;
  is_deleted: boolean;
  deleted_at?: string | null;
  created_at: string;
  updated_at: string;
}

// Pagination & list response
export interface PaginatedResidentsResponse {
  success: boolean;
  message: string;
  next: boolean;
  previous: boolean;
  next_link?: string | null;
  previous_link?: string | null;
  count: number;
  page_count: number;
  data: Resident[];
}

// ResidentService
const ResidentService = {
  listResidents: async (
    params?: Record<string, any>
  ): Promise<ApiResponse<PaginatedResidentsResponse>> => {
    const res = await api.get("/resident/", { params });
    return res.data;
  },

  getResident: async (id: string): Promise<ApiResponse<Resident>> => {
    const res = await api.get(`/resident/${id}/`);
    return res.data;
  },

  createResident: async (
    payload: Omit<
      Resident,
      "resident_id" | "created_at" | "updated_at" | "added_by"
    >
  ): Promise<ApiResponse<Resident>> => {
    const res = await api.post("/resident/", payload);
    return res.data;
  },

  patchResident: async (
    id: string,
    payload: Partial<
      Omit<Resident, "resident_id" | "created_at" | "updated_at" | "added_by">
    >
  ): Promise<ApiResponse<Resident>> => {
    const res = await api.patch(`/resident/${id}/`, payload);
    return res.data;
  },

  deleteResident: async (id: string): Promise<ApiResponse<null>> => {
    const res = await api.delete(`/resident/${id}/`);
    return res.data;
  },

  softDeleteResident: async (id: string): Promise<ApiResponse<Resident>> => {
    const res = await api.delete(`/resident/${id}/soft_delete/`);
    return res.data;
  },

  restoreResident: async (id: string): Promise<ApiResponse<Resident>> => {
    const res = await api.post(`/resident/${id}/restore/`);
    return res.data;
  },

  updateResidentStatus: async (
    id: string,
    status: ResidentStatusEnum
  ): Promise<ApiResponse<Resident>> => {
    const res = await api.patch(`/resident/${id}/update_status/`, { status });
    return res.data;
  },

  joinVillage: async (payload: {
    resident_id: string;
    village_id: string;
  }): Promise<ApiResponse<Resident>> => {
    const res = await api.post("/resident/join_village/", payload);
    return res.data;
  },

  migrateVillage: async (payload: {
    resident_id: string;
    new_village_id: string;
  }): Promise<ApiResponse<Resident>> => {
    const res = await api.post("/resident/migrate_village/", payload);
    return res.data;
  },
};

export default ResidentService;
