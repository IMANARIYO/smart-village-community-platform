import type { ApiResponse, SmallPersonInfo, Village } from "../../types";

export type EventStatusEnum = "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED";

export enum EventStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  CANCELLED = "CANCELLED",
}

export enum EventCategory {
  VILLAGE_MEETING = "Village Meeting",
  FESTIVAL_CELEBRATION = "Festival & Celebration",
  WORKSHOP_SEMINAR = "Workshop / Seminar",
  HEALTH_SCREENING = "Health Screening",
  FITNESS_EVENT = "Fitness Event",
  NUTRITION_HYGIENE_CAMPAIGN = "Nutrition & Hygiene Campaign",
  SCHOOL_EVENT = "School Event",
  ADULT_EDUCATION_PROGRAM = "Adult Education Program",
  TECH_DIGITAL_TRAINING = "Tech / Digital Training",
  DISASTER_PREPAREDNESS_DRILL = "Disaster Preparedness Drill",
  COMMUNITY_POLICING_EVENT = "Community Policing Event",
  INCIDENT_REPORTING_WORKSHOP = "Incident Reporting Workshop",
  VILLAGE_DEVELOPMENT_PROJECT = "Village Development Project",
  CLEANLINESS_DRIVE = "Cleanliness Drive",
  SUSTAINABLE_AGRICULTURE = "Sustainable Agriculture",
  MARKET_DAY_FAIR = "Market Day / Fair",
  ENTREPRENEURSHIP_WORKSHOP = "Entrepreneurship Workshop",
  JOB_SKILLS_FAIR = "Job / Skills Fair",
  VISIT_BY_DIGNITARY = "Visit by Dignitary",
  COMPETITION_AWARD = "Competition / Award",
  EMERGENCY_RELIEF_DISTRIBUTION = "Emergency Relief Distribution",
}

export enum EventType {
  ANNOUNCEMENT = "Announcement",
  ALERT = "Alert",
  EMERGENCY = "Emergency",
  REMINDER = "Reminder",
  UPDATE = "Update",
  INVITATION = "Invitation",
}

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
export interface CreateEventRequest {
  title: string;
  description: string;
  exact_place_of_village: string;
  date: string;
  start_time: string;
  end_time: string;
  image?: string | null;
  category: EventCategory;
  type: EventType;
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

export interface EventListItem {
  event_id: string;
  village: Village;
  organizer: {
    person: {
      first_name: string;
      last_name: string;
      phone_number: string;
      national_id: number;
      gender: "male" | "female";
      person_type: string;
    };
  };
  title: string;
  description: string;
  exact_place_of_village?: string;
  date: string; // YYYY-MM-DD
  start_time: string; // HH:mm:ss
  end_time: string; // HH:mm:ss
  status: EventStatus;
  category: EventCategory;
  type: EventType;
  image?: string | null;
  created_at: string;
  updated_at: string;
}

export interface PaginatedEvents {
  next: boolean;
  previous: boolean;
  next_link: string | null;
  previous_link: string | null;
  count: number;
  page_count: number;
  data: EventListItem[];
}

export interface EventFilters {
  category?: EventCategory;
  status?: EventStatusEnum;
  village_id?: string;
  date?: string;
  page?: number;
  limit?: number;
}

export type GetEventsApiResponse = ApiResponse<PaginatedEvents>;

export type GetEventByIdApiResponse = ApiResponse<Event>;
export type CreateOrUpdateEventApiResponse = ApiResponse<Event>;
export type GetVillageEventsApiResponse = ApiResponse<VillageEventsResponse>;
