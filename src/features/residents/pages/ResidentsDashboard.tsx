import React, { useEffect } from 'react'
import { useResidentsStore } from '../store'
import type { WeatherAlert } from '../types'
import ResidentsLayout from '../layouts/ResidentsLayout'
import {
  WelcomeBanner,
  CommunityStatsCards,
  WeatherAlertCard,
  QuickActionsSection,
  AnnouncementsSection,
  EmergencyContactsSection,
  VolunteeringEventsSection,
  IncidentsSection
} from '../components/ExampleComponent'

const ResidentsDashboard: React.FC = () => {
  const {
    communityStats,
    weatherAlerts,
    quickActions,
    announcements,
    emergencyContacts,
    volunteeringEvents,
    incidents,
    fetchCommunityStats,
    fetchWeatherAlerts,
    fetchAnnouncements,
    fetchEmergencyContacts,
    fetchVolunteeringEvents,
    fetchIncidents,
    isLoading
  } = useResidentsStore()

  useEffect(() => {
    // Fetch all data when component mounts
    fetchCommunityStats()
    fetchWeatherAlerts()
    fetchAnnouncements()
    fetchEmergencyContacts()
    fetchVolunteeringEvents()
    fetchIncidents()
  }, [
    fetchCommunityStats,
    fetchWeatherAlerts,
    fetchAnnouncements,
    fetchEmergencyContacts,
    fetchVolunteeringEvents,
    fetchIncidents
  ])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <ResidentsLayout>
      {/* Welcome Banner */}
      <div className="mb-8">
        <WelcomeBanner
          userName="John Doe"
          communityName="Nyarucyamu I Village"
          role="Resident"
          isVerified={true}
        />
      </div>

      {/* Community Stats */}
      <div className="mb-8">
        <CommunityStatsCards stats={communityStats} />
      </div>

      {/* Weather Alert */}
      {weatherAlerts.length > 0 && (
        <div className="mb-8">
          {weatherAlerts.map((alert: WeatherAlert) => (
            <WeatherAlertCard key={alert.id} alert={alert} />
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <div className="mb-8">
        <QuickActionsSection actions={quickActions} />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Announcements */}
          <AnnouncementsSection announcements={announcements} />

          {/* Volunteering Events */}
          <VolunteeringEventsSection events={volunteeringEvents} />
        </div>

        {/* Right Column */}
        <div className="lg:col-span-1 space-y-8">
          {/* Emergency Contacts */}
          <EmergencyContactsSection contacts={emergencyContacts} />

          {/* Incidents */}
          <IncidentsSection incidents={incidents} />
        </div>
      </div>
    </ResidentsLayout>
  );
}

export default ResidentsDashboard
