import type { ApiResponse, Village } from "../../types";

export type EventStatusEnum = "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED";

export interface Event {
  event_id: string;
  village: string;
  title: string;
  description: string;
  exact_place_of_village: string;
  date: string;
  start_time: string;
  end_time: string;
  status: EventStatusEnum;
  image?: string | null;
  created_at: string;
  updated_at: string;
  organizer?: string;
}

export interface VillageEventsResponse {
  village: Village;
  events: Event[];
}

export type GetEventsApiResponse = ApiResponse<Event[]>;
export type GetEventByIdApiResponse = ApiResponse<Event>;
export type CreateOrUpdateEventApiResponse = ApiResponse<Event>;
export type GetVillageEventsApiResponse = ApiResponse<VillageEventsResponse>;
