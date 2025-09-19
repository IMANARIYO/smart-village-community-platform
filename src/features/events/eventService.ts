import type { ApiResponse } from "../../types";
import api from "../../utils/api";
import type {
  CreateOrUpdateEventApiResponse,
  Event,
  GetEventByIdApiResponse,
  GetEventsApiResponse,
  GetVillageEventsApiResponse,
} from "./types";

const EventService = {
  getEvents: async (): Promise<GetEventsApiResponse> => {
    const res = await api.get("/event/");
    return res.data;
  },

  getEventById: async (eventId: string): Promise<GetEventByIdApiResponse> => {
    const res = await api.get(`/event/${eventId}/`);
    return res.data;
  },

  createEvent: async (data: FormData) => {
    const res = await api.post("/event/", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  updateEvent: async (
    eventId: string,
    data: Partial<Event>
  ): Promise<CreateOrUpdateEventApiResponse> => {
    const res = await api.patch(`/event/${eventId}/`, data);
    return res.data;
  },

  deleteEvent: async (eventId: string): Promise<ApiResponse<null>> => {
    const res = await api.delete(`/event/${eventId}/`);
    return res.data;
  },

  getVillageEvents: async (
    villageId: string
  ): Promise<GetVillageEventsApiResponse> => {
    const res = await api.get(`/village/${villageId}/events/`);
    console.log(
      "****trying to fetch the village  events  /village/${villageId}/events/*****",
      res
    );
    return res.data;
  },
};

export default EventService;
