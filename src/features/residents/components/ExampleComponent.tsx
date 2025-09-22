import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import {
  Users,
  Calendar,
  Shield,
  TrendingUp,
  AlertTriangle,
  Phone,
  Clipboard,
  ArrowRight,
  Clock,
  MapPin,
  Eye,
} from "lucide-react";
import type {
  CommunityStats,
  WeatherAlert,
  QuickAction,
  Announcement,
  EmergencyContact,
  VolunteeringEvent,
  Incident,
} from "../types";

// Welcome Banner Component
export const WelcomeBanner: React.FC<{
  userName: string;
  communityName: string;
  role: string;
  isVerified: boolean;
}> = ({ userName, communityName, role, isVerified }) => (
  <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-green-600 via-orange-500 to-blue-500 p-6 text-white">
    <div className="relative z-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            🏠 Welcome {userName}
          </h1>
          <p className="text-white/90 mt-1">
            Stay connected with your {communityName} community
          </p>
          <div className="flex gap-2 mt-3">
            <Badge
              variant="secondary"
              className="bg-white/20 text-white border-white/30"
            >
              {role}
            </Badge>
            {isVerified && (
              <Badge
                variant="secondary"
                className="bg-white/20 text-white border-white/30"
              >
                Verified
              </Badge>
            )}
          </div>
        </div>
        <div className="text-6xl opacity-20">👤</div>
      </div>
    </div>
  </div>
);

// Community Stats Component
export const CommunityStatsCards: React.FC<{ stats: CommunityStats }> = ({
  stats,
}) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <Users className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              {stats.activeResidents}
            </h3>
            <p className="text-sm text-gray-600">Active Residents</p>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardContent className="p-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Calendar className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              {stats.monthlyEvents}
            </h3>
            <p className="text-sm text-gray-600">This Month Events</p>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardContent className="p-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-yellow-100 rounded-lg">
            <Shield className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              {stats.safetyReports}
            </h3>
            <p className="text-sm text-gray-600">Safety Reports</p>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardContent className="p-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-pink-100 rounded-lg">
            <TrendingUp className="w-6 h-6 text-pink-600" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              {stats.communityScore}%
            </h3>
            <p className="text-sm text-gray-600">Community Score</p>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

