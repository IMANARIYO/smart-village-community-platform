// types.ts placeholder for volunteering feature
import type { ApiResponse, SmallPersonInfo, Village } from "../../types";

export type VolunteeringCategory =
  | "Community & Social"
  | "Health & Wellness"
  | "Education & Skills"
  | "Environmental & Sustainability"
  | "Safety & Emergency"
  | "Economic & Livelihood"
  | "Special / One-Off Events"
  | "Civic & Governance";

export interface VolunteeringEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  capacity: number;
  village?: Village;
  category?: VolunteeringCategory;
  organizer?: SmallPersonInfo;
  approved_volunteers_count: number;
  is_full: boolean;
}

export interface CreateVolunteeringEventRequest {
  title: string;
  description: string;
  date: string;
  start_time: string;
  end_time: string;
  capacity: number;
  village: string;
  location: string;
  skills_required: string[];
  category: VolunteeringCategory;
}

export type GetVolunteerEventsApiResponse = ApiResponse<VolunteeringEvent[]>;
export type GetVolunteerEventByIdApiResponse = ApiResponse<VolunteeringEvent>;
export type CreateOrUpdateVolunteerEventApiResponse =
  ApiResponse<VolunteeringEvent>;
