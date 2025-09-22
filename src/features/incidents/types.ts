export interface Incident {
  id: string;
  title: string;
  description: string;
  category: IncidentCategory;
  severity: IncidentSeverity;
  status: IncidentStatus;
  location: string;
  reporter: string;
  reportedAt: Date;
  updatedAt: Date;
  moderatorNotes?: string;
  actions: IncidentAction[];
}

export type IncidentCategory =
  | "theft"
  | "suspicious-activity"
  | "missing-person"
  | "accident"
  | "vandalism"
  | "other";

export type IncidentSeverity = "low" | "medium" | "high" | "critical";

export type IncidentStatus =
  | "pending"
  | "verified"
  | "investigating"
  | "resolved"
  | "dismissed";

export interface IncidentAction {
  id: string;
  type:
    | "alert-sent"
    | "authorities-contacted"
    | "investigation-started"
    | "resolved";
  description: string;
  timestamp: Date;
}

export interface IncidentReportForm {
  title: string;
  description: string;
  category: IncidentCategory;
  severity: IncidentSeverity;
  location: string;
  reporter: string;
  contactInfo?: string;
  isAnonymous: boolean;
  incidentDate: string;
  incidentTime: string;
  photo?: File;
}
