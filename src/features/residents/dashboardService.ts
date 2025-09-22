import type { CommunityStats, Announcement, VolunteeringEvent, EmergencyContact, WeatherAlert, Incident } from './types'

// Dashboard-specific service for residents feature
// This service handles dashboard data that's different from the main resident CRUD operations

export const dashboardService = {
  // Get community statistics
  async getCommunityStats(): Promise<CommunityStats> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          activeResidents: 1123,
          monthlyEvents: 12,
          safetyReports: 3,
          communityScore: 95
        })
      }, 500)
    })
  },

  // Get announcements
  async getAnnouncements(): Promise<Announcement[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            title: 'Umuganda Day: Community Cleanup',
            description: 'Join us for our monthly community cleanup initiative. Bring your tools and help keep our neighborhood clean and beautiful.',
            type: 'Announcement',
            author: 'Community Leader',
            publishDate: '30 Minutes Ago',
            views: 234,
            isPinned: true
          },
          {
            id: '2',
            title: 'Health Fair: Free Screenings',
            description: 'Free health screenings, nutrition workshops, and wellness tips for all residents.',
            type: 'Event',
            author: 'Health Department',
            publishDate: '1 Hour Ago',
            views: 150,
            isPinned: false
          },
          {
            id: '3',
            title: 'New Health Center Opening',
            description: 'We are excited to announce the opening of our new health center next month.',
            type: 'News',
            author: 'Health Council',
            publishDate: '2 Hours Ago',
            views: 90,
            isPinned: false
          }
        ])
      }, 500)
    })
  },

  // Get volunteering events
  async getVolunteeringEvents(): Promise<VolunteeringEvent[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            title: 'Tree Planting Drive',
            description: 'Help us plant trees to improve air quality and beautify our community.',
            date: '1/12/2025',
            time: '08:00',
            location: 'Youth Center',
            currentVolunteers: 15,
            maxVolunteers: 30,
            status: 'Upcoming'
          },
          {
            id: '2',
            title: 'Youth Mentorship Program',
            description: 'Mentor young people in our community and help shape the next generation.',
            date: '1/12/2025',
            time: '08:00',
            location: 'Youth Center',
            currentVolunteers: 15,
            maxVolunteers: 30,
            status: 'Upcoming'
          }
        ])
      }, 500)
    })
  },

  // Get emergency contacts
  async getEmergencyContacts(): Promise<EmergencyContact[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: '1', name: 'National Police Emergency', phone: '112', type: 'Police' },
          { id: '2', name: 'Fire Emergency Services', phone: '101', type: 'Fire' },
          { id: '3', name: 'Ambulance Services', phone: '113', type: 'Ambulance' },
          { id: '4', name: 'Village Leader', phone: '+250789965763', type: 'Village Leader' }
        ])
      }, 300)
    })
  },

  // Get weather alerts
  async getWeatherAlerts(): Promise<WeatherAlert[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            title: 'Heavy Rain Warning',
            message: 'Heavy rainfall expected tonight from 8 PM to 6 AM. Please secure loose items and avoid unnecessary travel.',
            type: 'Emergency',
            timestamp: '30 Minutes Ago',
            isActive: true
          }
        ])
      }, 300)
    })
  },

  // Get incidents
  async getIncidents(): Promise<Incident[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            title: 'Street Light Outage',
            description: 'Street light on Main Road has been broken for three days',
            location: 'Main Road',
            reportedBy: 'Jean Mukamana',
            timeReported: '2 hours ago',
            status: 'Active',
            priority: 'medium',
            category: 'infrastructure'
          },
          {
            id: '2',
            title: 'Suspicious Activity',
            description: 'Unusual activity reported near the school area',
            location: 'Primary School',
            reportedBy: 'Anonymous',
            timeReported: '5 hours ago',
            status: 'Active',
            priority: 'high',
            category: 'security'
          },
          {
            id: '3',
            title: 'Road Pothole',
            description: 'Large pothole causing issues for vehicles',
            location: 'Market Street',
            reportedBy: 'Marie Uwimana',
            timeReported: '1 day ago',
            status: 'Resolved',
            priority: 'low',
            category: 'safety'
          }
        ])
      }, 300)
    })
  }
}
