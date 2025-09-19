import type { ApiResponse } from "../../types";
import api from "../../utils/api";
import type {
  CreateOrUpdateVolunteerEventApiResponse,
  CreateVolunteeringEventRequest,
  GetVolunteerEventByIdApiResponse,
  GetVolunteerEventsApiResponse,
  VolunteeringEvent,
} from "./types";

const VolunteerService = {
  // ------------------------
  // Activities
  // ------------------------

  createVolunteeringEvent: async (
    payload: CreateVolunteeringEventRequest
  ): Promise<CreateOrUpdateVolunteerEventApiResponse> => {
    const res = await api.post("/volunteer/", payload);
    return res.data;
  },

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

  approveActivity: async (id: string): Promise<ApiResponse<null>> => {
    const res = await api.post(`/volunteer/activity/${id}/approve/`);
    return res.data;
  },

  joinActivity: async (id: string): Promise<ApiResponse<null>> => {
    const res = await api.post(`/volunteer/activity/${id}/join/`);
    return res.data;
  },

  rejectActivity: async (id: string): Promise<ApiResponse<null>> => {
    const res = await api.post(`/volunteer/activity/${id}/reject/`);
    return res.data;
  },

  submitActivityForApproval: async (id: string): Promise<ApiResponse<null>> => {
    const res = await api.post(
      `/volunteer/activity/${id}/submit_for_approval/`
    );
    return res.data;
  },

  getParticipationById: async (id: string) => {
    const res = await api.get(`/volunteer/participations/${id}/`);
    return res.data;
  },

  createParticipation: async (payload: { id: string; note: string }) => {
    const res = await api.post("/volunteer/participations/", payload);
    return res.data;
  },

  updateParticipation: async (
    id: string,
    payload: { id: string; note: string }
  ) => {
    const res = await api.put(`/volunteer/participations/${id}/`, payload);
    return res.data;
  },

  patchParticipation: async (
    id: string,
    payload: { id: string; note: string }
  ) => {
    const res = await api.patch(`/volunteer/participations/${id}/`, payload);
    return res.data;
  },

  deleteParticipation: async (id: string): Promise<ApiResponse<null>> => {
    const res = await api.delete(`/volunteer/participations/${id}/`);
    return res.data;
  },

  approveParticipation: async (id: string): Promise<ApiResponse<null>> => {
    const res = await api.post(`/volunteer/participations/${id}/approve/`);
    return res.data;
  },

  rejectParticipation: async (id: string): Promise<ApiResponse<null>> => {
    const res = await api.post(`/volunteer/participations/${id}/reject/`);
    return res.data;
  },

  withdrawParticipation: async (id: string): Promise<ApiResponse<null>> => {
    const res = await api.post(`/volunteer/participations/${id}/withdraw/`);
    return res.data;
  },
};

export default VolunteerService;
