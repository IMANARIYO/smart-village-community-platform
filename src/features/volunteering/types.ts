// types.ts placeholder for volunteering feature
import type {
  ApiResponse,
  SmallPersonInfo,
  Village,
  PaginationMetaWithLinks,
  BaseVolunteringEvent,
} from "../../types";

export enum VolunteeringCategory {
  CommunitySocial = "Community & Social",
  HealthWellness = "Health & Wellness",
  EducationSkills = "Education & Skills",
  EnvironmentalSustainability = "Environmental & Sustainability",
  SafetyEmergency = "Safety & Emergency",
  EconomicLivelihood = "Economic & Livelihood",
  SpecialOneOff = "Special / One-Off Events",
  CivicGovernance = "Civic & Governance",
}

export enum VolunteeringStatus {
  Draft = "DRAFT",
  Pending = "PENDING",
  Approved = "APPROVED",
  Rejected = "REJECTED",
  Cancelled = "CANCELLED",
}
export interface GetVillageVolunteeringActivitiesOptions {
  category?: VolunteeringCategory;
  date?: string; // YYYY-MM-DD
  page?: number;
  page_size?: number;
  status?: VolunteeringStatus;
}

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

export interface OrganizerPerson {
  first_name: string;
  last_name: string;
  phone_number: string;
  national_id: number;
  gender: "male" | "female";
  person_type: string;
}

export interface OrganizerPerson {
  first_name: string;
  last_name: string;
  phone_number: string;
  national_id: number;
  gender: "male" | "female";
  person_type: string;
}

export interface Organizer {
  user_id: string;
  phone_number: string;
  role: string;
  is_verified: boolean;
  is_active: boolean;
  created_at: string;
  person: OrganizerPerson;
}

// Volunteering event list item extends BaseEvent
export interface VolunteeringEventListItem extends BaseVolunteringEvent {
  start_time: string;
  end_time: string;
  village: Village; // override optional from BaseEvent
  organizer: Organizer; // override with smaller organizer info
  status: VolunteeringStatus;
  approved_at: string | null;
}

export interface CreateVolunteeringEventRequest {
  title: string;
  description: string;
  date: string;
  start_time: string;
  end_time: string;
  capacity: number;
  village: string;

  skills_required: string[];
  category: VolunteeringCategory;
  location?: string;
}

// List response with pagination
export interface VolunteeringListResponse {
  success: boolean;
  message: string;
  data: VolunteeringEventListItem[];
  meta: PaginationMetaWithLinks;
}

export interface GetVolunteeringOptions {
  page?: number;
  limit?: number;
  search?: string;
  category?: VolunteeringCategory;
  status?: VolunteeringStatus;
  organizer_phone?: string;
  village_id?: string;
  volunteer_id?: string;
}
// Village volunteering activities API response
export interface VillageVolunteeringActivitiesResponse {
  success: boolean;
  message: string;
  count: number;
  filters: {
    status: string | null;
    category: string | null;
    date: string | null;
  };
  village: Village;
  data: VolunteeringEventListItem[];
  meta: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
    has_next: boolean;
    has_prev: boolean;
    next: string | null;
    previous: string | null;
  };
}

// API response types
export type GetVolunteerEventsApiResponse = VillageVolunteeringActivitiesResponse;
export type GetEventDetailApiResponse = ApiResponse<VolunteeringEventListItem>;
export type GetVolunteerEventByIdApiResponse =
  ApiResponse<VolunteeringEventListItem>;
export type CreateOrUpdateVolunteerEventApiResponse =
  ApiResponse<BaseVolunteringEvent>;
