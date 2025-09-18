"use client"

import { useState } from "react"
import { Phone, Search, MapPin, Clock } from "lucide-react"

const EssentialContacts = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const contacts = [
    {
      id: 1,
      name: "Emergency Services",
      phone: "112",
      category: "emergency",
      description: "24/7 Emergency Response",
      location: "District Hospital",
      hours: "24/7",
      priority: "high",
    },
    {
      id: 2,
      name: "Village Leader - Jean Baptiste",
      phone: "+250788123456",
      category: "leadership",
      description: "Village Executive Secretary",
      location: "Village Office",
      hours: "8:00 AM - 5:00 PM",
      priority: "high",
    },
    {
      id: 3,
      name: "Health Center",
      phone: "+250788234567",
      category: "health",
      description: "Primary Healthcare Services",
      location: "Village Health Center",
      hours: "7:00 AM - 6:00 PM",
      priority: "high",
    },
    {
      id: 4,
      name: "Police Station",
      phone: "+250788345678",
      category: "emergency",
      description: "Local Police Services",
      location: "Sector Police Post",
      hours: "24/7",
      priority: "high",
    },
    {
      id: 5,
      name: "Dr. Sarah Mukamana",
      phone: "+250788456789",
      category: "health",
      description: "Community Health Worker",
      location: "Mobile Service",
      hours: "Tue, Thu: 9:00 AM - 4:00 PM",
      priority: "medium",
    },
    {
      id: 6,
      name: "Water Committee Chair",
      phone: "+250788567890",
      category: "utilities",
      description: "Water System Management",
      location: "Water Treatment Plant",
      hours: "8:00 AM - 5:00 PM",
      priority: "medium",
    },
  ]

  const categories = [
    { id: "all", name: "All Contacts", count: contacts.length },
    { id: "emergency", name: "Emergency", count: contacts.filter((c) => c.category === "emergency").length },
    { id: "health", name: "Health", count: contacts.filter((c) => c.category === "health").length },
    { id: "leadership", name: "Leadership", count: contacts.filter((c) => c.category === "leadership").length },
    { id: "utilities", name: "Utilities", count: contacts.filter((c) => c.category === "utilities").length },
  ]

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || contact.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, "_self")
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "emergency":
        return "🚨"
      case "health":
        return "🏥"
      case "leadership":
        return "👥"
      case "utilities":
        return "🔧"
      default:
        return "📞"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Essential Contacts Directory</h2>
        <p className="text-gray-600">Emergency numbers, village leaders, and essential services</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">🚨</div>
            <div>
              <h3 className="text-2xl font-bold text-red-900">2</h3>
              <p className="text-sm text-red-700">Emergency Contacts</p>
            </div>
          </div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">🏥</div>
            <div>
              <h3 className="text-2xl font-bold text-blue-900">2</h3>
              <p className="text-sm text-blue-700">Health Services</p>
            </div>
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">👥</div>
            <div>
              <h3 className="text-2xl font-bold text-green-900">1</h3>
              <p className="text-sm text-green-700">Leadership</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex space-x-2 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap ${
                selectedCategory === category.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span>{category.name}</span>
              <span className="text-xs bg-white bg-opacity-20 px-2 py-0.5 rounded-full">{category.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{getCategoryIcon(contact.category)}</div>
                <div>
                  <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                  <p className="text-sm text-gray-600">{contact.description}</p>
                </div>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(contact.priority)}`}>
                {contact.priority}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{contact.location}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{contact.hours}</span>
              </div>
            </div>

            <button
              onClick={() => handleCall(contact.phone)}
              className="w-full mt-4 flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>{contact.phone}</span>
            </button>
          </div>
        ))}
      </div>

      {filteredContacts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📞</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No contacts found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  )
}

export default EssentialContacts
