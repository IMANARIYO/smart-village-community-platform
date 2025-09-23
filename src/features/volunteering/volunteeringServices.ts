import type { ApiResponse, BaseVolunteringEvent } from "../../types";
import api from "../../utils/api";
import type {
  CreateOrUpdateVolunteerEventApiResponse,
  CreateVolunteeringEventRequest,
  GetVolunteerEventByIdApiResponse,
  GetVolunteerEventsApiResponse,
  GetVolunteeringOptions,
  VolunteeringListResponse,
} from "./types";

const VolunteerService = {
  // ------------------------
  // Volunteering Events
  // ------------------------

  createVolunteeringEvent: async (
    payload: CreateVolunteeringEventRequest
  ): Promise<CreateOrUpdateVolunteerEventApiResponse> => {
    const res = await api.post("/volunter/", payload);
    return res.data;
  },

  getVolunteeringEvents: async (
    params?: GetVolunteeringOptions
  ): Promise<VolunteeringListResponse> => {
    const res = await api.get<VolunteeringListResponse>("/volunter/", {
      params,
    });
    return res.data;
  },

  getVolunteerEventById: async (
    id: string
  ): Promise<GetVolunteerEventByIdApiResponse> => {
    const res = await api.get(`/volunter/${id}/`);
    return res.data;
  },

  updateVolunteerEvent: async (
    id: string,
    payload: Partial<
      Omit<
        BaseVolunteringEvent,
        "id" | "organizer" | "approved_volunteers_count" | "is_full" | "village"
      > & {
        village?: string;
      }
    >
  ): Promise<CreateOrUpdateVolunteerEventApiResponse> => {
    const res = await api.put(`/volunter/${id}/`, payload);
    return res.data;
  },

  patchVolunteerEvent: async (
    id: string,
    payload: Partial<
      Omit<
        BaseVolunteringEvent,
        "id" | "organizer" | "approved_volunteers_count" | "is_full"
      >
    >
  ): Promise<CreateOrUpdateVolunteerEventApiResponse> => {
    const res = await api.patch(`/volunter/${id}/`, payload);
    return res.data;
  },

  deleteVolunteerEvent: async (id: string): Promise<ApiResponse<null>> => {
    const res = await api.delete(`/volunter/${id}/`);
    return res.data;
  },

  // ------------------------
  // Village-specific Events
  // ------------------------
  getVillageVoluntringActivities: async (
    villageId: string,
    params?: {
      category?: string;
      date?: string;
      page?: number;
      page_size?: number;
      status?: string;
    }
  ): Promise<GetVolunteerEventsApiResponse> => {
    const res = await api.get(`/volunter/${villageId}/activity/`, { params });
    return res.data;
  },
};
export default VolunteerService;
