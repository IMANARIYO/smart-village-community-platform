// types/participation.ts
import type { BaseVolunteringEvent, User, ApiResponse } from "@/types";

export type ParticipationStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "CANCELLED";

// Core Participation object
export interface Participation {
  participation_id: string;
  user: User;
  event: BaseVolunteringEvent;
  status: ParticipationStatus;
  notes?: string;
  joined_at: string;
  updated_at: string;
  approved_at?: string | null;
}

// Request to create a participation
export interface CreateParticipationRequest {
  event: string; // volunteering event UUID
  notes?: string; // optional notes
}

// Request to update a participation (notes)
export interface UpdateParticipationRequest {
  notes: string;
}

// Response for updating a participation, wrapped in ApiResponse
export type UpdateParticipationApiResponse = ApiResponse<{
  participation_id: string;
  notes: string;
}>;

// Request to approve/reject participations (bulk or single)
export interface ApproveRejectParticipationRequest {
  participation_ids: string[];
  status: ParticipationStatus;
}

// Response for approve/reject action, wrapped in ApiResponse
export type ApproveRejectParticipationApiResponse = ApiResponse<
  {
    participation_id: string;
    status: ParticipationStatus;
  }[]
>;

// Filters for listing participations
export interface ParticipationFilters {
  page?: number;
  limit?: number;
  status?: ParticipationStatus;
  village_id?: string;
  volunteer_id?: string;
}

export type ListParticipationApiResponse = ApiResponse<Participation[]>;
