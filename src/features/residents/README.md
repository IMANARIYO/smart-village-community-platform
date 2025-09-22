# Residents Feature

This feature provides a comprehensive dashboard for residents of the Smart Village community platform.

## Features

### Dashboard Components
- **Welcome Banner**: Personalized greeting with user info and verification status
- **Community Stats**: Key metrics including active residents, events, safety reports, and community score
- **Weather Alerts**: Emergency notifications and weather warnings
- **Quick Actions**: Fast access to essential community features
- **Announcements**: Latest community updates and news
- **Emergency Contacts**: Important contact information
- **Volunteering Events**: Upcoming community volunteer opportunities

### Architecture

#### Types (`types.ts`)
- `Resident`: Core resident data structure
- `CommunityStats`: Dashboard statistics
- `WeatherAlert`: Weather and emergency notifications
- `QuickAction`: Action buttons configuration
- `Announcement`: Community announcements
- `EmergencyContact`: Emergency contact information
- `VolunteeringEvent`: Volunteer opportunity data

#### Store (`store.ts`)
- Zustand-based state management
- Async data fetching
- CRUD operations for residents
- Dashboard data management

#### Services
- `service.ts`: Main resident CRUD operations
- `dashboardService.ts`: Dashboard-specific data fetching

#### Components (`components/ExampleComponent.tsx`)
- Reusable dashboard components
- Modular design for easy maintenance
- TypeScript support with proper typing

#### Pages (`pages/ResidentsDashboard.tsx`)
- Main dashboard page
- Integrates all components
- Responsive layout
- Loading states

## Usage

```tsx
import { ResidentsDashboard } from '@/features/residents'

function App() {
  return <ResidentsDashboard />
}
```

## Data Flow

1. Dashboard loads and fetches data via store actions
2. Store calls dashboard service methods
3. Service returns mock/API data
4. Components render with fetched data
5. User interactions trigger store updates

## Customization

- Modify `types.ts` to add new data structures
- Update `dashboardService.ts` to connect to real APIs
- Customize components in `components/ExampleComponent.tsx`
- Adjust layout in `pages/ResidentsDashboard.tsx`
