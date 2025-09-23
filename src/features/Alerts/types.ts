import { ApiResponse, Person, Village } from "@/types";

// types.ts placeholder for Alerts feature
export type AlertType =
  | "emergency"
  | "security"
  | "infrastructure"
  | "health"
  | "environment"
  | "utility"
  | "social";

export type UrgencyLevel = "low" | "medium" | "high" | "critical";

export type AlertStatus = "PENDING" | "APPROVED" | "REJECTED" | "RESOLVED";

export interface Reporter {
  person: Person;
}

export interface Alert {
  alert_id: string;
  title: string;
  description: string;
  alert_type: AlertType;
  urgency_level: UrgencyLevel;
  status: AlertStatus;
  reporter: Reporter;
  village: Village;
  specific_location?: string;
  incident_date: string; // YYYY-MM-DD
  incident_time: string; // HH:mm:ss
  allow_sharing: boolean;
  contact_phone?: string | null;
  is_anonymous: boolean;
  created_at: string;
  updated_at: string;
}

export interface AlertQueryParams {
  alert_type?: AlertType;
  incident_date?: string; // YYYY-MM-DD
  status?: AlertStatus;
  urgency_level?: UrgencyLevel;
  village?: string; // village_id
  limit?: number;
  page?: number;
}

export type AlertsListApiResponse = ApiResponse<Alert>;
