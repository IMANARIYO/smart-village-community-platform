import type { ApiResponse } from "../../types";
import api from "../../utils/api";
import type { RoleEnum } from "../auth/authTypes";

export interface Village {
  village_id: string;
  province: string;
  district: string;
  sector: string;
  cell: string;
  village: string;
}

export interface Organizer {
  user_id: string;
  phone_number?: string | null;
  role: RoleEnum;
}

export interface VolunteeringEvent {
  id: string;
  title: string;
  description: string;
  date: string; // ISO string
  capacity: number;
  village: Village;
  organizer: Organizer;
  approved_volunteers_count: number;
  is_full: boolean;
}

export type GetVolunteerEventsApiResponse = ApiResponse<VolunteeringEvent[]>;
export type GetVolunteerEventByIdApiResponse = ApiResponse<VolunteeringEvent>;
export type CreateOrUpdateVolunteerEventApiResponse =
  ApiResponse<VolunteeringEvent>;

const VolunteerService = {
  getActivities: async (): Promise<GetVolunteerEventsApiResponse> => {
    const res = await api.get("/volunteer/activity/");
    return res.data;
  },

  getVillageActivities: async (
    villageId: string
  ): Promise<GetVolunteerEventsApiResponse> => {
    const res = await api.get(`/volunteer/${villageId}/activity`);
    return res.data;
  },

  getActivityById: async (
    id: string
  ): Promise<GetVolunteerEventByIdApiResponse> => {
    const res = await api.get(`/volunteer/activity/${id}/`);
    return res.data;
  },

  createActivity: async (
    payload: Omit<
      VolunteeringEvent,
      "id" | "organizer" | "approved_volunteers_count" | "is_full"
    >
  ): Promise<CreateOrUpdateVolunteerEventApiResponse> => {
    const res = await api.post("/volunteer/activity/", payload);
    return res.data;
  },

  updateActivity: async (
    id: string,
    payload: Partial<
      Omit<
        VolunteeringEvent,
        "id" | "organizer" | "approved_volunteers_count" | "is_full"
      >
    >
  ): Promise<CreateOrUpdateVolunteerEventApiResponse> => {
    const res = await api.put(`/volunteer/activity/${id}/`, payload);
    return res.data;
  },

  patchActivity: async (
    id: string,
    payload: Partial<
      Omit<
        VolunteeringEvent,
        "id" | "organizer" | "approved_volunteers_count" | "is_full"
      >
    >
  ): Promise<CreateOrUpdateVolunteerEventApiResponse> => {
    const res = await api.patch(`/volunteer/activity/${id}/`, payload);
    return res.data;
  },

  deleteActivity: async (id: string): Promise<ApiResponse<null>> => {
    const res = await api.delete(`/volunteer/activity/${id}/`);
    return res.data;
  },
};

export default VolunteerService;
