/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ApiResponse } from "../../../../types";
import api from "../../../../utils/api";
import type {
  Leader,
  GetLeadersApiResponse,
  GetLeaderByIdApiResponse,
  UpdateLeaderApiResponse,
  PromoteLeaderApiResponse,
} from "./leaderTypes";

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

const LeaderService = {
  // List all village leaders
  getLeaders: async (params: GetLeadersParams = {}, signal?: AbortSignal): Promise<GetLeadersApiResponse> => {
    const query = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        query.append(key, String(value));
      }
    });

    const res = await api.get(`/leaders/?${query.toString()}`, { signal });
    return res.data;
  },

  // Get leaders statistics
  getLeadersStats: async (params: Partial<GetLeadersParams> = {}): Promise<ApiResponse<any>> => {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        query.append(key, String(value));
      }
    });
    
    const res = await api.get(`/leaders/stats/?${query.toString()}`);
    return res.data;
  },
  // Retrieve a specific leader
  getLeaderById: async (userId: string): Promise<GetLeaderByIdApiResponse> => {
    const res = await api.get(`/leaders/${userId}/`);
    return res.data;
  },

  // Partially update a leader
  updateLeader: async (
    userId: string,
    data: Record<string, any>
  ): Promise<UpdateLeaderApiResponse> => {
    const res = await api.patch(`/leaders/${userId}/`, data);
    return res.data;
  },

  // Delete a leader completely
  deleteLeader: async (userId: string): Promise<ApiResponse<null>> => {
    const res = await api.delete(`/leaders/${userId}/`);
    return res.data;
  },

  // Remove a leader from a village (but keep user as resident)
  removeLeaderFromVillage: async (
    userId: string
  ): Promise<ApiResponse<null>> => {
    const res = await api.delete(`/leaders/${userId}/remove/`);
    return res.data;
  },

  // Promote a resident to leader
  promoteLeader: async (
    userId: string,
    villageId: string
  ): Promise<PromoteLeaderApiResponse> => {
    const res = await api.post("/leaders/promote/", {
      user_id: userId,
      village_id: villageId,
    });
    return res.data;
  },

  // Bulk operations
  bulkUpdateLeaders: async (
    userIds: string[],
    data: Record<string, any>
  ): Promise<ApiResponse<Leader[]>> => {
    const res = await api.patch("/leaders/bulk-update/", {
      user_ids: userIds,
      ...data
    });
    return res.data;
  },

  // Export leaders data
  exportLeaders: async (params: GetLeadersParams = {}): Promise<Blob> => {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        query.append(key, String(value));
      }
    });
    
    const res = await api.get(`/leaders/export/?${query.toString()}`, {
      responseType: 'blob'
    });
    return res.data;
  },

  // Import leaders data
  importLeaders: async (file: File): Promise<ApiResponse<any>> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const res = await api.post("/leaders/import/", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return res.data;
  },
};

export default LeaderService;
export type { GetLeadersParams };
