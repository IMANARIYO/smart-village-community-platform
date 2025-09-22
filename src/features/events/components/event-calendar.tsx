"use client"

import { useState, useEffect, useCallback } from "react"
import { Calendar, Clock, MapPin, Users, Plus, ChevronLeft, ChevronRight } from "lucide-react"
import EventService from "../eventService"
import type { EventListItem, GetEventsOptions } from "../types"
import { toast } from "sonner"
import { CreateEventDialog } from "./CreateEventDialog"
import { EditEventDialog } from "./EditEventDialog"
import { EventDetailsDialog } from "./EventDetailsDialog"
import { EventActions } from "./EventActions"
import { useSearchParams } from "react-router-dom"
import { Eye, Edit, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const EventCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<"month" | "list">("month")
  const [events, setEvents] = useState<EventListItem[]>([])
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState({ total: 0, thisWeek: 0, totalAttendees: 0 })
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [draggedEvent, setDraggedEvent] = useState<EventListItem | null>(null)
  const [editingEvent, setEditingEvent] = useState<EventListItem | null>(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [viewingEvent, setViewingEvent] = useState<EventListItem | null>(null)
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false)
  const [searchParams] = useSearchParams()

  const fetchEvents = useCallback(async () => {
    setLoading(true)
    try {
      const params: GetEventsOptions = {
        page: 1,
        limit: 100, // Get more events for calendar view
      }

      const response = await EventService.getEvents(params)
      const eventData = Array.isArray(response?.data) ? response.data : []
      setEvents(eventData)

      // Calculate stats
      const now = new Date()
      const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
      const thisWeekEvents = eventData.filter(event => {
        const eventDate = new Date(event.date)
        return eventDate >= now && eventDate <= weekFromNow
      })

      setStats({
        total: eventData.length,
        thisWeek: thisWeekEvents.length,
        totalAttendees: eventData.length * 25 // Estimated attendees
      })
    } catch (error: unknown) {
      console.error('Failed to fetch events:', error)
      const errorMessage = (error as { response?: { data?: { message?: string } }; message?: string })?.response?.data?.message || 'Failed to fetch events'
      toast.error(errorMessage)
      setEvents([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchEvents()
  }, [fetchEvents])

  // Listen for villageTrigger parameter changes to refetch events
  useEffect(() => {
    const trigger = searchParams.get('villageTrigger')
    if (trigger) {
      fetchEvents()
    }
  }, [searchParams, fetchEvents])

  const handleDateClick = (dateStr: string) => {
    setSelectedDate(dateStr)
    setCreateDialogOpen(true)
  }

  const handleAddEvent = () => {
    setSelectedDate(null)
    setCreateDialogOpen(true)
  }

  const handleEventDragStart = (event: EventListItem, e: React.DragEvent) => {
    setDraggedEvent(event)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDateDrop = async (dateStr: string, e: React.DragEvent) => {
    e.preventDefault()
    if (!draggedEvent) return

    try {
      await EventService.updateEvent(draggedEvent.event_id, { date: dateStr })
      toast.success('Event moved successfully')
      fetchEvents()
    } catch (error: unknown) {
      const errorMessage = (error as { response?: { data?: { message?: string } }; message?: string })?.response?.data?.message || 'Failed to move event'
      toast.error(errorMessage)
    } finally {
      setDraggedEvent(null)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleViewEvent = (event: EventListItem) => {
    setViewingEvent(event)
    setDetailsDialogOpen(true)
  }

  const handleEditEvent = (event: EventListItem) => {
    setEditingEvent(event)
    setEditDialogOpen(true)
  }

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
        <div 
          key={day} 
          className="h-24 border border-gray-200 p-1 hover:bg-gray-50 cursor-pointer transition-colors"
          onClick={() => handleDateClick(dateStr)}
          onDrop={(e) => handleDateDrop(dateStr, e)}
          onDragOver={handleDragOver}
        >
          <div className="font-medium text-sm text-gray-900">{day}</div>
          <div className="space-y-1 mt-1">
            {dayEvents.map((event) => (
              <div 
                key={event.event_id} 
                className="group relative text-xs bg-blue-100 text-blue-800 px-1 py-0.5 rounded truncate cursor-move hover:bg-blue-200 transition-colors" 
                title={`${event.title} - Drag to move or right-click for options`}
                draggable
                onDragStart={(e) => handleEventDragStart(event, e)}
                onClick={(e) => {
                  e.stopPropagation()
                  handleViewEvent(event)
                }}
                onContextMenu={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
              >
                <span className="block truncate">{event.title}</span>
                <div className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-4 w-4 p-0 hover:bg-blue-300"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreHorizontal className="h-2 w-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-32">
                      <DropdownMenuItem onClick={() => handleViewEvent(event)}>
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEditEvent(event)}>
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
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
              className={`px-3 py-1 rounded text-sm font-medium ${view === "month" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600"
                }`}
            >
              Month
            </button>
            <button
              onClick={() => setView("list")}
              className={`px-3 py-1 rounded text-sm font-medium ${view === "list" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600"
                }`}
            >
              List
            </button>
          </div>
          <button 
            onClick={handleAddEvent}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
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
              <h3 className="text-2xl font-bold text-blue-900">{loading ? '...' : stats.total}</h3>
              <p className="text-sm text-blue-700">Total Events</p>
            </div>
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8 text-green-600" />
            <div>
              <h3 className="text-2xl font-bold text-green-900">{loading ? '...' : stats.totalAttendees}</h3>
              <p className="text-sm text-green-700">Est. Attendees</p>
            </div>
          </div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <div className="flex items-center space-x-3">
            <Clock className="w-8 h-8 text-purple-600" />
            <div>
              <h3 className="text-2xl font-bold text-purple-900">{loading ? '...' : stats.thisWeek}</h3>
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
          <div className="grid grid-cols-7">
            {loading ? (
              <div className="col-span-7 flex items-center justify-center py-8 text-gray-500">
                Loading events...
              </div>
            ) : (
              renderCalendarGrid()
            )}
          </div>
        </div>
      )}

      {/* List View */}
      {view === "list" && (
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading events...</div>
          ) : events.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No events found</div>
          ) : (
            events.map((event) => (
              <div key={event.event_id} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-4">{event.description}</p>
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{event.start_time} - {event.end_time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>{event.village ? `${event.village.village}, ${event.village.cell}` : 'N/A'}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4" />
                        <span>{event.organizer?.person ? `${event.organizer.person.first_name} ${event.organizer.person.last_name}` : 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${event.status === "APPROVED"
                        ? "bg-green-100 text-green-800"
                        : event.status === "REJECTED"
                          ? "bg-red-100 text-red-800"
                          : event.status === "CANCELLED"
                            ? "bg-gray-100 text-gray-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}>
                      {event.status}
                    </div>
                    <div className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {event.category}
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewEvent(event)}
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditEvent(event)}
                        title="Edit Event"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <EventActions
                        event={event}
                        onUpdate={fetchEvents}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Create Event Dialog */}
      <CreateEventDialog 
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSuccess={() => {
          fetchEvents()
          setCreateDialogOpen(false)
        }}
        initialDate={selectedDate}
      />

      {/* Edit Event Dialog */}
      <EditEventDialog
        event={editingEvent}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onUpdate={fetchEvents}
      />

      {/* Event Details Dialog */}
      <EventDetailsDialog
        event={viewingEvent}
        open={detailsDialogOpen}
        onOpenChange={setDetailsDialogOpen}
      />
    </div>
  )
}

export default EventCalendar