// Weather Alert Component
export const WeatherAlertCard: React.FC<{ alert: WeatherAlert }> = ({
  alert,
}) => (
  <Card className="border-red-200 bg-red-50">
    <CardContent className="p-4">
      <div className="flex items-start space-x-3">
        <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-red-900">{alert.title}</h3>
            <Badge variant="destructive" className="text-xs">
              {alert.type}
            </Badge>
          </div>
          <p className="text-red-800 text-sm mb-2">{alert.message}</p>
          <p className="text-red-600 text-xs">{alert.timestamp}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

// Quick Actions Component
export const QuickActionsSection: React.FC<{ actions: QuickAction[] }> = ({
  actions,
}) => (
  <div className="space-y-4">
    <div className="flex items-center gap-2">
      <div className="text-2xl">⚡</div>
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
        <p className="text-sm text-gray-600">
          Quick access to essential community features
        </p>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {actions.map((action) => (
        <Card
          key={action.id}
          className={`border-${action.color}-200 bg-${action.color}-50`}
        >
          <CardContent className="p-4">
            <div className="text-2xl mb-2">{action.icon}</div>
            <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{action.description}</p>
            <button
              onClick={action.action}
              className={`w-full bg-${action.color}-600 text-white px-4 py-2 rounded-lg hover:bg-${action.color}-700 transition-colors`}
            >
              {action.buttonText}
            </button>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

// Announcements Component
export const AnnouncementsSection: React.FC<{
  announcements: Announcement[];
}> = ({ announcements }) => (
  <Card>
    <CardHeader>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clipboard className="w-5 h-5 text-gray-600" />
          <div>
            <CardTitle>Latest Announcements</CardTitle>
            <p className="text-sm text-gray-600">
              Stay informed with community updates
            </p>
          </div>
        </div>
        <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm">
          View All <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      {announcements.map((announcement) => (
        <div
          key={announcement.id}
          className="border-b border-gray-100 pb-4 last:border-b-0"
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              {announcement.isPinned && (
                <Badge variant="secondary" className="text-xs">
                  Pinned
                </Badge>
              )}
              <Badge variant="outline" className="text-xs">
                {announcement.type}
              </Badge>
            </div>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">
            {announcement.title}
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            {announcement.description}
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>{announcement.publishDate}</span>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {announcement.views} Views
            </span>
            <span>By {announcement.author}</span>
            <button className="text-blue-600 hover:text-blue-700">
              Read More
            </button>
          </div>
        </div>
      ))}
    </CardContent>
  </Card>
);

// Emergency Contacts Component
export const EmergencyContactsSection: React.FC<{
  contacts: EmergencyContact[];
}> = ({ contacts }) => (
  <Card>
    <CardHeader>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Phone className="w-5 h-5 text-gray-600" />
          <CardTitle>Emergency Contacts</CardTitle>
        </div>
        <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm">
          View All <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </CardHeader>
    <CardContent className="space-y-3">
      {contacts.map((contact) => (
        <div
          key={contact.id}
          className="flex items-center justify-between p-3 bg-red-50 rounded-lg"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <Phone className="w-4 h-4 text-red-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">{contact.name}</p>
              <p className="text-sm text-gray-600">{contact.phone}</p>
            </div>
          </div>
        </div>
      ))}
    </CardContent>
  </Card>
);

// Volunteering Events Component
export const VolunteeringEventsSection: React.FC<{
  events: VolunteeringEvent[];
}> = ({ events }) => (
  <Card>
    <CardHeader>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-gray-600" />
          <div>
            <CardTitle>Upcoming Volunteering Events</CardTitle>
            <p className="text-sm text-gray-600">
              Make a difference in your community
            </p>
          </div>
        </div>
        <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm">
          View All <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      {events.map((event) => (
        <div key={event.id} className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                {event.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2">{event.description}</p>
            </div>
            <Badge variant="outline">{event.status}</Badge>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {event.date} at {event.time}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {event.location}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {event.currentVolunteers}/{event.maxVolunteers} Volunteers
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
              Join Event
            </button>
          </div>
        </div>
      ))}
    </CardContent>
  </Card>
);
// Incidents Component
export const IncidentsSection: React.FC<{
  incidents: Incident[];
}> = ({ incidents }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-blue-100 text-blue-800";
      case "Resolved":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "infrastructure":
        return "bg-yellow-50 border-yellow-200";
      case "security":
        return "bg-red-50 border-red-200";
      case "safety":
        return "bg-green-50 border-green-200";
      case "environment":
        return "bg-blue-50 border-blue-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  const getTitleColor = (category: string) => {
    switch (category) {
      case "infrastructure":
        return "text-orange-700";
      case "security":
        return "text-red-700";
      case "safety":
        return "text-green-700";
      case "environment":
        return "text-blue-700";
      default:
        return "text-gray-700";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <CardTitle className="text-red-700">
              Latest Incident Reports
            </CardTitle>
          </div>
          <button className="flex items-center gap-1 text-red-600 hover:text-red-700 text-sm font-medium">
            View All Reports <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {incidents.map((incident) => (
          <div
            key={incident.id}
            className={`p-4 rounded-lg border ${getCategoryColor(
              incident.category
            )}`}
          >
            <div className="flex items-start justify-between mb-3">
              <h3
                className={`font-bold text-lg ${getTitleColor(
                  incident.category
                )}`}
              >
                {incident.title}
              </h3>
              <Badge className={getStatusColor(incident.status)}>
                {incident.status}
              </Badge>
            </div>

            <p className="text-gray-600 text-sm mb-4">{incident.description}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{incident.location}</span>
                </div>
                <div>
                  <span>Reported by: {incident.reportedBy}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>{incident.timeReported}</span>
                </div>
                <Badge className={getPriorityColor(incident.priority)}>
                  {incident.priority} priority
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default function ResidentsDashboard() {
  return <div>Residents Dashboard Components</div>;
}
