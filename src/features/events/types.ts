import type { ApiResponse, SmallPersonInfo, Village } from "../../types";

export type EventStatusEnum = "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED";

export type EventCategory =
  // 1. Community Engagement / Social Events
  | "Village Meeting"
  | "Festival & Celebration"
  | "Workshop / Seminar"
  | "Volunteer Activity"

  // 2. Health & Wellness
  | "Health Screening"
  | "Fitness Event"
  | "Nutrition & Hygiene Campaign"

  // 3. Educational / Training
  | "School Event"
  | "Adult Education Program"
  | "Tech / Digital Training"

  // 4. Emergency / Safety
  | "Disaster Preparedness Drill"
  | "Community Policing Event"
  | "Incident Reporting Workshop"

  // 5. Environmental / Infrastructure
  | "Village Development Project"
  | "Cleanliness Drive"
  | "Sustainable Agriculture"

  // 6. Economic / Livelihood
  | "Market Day / Fair"
  | "Entrepreneurship Workshop"
  | "Job / Skills Fair"

  // 7. Special / One-off Events
  | "Visit by Dignitary"
  | "Competition / Award"
  | "Emergency Relief Distribution";

export type EventType =
  | "Announcement" // General info or notice for residents
  | "Alert" // Immediate attention needed
  | "Emergency" // Critical or urgent events (fire, flood, accident)
  | "Reminder" // Scheduled reminder for upcoming events
  | "Update"
  | "Event"
  // Changes or progress on previous events
  | "Invitation"; // Invitation to a community meeting or celebration

export interface Event {
  event_id: string;
  village: string | Village;
  title: string;
  description: string;
  exact_place_of_village: string;
  date: string;
  start_time: string;
  end_time: string;
  category: EventCategory;
  type: EventType;
  status: EventStatusEnum;
  image?: string | null;
  created_at: string;
  updated_at: string;
  organizer?: SmallPersonInfo;
}
// Raw API event (before transformation)
export interface RawApiEvent extends Omit<Event, "organizer" | "village"> {
  village: string;
  organizer?: {
    person: SmallPersonInfo;
  };
}

// API response type
export interface VillageEventsResponse {
  village: Village;
  events: RawApiEvent[];
}

export type GetEventsApiResponse = ApiResponse<Event[]>;
export type GetEventByIdApiResponse = ApiResponse<Event>;
export type CreateOrUpdateEventApiResponse = ApiResponse<Event>;
export type GetVillageEventsApiResponse = ApiResponse<VillageEventsResponse>;
