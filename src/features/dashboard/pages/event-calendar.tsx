"use client"

import { useState } from "react"
import { Calendar, Clock, MapPin, Users, Plus, ChevronLeft, ChevronRight } from "lucide-react"

const EventCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<"month" | "list">("month")

  const events = [
    {
      id: 1,
      title: "Community Meeting",
      date: "2024-12-25",
      time: "14:00",
      location: "Community Center",
      attendees: 45,
      type: "meeting",
      description: "Monthly community meeting to discuss village matters",
    },
    {
      id: 2,
      title: "Health Workshop",
      date: "2024-12-28",
      time: "10:00",
      location: "Health Center",
      attendees: 30,
      type: "workshop",
      description: "Workshop on preventive healthcare and nutrition",
    },
    {
      id: 3,
      title: "Youth Sports Day",
      date: "2024-12-30",
      time: "09:00",
      location: "Village Field",
      attendees: 80,
      type: "sports",
      description: "Annual sports competition for village youth",
    },
  ]

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const renderCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-gray-200"></div>)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
      const dayEvents = events.filter((event) => event.date === dateStr)

      days.push(
        <div key={day} className="h-24 border border-gray-200 p-1 hover:bg-gray-50">
          <div className="font-medium text-sm text-gray-900">{day}</div>
          <div className="space-y-1 mt-1">
            {dayEvents.map((event) => (
              <div key={event.id} className="text-xs bg-blue-100 text-blue-800 px-1 py-0.5 rounded truncate">
                {event.title}
              </div>
            ))}
          </div>
        </div>,
      )
    }

    return days
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Event Calendar</h2>
          <p className="text-gray-600">Village meetings, workshops, and community events</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setView("month")}
              className={`px-3 py-1 rounded text-sm font-medium ${
                view === "month" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600"
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setView("list")}
              className={`px-3 py-1 rounded text-sm font-medium ${
                view === "list" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600"
              }`}
            >
              List
            </button>
          </div>
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <Plus className="w-4 h-4" />
            <span>Add Event</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center space-x-3">
            <Calendar className="w-8 h-8 text-blue-600" />
            <div>
              <h3 className="text-2xl font-bold text-blue-900">12</h3>
              <p className="text-sm text-blue-700">Upcoming Events</p>
            </div>
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8 text-green-600" />
            <div>
              <h3 className="text-2xl font-bold text-green-900">155</h3>
              <p className="text-sm text-green-700">Total Attendees</p>
            </div>
          </div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <div className="flex items-center space-x-3">
            <Clock className="w-8 h-8 text-purple-600" />
            <div>
              <h3 className="text-2xl font-bold text-purple-900">3</h3>
              <p className="text-sm text-purple-700">This Week</p>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar View */}
      {view === "month" && (
        <div className="bg-white rounded-lg border border-gray-200">
          {/* Calendar Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <button onClick={() => navigateMonth("prev")} className="p-2 hover:bg-gray-100 rounded-lg">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-semibold text-gray-900">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            <button onClick={() => navigateMonth("next")} className="p-2 hover:bg-gray-100 rounded-lg">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Days of Week */}
          <div className="grid grid-cols-7 border-b border-gray-200">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="p-3 text-center text-sm font-medium text-gray-500 border-r border-gray-200 last:border-r-0"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7">{renderCalendarGrid()}</div>
        </div>
      )}

      {/* List View */}
      {view === "list" && (
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span>{event.attendees} attendees</span>
                    </div>
                  </div>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    event.type === "meeting"
                      ? "bg-blue-100 text-blue-800"
                      : event.type === "workshop"
                        ? "bg-green-100 text-green-800"
                        : "bg-purple-100 text-purple-800"
                  }`}
                >
                  {event.type}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default EventCalendar
