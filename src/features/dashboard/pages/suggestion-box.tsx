"use client"

import { useState } from "react"
import { Lightbulb, Plus, MessageSquare, ThumbsUp, Eye } from "lucide-react"

const SuggestionBox = () => {
  const [activeTab, setActiveTab] = useState("all")
  const [showForm, setShowForm] = useState(false)

  const suggestions = [
    {
      id: 1,
      title: "Install Solar Street Lights",
      description:
        "We need better lighting on the main road for safety during evening hours. Solar lights would be cost-effective and environmentally friendly.",
      author: "Anonymous",
      date: "2024-12-18",
      status: "under_review",
      category: "infrastructure",
      votes: 23,
      comments: 5,
    },
    {
      id: 2,
      title: "Community Garden Project",
      description:
        "Create a shared garden space where residents can grow vegetables and herbs together. This would promote food security and community bonding.",
      author: "Marie Uwimana",
      date: "2024-12-17",
      status: "approved",
      category: "community",
      votes: 45,
      comments: 12,
    },
    {
      id: 3,
      title: "Youth Skills Training Program",
      description:
        "Organize regular training sessions for young people in digital skills, entrepreneurship, and vocational training.",
      author: "Paul Nzeyimana",
      date: "2024-12-16",
      status: "pending",
      category: "education",
      votes: 18,
      comments: 3,
    },
    {
      id: 4,
      title: "Improve Waste Collection Schedule",
      description:
        "The current waste collection happens only once a week. We need more frequent collection, especially during rainy season.",
      author: "Anonymous",
      date: "2024-12-15",
      status: "implemented",
      category: "environment",
      votes: 67,
      comments: 8,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "under_review":
        return "bg-blue-100 text-blue-800"
      case "approved":
        return "bg-green-100 text-green-800"
      case "implemented":
        return "bg-purple-100 text-purple-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "infrastructure":
        return "🏗️"
      case "community":
        return "🤝"
      case "education":
        return "📚"
      case "environment":
        return "🌱"
      case "health":
        return "🏥"
      default:
        return "💡"
    }
  }

  const filteredSuggestions = activeTab === "all" ? suggestions : suggestions.filter((s) => s.status === activeTab)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Suggestion Box & Feedback</h2>
          <p className="text-gray-600">Share your ideas and feedback to improve our community</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          <span>New Suggestion</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center space-x-3">
            <Lightbulb className="w-8 h-8 text-blue-600" />
            <div>
              <h3 className="text-2xl font-bold text-blue-900">24</h3>
              <p className="text-sm text-blue-700">Total Suggestions</p>
            </div>
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">✅</div>
            <div>
              <h3 className="text-2xl font-bold text-green-900">8</h3>
              <p className="text-sm text-green-700">Implemented</p>
            </div>
          </div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">⏳</div>
            <div>
              <h3 className="text-2xl font-bold text-yellow-900">12</h3>
              <p className="text-sm text-yellow-700">Under Review</p>
            </div>
          </div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <div className="flex items-center space-x-3">
            <ThumbsUp className="w-8 h-8 text-purple-600" />
            <div>
              <h3 className="text-2xl font-bold text-purple-900">153</h3>
              <p className="text-sm text-purple-700">Total Votes</p>
            </div>
          </div>
        </div>
      </div>

      {/* New Suggestion Form */}
      {showForm && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Submit New Suggestion</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Brief title for your suggestion"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Select a category</option>
                <option value="infrastructure">Infrastructure</option>
                <option value="community">Community</option>
                <option value="education">Education</option>
                <option value="environment">Environment</option>
                <option value="health">Health</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe your suggestion in detail..."
              ></textarea>
            </div>
            <div className="flex items-center space-x-3">
              <input type="checkbox" id="anonymous" className="rounded" />
              <label htmlFor="anonymous" className="text-sm text-gray-700">
                Submit anonymously
              </label>
            </div>
            <div className="flex space-x-3">
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Submit Suggestion
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

      {/* Filter Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: "all", name: "All Suggestions", count: suggestions.length },
            { id: "pending", name: "Pending", count: suggestions.filter((s) => s.status === "pending").length },
            {
              id: "under_review",
              name: "Under Review",
              count: suggestions.filter((s) => s.status === "under_review").length,
            },
            { id: "approved", name: "Approved", count: suggestions.filter((s) => s.status === "approved").length },
            {
              id: "implemented",
              name: "Implemented",
              count: suggestions.filter((s) => s.status === "implemented").length,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <span>{tab.name}</span>
              <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">{tab.count}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Suggestions List */}
      <div className="space-y-4">
        {filteredSuggestions.map((suggestion) => (
          <div key={suggestion.id} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-3">
                <div className="text-2xl">{getCategoryIcon(suggestion.category)}</div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{suggestion.title}</h3>
                  <p className="text-gray-600 mb-3">{suggestion.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>By {suggestion.author}</span>
                    <span>•</span>
                    <span>{suggestion.date}</span>
                    <span>•</span>
                    <span className="capitalize">{suggestion.category}</span>
                  </div>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(suggestion.status)}`}>
                {suggestion.status.replace("_", " ")}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-6">
                <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500">
                  <ThumbsUp className="w-4 h-4" />
                  <span className="text-sm">{suggestion.votes}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-sm">{suggestion.comments}</span>
                </button>
              </div>
              <button className="flex items-center space-x-2 text-gray-500 hover:text-gray-700">
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

export default SuggestionBox
