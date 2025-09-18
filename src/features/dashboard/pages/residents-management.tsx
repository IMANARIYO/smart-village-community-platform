"use client"

import { useState } from "react"
import { Users, UserPlus, UserCheck, Search, Filter } from "lucide-react"

const ResidentsManagement = () => {
  const [activeTab, setActiveTab] = useState("residents")
  const [searchTerm, setSearchTerm] = useState("")

  const residents = [
    {
      id: 1,
      name: "John Mukamana",
      phone: "+250788123456",
      status: "approved",
      village: "Sector A",
      joinDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Marie Uwimana",
      phone: "+250788234567",
      status: "pending",
      village: "Sector B",
      joinDate: "2024-02-20",
    },
    {
      id: 3,
      name: "Paul Nzeyimana",
      phone: "+250788345678",
      status: "approved",
      village: "Sector A",
      joinDate: "2024-01-10",
    },
  ]

  const visitors = [
    { id: 1, name: "Alice Johnson", linkedTo: "John Mukamana", purpose: "Family Visit", validUntil: "2024-12-31" },
    { id: 2, name: "Bob Smith", linkedTo: "Marie Uwimana", purpose: "Business Meeting", validUntil: "2024-12-25" },
  ]

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8 text-blue-600" />
            <div>
              <h3 className="text-2xl font-bold text-blue-900">245</h3>
              <p className="text-sm text-blue-700">Total Residents</p>
            </div>
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center space-x-3">
            <UserCheck className="w-8 h-8 text-green-600" />
            <div>
              <h3 className="text-2xl font-bold text-green-900">230</h3>
              <p className="text-sm text-green-700">Approved</p>
            </div>
          </div>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <div className="flex items-center space-x-3">
            <UserPlus className="w-8 h-8 text-orange-600" />
            <div>
              <h3 className="text-2xl font-bold text-orange-900">15</h3>
              <p className="text-sm text-orange-700">Pending Approval</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab("residents")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "residents"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Residents
          </button>
          <button
            onClick={() => setActiveTab("visitors")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "visitors"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Visitors
          </button>
        </nav>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by name or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </button>
      </div>

      {/* Content */}
      {activeTab === "residents" && (
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Village
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Join Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {residents.map((resident) => (
                  <tr key={resident.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{resident.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{resident.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{resident.village}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          resident.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {resident.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{resident.joinDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "visitors" && (
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Visitor Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Linked to Resident
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Purpose
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Valid Until
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {visitors.map((visitor) => (
                  <tr key={visitor.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{visitor.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{visitor.linkedTo}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{visitor.purpose}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{visitor.validUntil}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default ResidentsManagement
