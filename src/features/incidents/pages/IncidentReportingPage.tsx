import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import IncidentReportForm from "@/components/forms/IncidentReportForm";
import ResidentsNavbar from "@/features/residents/components/ResidentsNavbar";
import type {
  Incident,
  IncidentCategory,
  IncidentReportForm as IncidentFormData,
} from "../types";
import {
  AlertTriangle,
  MapPin,
  Clock,
  User,
  CheckCircle,
  Phone,
  Shield,
} from "lucide-react";

// Mock data for demonstration
const mockIncidents: Incident[] = [
  {
    id: "1",
    title: "Suspicious Person Near School",
    description:
      "A person has been seen lurking around the primary school during lunch hours for the past two days. Children reported feeling uncomfortable.",
    category: "suspicious-activity",
    severity: "high",
    status: "verified",
    location: "Primary School Gate",
    reporter: "Anonymous",
    reportedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    moderatorNotes: "Police have been notified and are investigating.",
    actions: [
      {
        id: "1",
        type: "alert-sent",
        description: "Alert Sent to Community",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      },
      {
        id: "2",
        type: "authorities-contacted",
        description: "Authorities Contacted",
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      },
    ],
  },
  {
    id: "2",
    title: "Bicycle Theft",
    description:
      "My bicycle was stolen from outside the community center yesterday evening around 7 PM. It was a red mountain bike with black handles.",
    category: "theft",
    severity: "medium",
    status: "pending",
    location: "Community Center",
    reporter: "Jean Mukamana",
    reportedAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    actions: [],
  },
];

const CATEGORY_LABELS: Record<IncidentCategory, string> = {
  theft: "Theft",
  "suspicious-activity": "Suspicious Activity",
  "missing-person": "Missing Person",
  accident: "Accident",
  vandalism: "Vandalism",
  other: "Other",
};

const STATUS_COLORS: Record<string, string> = {
  verified: "bg-blue-100 text-blue-800",
  pending: "bg-yellow-100 text-yellow-800",
  investigating: "bg-orange-100 text-orange-800",
  resolved: "bg-green-100 text-green-800",
  dismissed: "bg-gray-100 text-gray-800",
};

const SEVERITY_COLORS: Record<string, string> = {
  low: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-orange-100 text-orange-800",
  critical: "bg-red-100 text-red-800",
};

const ACTION_ICONS: Record<string, React.ReactNode> = {
  "alert-sent": <CheckCircle className="h-4 w-4 text-green-600" />,
  "authorities-contacted": <Phone className="h-4 w-4 text-blue-600" />,
  "investigation-started": <Shield className="h-4 w-4 text-orange-600" />,
  resolved: <CheckCircle className="h-4 w-4 text-green-600" />,
};

export default function IncidentReportingPage() {
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);
  const [selectedCategory, setSelectedCategory] = useState<
    IncidentCategory | "all"
  >("all");
  const [isReportFormOpen, setIsReportFormOpen] = useState(false);

  const filteredIncidents =
    selectedCategory === "all"
      ? incidents
      : incidents.filter((incident) => incident.category === selectedCategory);

  const handleSubmitReport = (formData: IncidentFormData) => {
    // Create a date from the form data
    const incidentDateTime = new Date(`${formData.incidentDate}T${formData.incidentTime}`);
    
    const newIncident: Incident = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      category: formData.category,
      severity: formData.severity,
      status: "pending",
      location: formData.location,
      reporter: formData.isAnonymous ? "Anonymous" : formData.reporter,
      reportedAt: incidentDateTime,
      updatedAt: new Date(),
      actions: [],
    };

    setIncidents((prev) => [newIncident, ...prev]);
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24)
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ResidentsNavbar />
      <div className="pt-4 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header Section */}
        <div className="bg-white rounded-lg border border-green-200 p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Incident Reporting & Alerts
              </h1>
              <p className="text-gray-600 text-lg">
                Stay connected with your neighbors and community announcements
              </p>
            </div>
            <div className="flex-shrink-0">
              <Button
                onClick={() => setIsReportFormOpen(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200"
              >
                <AlertTriangle className="h-5 w-5 mr-2" />
                Report Incident
              </Button>
            </div>
          </div>
        </div>

        {/* Security Leader Contact */}
        <div className="bg-white rounded-lg border border-red-200 p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-red-100 rounded-full">
                <Phone className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">Security Leader</h3>
                <p className="text-red-600 font-medium text-lg">+250789965763</p>
              </div>
            </div>
            <div className="flex-shrink-0">
              <Button
                variant="outline"
                className="border-red-600 text-red-600 hover:bg-red-50 px-6 py-2 font-semibold"
              >
                <Phone className="h-4 w-4 mr-2" />
                Call Now
              </Button>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-lg border border-green-200 p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-shrink-0">
              <span className="text-gray-700 font-semibold text-lg">
                Filter By Category:
              </span>
            </div>
            <div className="flex flex-wrap gap-2 flex-1">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("all")}
                className={
                  selectedCategory === "all"
                    ? "bg-green-600 hover:bg-green-700 text-white font-medium"
                    : "hover:bg-green-50 hover:text-green-700"
                }
              >
                All
              </Button>
              {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                <Button
                  key={key}
                  variant={selectedCategory === key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(key as IncidentCategory)}
                  className={
                    selectedCategory === key
                      ? "bg-green-600 hover:bg-green-700 text-white font-medium"
                      : "hover:bg-green-50 hover:text-green-700"
                  }
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Incidents List */}
        <div className="space-y-4">
          {filteredIncidents.length === 0 ? (
            <div className="bg-white rounded-lg border p-8 text-center shadow-sm">
              <div className="p-4 bg-gray-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <AlertTriangle className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No incidents found
              </h3>
              <p className="text-gray-600 text-lg">
                {selectedCategory === "all"
                  ? "No incidents have been reported yet."
                  : `No incidents found in the ${
                      CATEGORY_LABELS[selectedCategory as IncidentCategory]
                    } category.`}
              </p>
            </div>
          ) : (
            filteredIncidents.map((incident) => (
              <div
                key={incident.id}
                className="bg-white rounded-lg border p-6 space-y-4 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                {/* Incident Header */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {incident.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge className={STATUS_COLORS[incident.status]}>
                        {incident.status.charAt(0).toUpperCase() +
                          incident.status.slice(1)}
                      </Badge>
                      <Badge className={SEVERITY_COLORS[incident.severity]}>
                        {incident.severity.charAt(0).toUpperCase() +
                          incident.severity.slice(1)}
                      </Badge>
                      <Badge className="bg-orange-100 text-orange-800">
                        {CATEGORY_LABELS[incident.category]}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-700 leading-relaxed">
                  {incident.description}
                </p>

                {/* Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{incident.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{formatTimeAgo(incident.reportedAt)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{incident.reporter}</span>
                  </div>
                </div>

                {/* Actions */}
                {incident.actions.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">
                      Actions Taken:
                    </h4>
                    <div className="space-y-1">
                      {incident.actions.map((action) => (
                        <div
                          key={action.id}
                          className="flex items-center gap-2 text-sm"
                        >
                          {ACTION_ICONS[action.type]}
                          <span className="text-green-600">
                            {action.description}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Moderator Notes */}
                {incident.moderatorNotes && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">
                      Moderator Notes
                    </h4>
                    <p className="text-blue-800">{incident.moderatorNotes}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
        </div>
      </div>

      {/* Report Form Dialog */}
      <IncidentReportForm
        onSubmit={handleSubmitReport}
        isOpen={isReportFormOpen}
        onOpenChange={setIsReportFormOpen}
      />
    </div>
  );
}
