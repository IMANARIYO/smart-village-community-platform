"use client"

import { useState } from "react"
import { Handshake, Plus, Users, Clock, MapPin, Star } from "lucide-react"

const VolunteeringBoard = () => {
  const [activeTab, setActiveTab] = useState("opportunities")

  const opportunities = [
    {
      id: 1,
      title: "Community Garden Maintenance",
      description: "Help maintain our community garden by watering plants, weeding, and harvesting vegetables.",
      skills: ["Gardening", "Physical Work"],
      timeCommitment: "2 hours/week",
      location: "Community Garden",
      volunteers: 5,
      needed: 8,
      coordinator: "Marie Uwimana",
      deadline: "2024-12-30",
    },
    {
      id: 2,
      title: "Digital Literacy Training",
      description: "Teach basic computer skills and internet usage to elderly residents.",
      skills: ["Computer Skills", "Teaching", "Patience"],
      timeCommitment: "3 hours/week",
      location: "Community Center",
      volunteers: 2,
      needed: 4,
      coordinator: "Paul Nzeyimana",
      deadline: "2024-12-28",
    },
    {
      id: 3,
      title: "Youth Sports Coaching",
      description: "Coach young people in football, basketball, and other sports activities.",
      skills: ["Sports Knowledge", "Leadership", "Communication"],
      timeCommitment: "4 hours/week",
      location: "Village Field",
      volunteers: 3,
      needed: 6,
      coordinator: "Jean Baptiste",
      deadline: "2025-01-15",
    },
  ]

  const volunteers = [
    {
      id: 1,
      name: "John Mukamana",
      skills: ["Teaching", "Computer Skills", "Leadership"],
      availability: "Weekends",
      experience: "5 years teaching experience",
      rating: 4.8,
      completedTasks: 12,
    },
    {
      id: 2,
      name: "Sarah Uwimana",
      skills: ["Gardening", "Cooking", "Event Planning"],
      availability: "Evenings",
      experience: "Community event organizer",
      rating: 4.9,
      completedTasks: 18,
    },
    {
      id: 3,
      name: "David Nzeyimana",
      skills: ["Sports Coaching", "Youth Mentoring", "First Aid"],
      availability: "Afternoons",
      experience: "Former professional athlete",
      rating: 4.7,
      completedTasks: 8,
    },
  ]

  const getProgressColor = (current: number, needed: number) => {
    const percentage = (current / needed) * 100
    if (percentage >= 80) return "bg-green-500"
    if (percentage >= 50) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Skill-Based Volunteering Board</h2>
          <p className="text-gray-600">Connect skills with community needs</p>
        </div>
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          <span>Add Opportunity</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center space-x-3">
            <Handshake className="w-8 h-8 text-blue-600" />
            <div>
              <h3 className="text-2xl font-bold text-blue-900">15</h3>
              <p className="text-sm text-blue-700">Active Opportunities</p>
            </div>
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8 text-green-600" />
            <div>
              <h3 className="text-2xl font-bold text-green-900">45</h3>
              <p className="text-sm text-green-700">Registered Volunteers</p>
            </div>
          </div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">✅</div>
            <div>
              <h3 className="text-2xl font-bold text-purple-900">128</h3>
              <p className="text-sm text-purple-700">Tasks Completed</p>
            </div>
          </div>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <div className="flex items-center space-x-3">
            <Clock className="w-8 h-8 text-orange-600" />
            <div>
              <h3 className="text-2xl font-bold text-orange-900">320</h3>
              <p className="text-sm text-orange-700">Hours Contributed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab("opportunities")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "opportunities"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Volunteer Opportunities
          </button>
          <button
            onClick={() => setActiveTab("volunteers")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "volunteers"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Available Volunteers
          </button>
        </nav>
      </div>

      {/* Opportunities Tab */}
      {activeTab === "opportunities" && (
        <div className="space-y-6">
          {opportunities.map((opportunity) => (
            <div key={opportunity.id} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{opportunity.title}</h3>
                  <p className="text-gray-600 mb-4">{opportunity.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{opportunity.timeCommitment}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{opportunity.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>Coordinator: {opportunity.coordinator}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Required Skills:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {opportunity.skills.map((skill) => (
                            <span key={skill} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Deadline:</span> {opportunity.deadline}
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>
                        Volunteers: {opportunity.volunteers}/{opportunity.needed}
                      </span>
                      <span>{Math.round((opportunity.volunteers / opportunity.needed) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${getProgressColor(opportunity.volunteers, opportunity.needed)}`}
                        style={{ width: `${(opportunity.volunteers / opportunity.needed) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <div className="text-sm text-gray-500">
                  {opportunity.needed - opportunity.volunteers} more volunteers needed
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Volunteer for This
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Volunteers Tab */}
      {activeTab === "volunteers" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {volunteers.map((volunteer) => (
            <div key={volunteer.id} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">
                    {volunteer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{volunteer.name}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{volunteer.rating}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-700">Skills:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {volunteer.skills.map((skill) => (
                      <span key={skill} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-sm text-gray-600">
                  <span className="font-medium">Availability:</span> {volunteer.availability}
                </div>

                <div className="text-sm text-gray-600">
                  <span className="font-medium">Experience:</span> {volunteer.experience}
                </div>

                <div className="text-sm text-gray-600">
                  <span className="font-medium">Completed Tasks:</span> {volunteer.completedTasks}
                </div>
              </div>

              <button className="w-full mt-4 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
                Contact Volunteer
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default VolunteeringBoard
