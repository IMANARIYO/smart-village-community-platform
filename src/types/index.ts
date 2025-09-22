/* eslint-disable @typescript-eslint/no-explicit-any */
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
}
export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  errors?: Record<string, any> | null;
  meta: PaginationMeta;
};


// Reusable pagination


export interface PaginationMetaWithLinks extends PaginationMeta {
  next_page: string | null;
  previous_page: string | null;
}

// Small person (for quick references, not full details)
export interface SmallPersonInfo {
  user_id: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone_number: string | null;
}

// Full person (for detailed user objects)
export interface Person {
  first_name: string;
  last_name: string;
  phone_number: string;
  national_id: number;
  gender: "male" | "female";
  person_type: string;
}

// Full user (shared between organizer, participant, etc.)
export interface User {
  user_id: string;
  phone_number: string;
  role: string;
  is_verified: boolean;
  is_active: boolean;
  person: Person;
  created_at: string;
}

// Shared village object
export type Village = {
  village_id: string;
  village: string;
  cell?: string;
  sector?: string;
  district?: string;
  province?: string;
  village_leader?: SmallPersonInfo;
};

// Base event structure (shared between volunteering and participation)
export interface BaseVolunteringEvent {
  volunteer_id: string;
  title: string;
  description: string;
  date: string;          // YYYY-MM-DD
  start_time?: string;   // HH:mm:ss
  end_time?: string;     // HH:mm:ss
  capacity: number;
  village: Village;
  organizer: User | SmallPersonInfo;
  status: string;
  location?: string | null;
  skills_required: string[];
  category: string;
  created_at: string;
  updated_at: string;
  approved_at?: string | null;


}
