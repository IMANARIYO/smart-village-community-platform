// Main exports for residents feature
export { default as ResidentsDashboard } from './pages/ResidentsDashboard'
export { default as ResidentsLayout } from './layouts/ResidentsLayout'
export { default as ResidentsNavbar } from './components/ResidentsNavbar'
export { useResidentsStore } from './store'
export { dashboardService } from './dashboardService'
export * from './types'

// Component exports
export {
  WelcomeBanner,
  CommunityStatsCards,
  WeatherAlertCard,
  QuickActionsSection,
  AnnouncementsSection,
  EmergencyContactsSection,
  VolunteeringEventsSection,
  IncidentsSection
} from './components/ExampleComponent'
