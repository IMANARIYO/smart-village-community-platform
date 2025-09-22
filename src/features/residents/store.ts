import { create } from "zustand";
import { dashboardService } from "./dashboardService";
import type {
  Resident,
  CommunityStats,
  EmergencyContact,
  Announcement,
  VolunteeringEvent,
  QuickAction,
  WeatherAlert,
  Incident,
} from "./types";

interface ResidentsState {
  // Data
  residents: Resident[];
  communityStats: CommunityStats;
  emergencyContacts: EmergencyContact[];
  announcements: Announcement[];
  volunteeringEvents: VolunteeringEvent[];
  quickActions: QuickAction[];
  weatherAlerts: WeatherAlert[];
  incidents: Incident[];

  // UI State
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchResidents: () => Promise<void>;
  fetchCommunityStats: () => Promise<void>;
  fetchEmergencyContacts: () => Promise<void>;
  fetchAnnouncements: () => Promise<void>;
  fetchVolunteeringEvents: () => Promise<void>;
  fetchWeatherAlerts: () => Promise<void>;
  fetchIncidents: () => Promise<void>;
  addResident: (resident: Omit<Resident, "id">) => void;
  updateResident: (id: string, updates: Partial<Resident>) => void;
  deleteResident: (id: string) => void;
}

export const useResidentsStore = create<ResidentsState>((set) => ({
  // Initial state
  residents: [],
  communityStats: {
    activeResidents: 1123,
    monthlyEvents: 12,
    safetyReports: 3,
    communityScore: 95,
  },
  emergencyContacts: [
    {
      id: "1",
      name: "National Police Emergency",
      phone: "112",
      type: "Police",
    },
    { id: "2", name: "Fire Emergency Services", phone: "101", type: "Fire" },
    { id: "3", name: "Ambulance Services", phone: "113", type: "Ambulance" },
    {
      id: "4",
      name: "Village Leader",
      phone: "+250789965763",
      type: "Village Leader",
    },
  ],
  announcements: [
    {
      id: "1",
      title: "Umuganda Day: Community Cleanup",
      description:
        "Join us for our monthly community cleanup initiative. Bring your tools and help keep our neighborhood clean and beautiful.",
      type: "Announcement",
      author: "Community Leader",
      publishDate: "30 Minutes Ago",
      views: 234,
      isPinned: true,
    },
    {
      id: "2",
      title: "Health Fair: Free Screenings",
      description:
        "Free health screenings, nutrition workshops, and wellness tips for all residents.",
      type: "Event",
      author: "Health Department",
      publishDate: "1 Hour Ago",
      views: 150,
      isPinned: false,
    },
    {
      id: "3",
      title: "New Health Center Opening",
      description:
        "We are excited to announce the opening of our new health center next month.",
      type: "News",
      author: "Health Council",
      publishDate: "2 Hours Ago",
      views: 90,
      isPinned: false,
    },
  ],
  volunteeringEvents: [
    {
      id: "1",
      title: "Tree Planting Drive",
      description:
        "Help us plant trees to improve air quality and beautify our community.",
      date: "1/12/2025",
      time: "08:00",
      location: "Youth Center",
      currentVolunteers: 15,
      maxVolunteers: 30,
      status: "Upcoming",
    },
    {
      id: "2",
      title: "Youth Mentorship Program",
      description:
        "Mentor young people in our community and help shape the next generation.",
      date: "1/12/2025",
      time: "08:00",
      location: "Youth Center",
      currentVolunteers: 15,
      maxVolunteers: 30,
      status: "Upcoming",
    },
  ],
  quickActions: [
    {
      id: "1",
      title: "Safety First",
      description:
        "Report incidents and safety concerns to keep our community secure.",
      icon: "⚠️",
      color: "red",
      buttonText: "Report Incident",
      action: () => console.log("Report incident clicked"),
    },
    {
      id: "2",
      title: "Guest Management",
      description: "Manage visitors and guest access to our community.",
      icon: "👤",
      color: "blue",
      buttonText: "Manage Visitors",
      action: () => console.log("Manage visitors clicked"),
    },
    {
      id: "3",
      title: "Give Back",
      description:
        "Join volunteering opportunities and make a difference in your community.",
      icon: "❤️",
      color: "yellow",
      buttonText: "Join Volunteering",
      action: () => console.log("Join volunteering clicked"),
    },
  ],
  weatherAlerts: [
    {
      id: "1",
      title: "Heavy Rain Warning",
      message:
        "Heavy rainfall expected tonight from 8 PM to 6 AM. Please secure loose items and avoid unnecessary travel.",
      type: "Emergency",
      timestamp: "30 Minutes Ago",
      isActive: true,
    },
  ],
  incidents: [
    {
      id: "1",
      title: "Street Light Outage",
      description: "Street light on Main Road has been broken for three days",
      location: "Main Road",
      reportedBy: "Jean Mukamana",
      timeReported: "2 hours ago",
      status: "Active",
      priority: "medium",
      category: "infrastructure",
    },
    {
      id: "2",
      title: "Suspicious Activity",
      description: "Unusual activity reported near the school area",
      location: "Primary School",
      reportedBy: "Anonymous",
      timeReported: "5 hours ago",
      status: "Active",
      priority: "high",
      category: "security",
    },
    {
      id: "3",
      title: "Road Pothole",
      description: "Large pothole causing issues for vehicles",
      location: "Market Street",
      reportedBy: "Marie Uwimana",
      timeReported: "1 day ago",
      status: "Resolved",
      priority: "low",
      category: "safety",
    },
  ],
  isLoading: false,
  error: null,

  // Actions
  fetchResidents: async () => {
    set({ isLoading: true, error: null });
    try {
      // Mock API call - using mock data only
      const mockResidents: Resident[] = [
        {
          id: "1",
          name: "John Doe",
          email: "john.doe@example.com",
          phone: "+250789123456",
          address: "Kimisagara Village",
          role: "Resident",
          status: "Active",
          joinDate: "2023-01-15",
          isVerified: true,
          communityScore: 95,
        },
      ];
      set({ residents: mockResidents, isLoading: false });
    } catch (error) {
      set({ error: "Failed to fetch residents", isLoading: false });
    }
  },

  fetchCommunityStats: async () => {
    try {
      const stats = await dashboardService.getCommunityStats();
      set({ communityStats: stats, isLoading: false });
    } catch (error) {
      set({ error: "Failed to fetch community stats", isLoading: false });
      console.error("Error fetching community stats:", error);
    }
  },

  fetchEmergencyContacts: async () => {
    try {
      const contacts = await dashboardService.getEmergencyContacts();
      set({ emergencyContacts: contacts, isLoading: false });
    } catch (error) {
      set({ error: "Failed to fetch emergency contacts", isLoading: false });
      console.error("Error fetching emergency contacts:", error);
    }
  },

  fetchAnnouncements: async () => {
    try {
      const announcements = await dashboardService.getAnnouncements();
      set({ announcements, isLoading: false });
    } catch (error) {
      set({ error: "Failed to fetch announcements", isLoading: false });
      console.error("Error fetching announcements:", error);
    }
  },

  fetchVolunteeringEvents: async () => {
    try {
      const events = await dashboardService.getVolunteeringEvents();
      set({ volunteeringEvents: events, isLoading: false });
    } catch (error) {
      set({ error: "Failed to fetch volunteering events", isLoading: false });
      console.error("Error fetching volunteering events:", error);
    }
  },

  fetchWeatherAlerts: async () => {
    try {
      const alerts = await dashboardService.getWeatherAlerts();
      set({ weatherAlerts: alerts, isLoading: false });
    } catch (error) {
      set({ error: "Failed to fetch weather alerts", isLoading: false });
      console.error("Error fetching weather alerts:", error);
    }
  },

  fetchIncidents: async () => {
    try {
      const incidents = await dashboardService.getIncidents();
      set({ incidents, isLoading: false });
    } catch (error) {
      set({ error: "Failed to fetch incidents", isLoading: false });
      console.error("Error fetching incidents:", error);
    }
  },

  addResident: (resident) => {
    const newResident: Resident = {
      ...resident,
      id: Date.now().toString(),
    };
    set((state) => ({ residents: [...state.residents, newResident] }));
  },

  updateResident: (id, updates) => {
    set((state) => ({
      residents: state.residents.map((resident) =>
        resident.id === id ? { ...resident, ...updates } : resident
      ),
    }));
  },

  deleteResident: (id) => {
    set((state) => ({
      residents: state.residents.filter((resident) => resident.id !== id),
    }));
  },
}));
