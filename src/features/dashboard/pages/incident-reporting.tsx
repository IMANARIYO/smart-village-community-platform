"use client"

import { useState } from "react"
import { AlertTriangle, Plus, MapPin, Clock, Eye, Camera } from "lucide-react"

const IncidentReporting = () => {
  const [showForm, setShowForm] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState("all")

  const incidents = [
    {
      id: 1,
      title: "Suspicious Activity Near School",
      description: "Unknown individuals were seen loitering around the primary school during evening hours.",
      location: "Primary School Area",
      reportedBy: "Anonymous",
      date: "2024-12-20",
      time: "18:30",
      status: "investigating",
      priority: "high",
      category: "security",
      hasImage: true,
    },
    {
      id: 2,
      title: "Street Light Not Working",
      description: "The street light on Main Road has been out for 3 days, creating safety concerns.",
      location: "Main Road, Sector A",
      reportedBy: "John Mukamana",
      date: "2024-12-19",
      time: "20:15",
      status: "resolved",
      priority: "medium",
      category: "infrastructure",
      hasImage: false,
    },
    {
      id: 3,
      title: "Water Pipe Burst",
      description: "Water pipe burst near the market area, causing flooding and water shortage.",
      location: "Market Area",
      reportedBy: "Marie Uwimana",
      date: "2024-12-18",
      time: "14:20",
      status: "in_progress",
      priority: "high",
      category: "utilities",
      hasImage: true,
    },
    {
      id: 4,
      title: "Stray Dogs in Residential Area",
      description: "Pack of stray dogs causing disturbance and safety concerns for children.",
      location: "Residential Zone B",
      reportedBy: "Paul Nzeyimana",
      date: "2024-12-17",
      time: "16:45",
      status: "pending",
      priority: "medium",
      category: "safety",
      hasImage: false,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "investigating":
        return "bg-blue-100 text-blue-800"
      case "in_progress":
        return "bg-orange-100 text-orange-800"
      case "resolved":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "security":
        return "🔒"
      case "infrastructure":
        return "🏗️"
      case "utilities":
        return "🔧"
      case "safety":
        return "⚠️"
      case "environment":
        return "🌱"
      default:
        return "📋"
    }
  }

  const filteredIncidents =
    selectedStatus === "all" ? incidents : incidents.filter((incident) => incident.status === selectedStatus)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Incident Reporting & Alerts</h2>
          <p className="text-gray-600">Report incidents and track community safety issues</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          <Plus className="w-4 h-4" />
          <span>Report Incident</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-8 h-8 text-red-600" />
            <div>
              <h3 className="text-2xl font-bold text-red-900">8</h3>
              <p className="text-sm text-red-700">Active Incidents</p>
            </div>
          </div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">⏳</div>
            <div>
              <h3 className="text-2xl font-bold text-yellow-900">3</h3>
              <p className="text-sm text-yellow-700">Under Investigation</p>
            </div>
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">✅</div>
            <div>
              <h3 className="text-2xl font-bold text-green-900">15</h3>
              <p className="text-sm text-green-700">Resolved This Month</p>
            </div>
          </div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">🚨</div>
            <div>
              <h3 className="text-2xl font-bold text-blue-900">2</h3>
              <p className="text-sm text-blue-700">High Priority</p>
            </div>
          </div>
        </div>
      </div>

      {/* Report Form */}
      {showForm && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Report New Incident</h3>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Incident Title</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Brief description of the incident"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                  <option value="">Select category</option>
                  <option value="security">Security</option>
                  <option value="infrastructure">Infrastructure</option>
                  <option value="utilities">Utilities</option>
                  <option value="safety">Safety</option>
                  <option value="environment">Environment</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Where did this incident occur?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority Level</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Provide detailed information about the incident..."
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Attach Photo (Optional)</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <input type="checkbox" id="anonymous-report" className="rounded" />
              <label htmlFor="anonymous-report" className="text-sm text-gray-700">
                Report anonymously
              </label>
            </div>

            <div className="flex space-x-3">
              <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                Submit Report
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filter */}
      <div className="flex space-x-2 overflow-x-auto">
        {[
          { id: "all", name: "All Incidents", count: incidents.length },
          { id: "pending", name: "Pending", count: incidents.filter((i) => i.status === "pending").length },
          {
            id: "investigating",
            name: "Investigating",
            count: incidents.filter((i) => i.status === "investigating").length,
          },
          { id: "in_progress", name: "In Progress", count: incidents.filter((i) => i.status === "in_progress").length },
          { id: "resolved", name: "Resolved", count: incidents.filter((i) => i.status === "resolved").length },
        ].map((filter) => (
          <button
            key={filter.id}
            onClick={() => setSelectedStatus(filter.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap ${
              selectedStatus === filter.id ? "bg-red-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <span>{filter.name}</span>
            <span className="text-xs bg-white bg-opacity-20 px-2 py-0.5 rounded-full">{filter.count}</span>
          </button>
        ))}
      </div>

      {/* Incidents List */}
      <div className="space-y-4">
        {filteredIncidents.map((incident) => (
          <div key={incident.id} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-3">
                <div className="text-2xl">{getCategoryIcon(incident.category)}</div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{incident.title}</h3>
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(incident.priority)}`}
                    >
                      {incident.priority} priority
                    </div>
                  </div>
                  <p className="text-gray-600 mb-3">{incident.description}</p>
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{incident.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>
                        {incident.date} at {incident.time}
                      </span>
                    </div>
                    <span>Reported by {incident.reportedBy}</span>
                    {incident.hasImage && (
                      <div className="flex items-center space-x-1 text-blue-600">
                        <Camera className="w-4 h-4" />
                        <span>Photo attached</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(incident.status)}`}>
                {incident.status.replace("_", " ")}
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
              <div className="text-sm text-gray-500">
                Category: <span className="capitalize">{incident.category}</span>
              </div>
              <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                <Eye className="w-4 h-4" />
                <span className="text-sm">View Details</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default IncidentReporting
