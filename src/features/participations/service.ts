import api from "@/utils/api";
import type {
  Participation,
  ParticipationFilters,
  CreateParticipationRequest,
  UpdateParticipationRequest,
  ApproveRejectParticipationRequest,
  ListParticipationApiResponse,
  UpdateParticipationApiResponse,
  ApproveRejectParticipationApiResponse,
} from "./types";
import type { ApiResponse } from "@/types";

const API_BASE = "/participations";

export const participationService = {
  // List participations with optional filters
  async list(
    filters?: ParticipationFilters
  ): Promise<ListParticipationApiResponse> {
    const response = await api.get<ListParticipationApiResponse>(
      `${API_BASE}/`,
      {
        params: filters,
      }
    );
    return response.data;
  },

  // Create a participation request
  async create(
    payload: CreateParticipationRequest
  ): Promise<ApiResponse<Participation>> {
    const response = await api.post<ApiResponse<Participation>>(
      API_BASE,
      payload
    );
    return response.data;
  },

  // Get participation by ID
  async getById(participation_id: string): Promise<ApiResponse<Participation>> {
    const response = await api.get<ApiResponse<Participation>>(
      `${API_BASE}/${participation_id}/`
    );
    return response.data;
  },

  // Update participation notes
  async update(
    participation_id: string,
    payload: UpdateParticipationRequest
  ): Promise<UpdateParticipationApiResponse> {
    const response = await api.put<UpdateParticipationApiResponse>(
      `${API_BASE}/${participation_id}/`,
      payload
    );
    return response.data;
  },

  // Approve/reject participations (single or bulk)
  async approveReject(
    payload: ApproveRejectParticipationRequest
  ): Promise<ApproveRejectParticipationApiResponse> {
    // PATCH endpoint expects participation_ids and status
    const response = await api.patch<ApproveRejectParticipationApiResponse>(
      `${API_BASE}/`,
      payload
    );
    return response.data;
  },

  // Delete participation
  async remove(participation_id: string): Promise<ApiResponse<null>> {
    const response = await api.delete<ApiResponse<null>>(
      `${API_BASE}/${participation_id}`
    );
    return response.data;
  },
};
