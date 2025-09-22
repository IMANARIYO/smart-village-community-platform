export interface Resident {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  role:
    | "Resident"
    | "Community Leader"
    | "Health Department"
    | "Health Council";
  status: "Active" | "Inactive" | "Pending";
  joinDate: string;
  profileImage?: string;
  isVerified: boolean;
  communityScore: number;
}

export interface CommunityStats {
  activeResidents: number;
  monthlyEvents: number;
  safetyReports: number;
  communityScore: number;
}

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  type: "Police" | "Fire" | "Ambulance" | "Village Leader";
}

export interface Announcement {
  id: string;
  title: string;
  description: string;
  type: "Announcement" | "Event" | "News";
  author: string;
  publishDate: string;
  views: number;
  isPinned: boolean;
}

export interface VolunteeringEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  currentVolunteers: number;
  maxVolunteers: number;
  status: "Upcoming" | "Ongoing" | "Completed";
}

export interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  buttonText: string;
  action: () => void;
}

export interface WeatherAlert {
  id: string;
  title: string;
  message: string;
  type: "Emergency" | "Warning" | "Info";
  timestamp: string;
  isActive: boolean;
}

export interface Incident {
  id: string;
  title: string;
  description: string;
  location: string;
  reportedBy: string;
  timeReported: string;
  status: "Active" | "Resolved" | "Pending";
  priority: "low" | "medium" | "high";
  category: "infrastructure" | "security" | "safety" | "environment";
}
