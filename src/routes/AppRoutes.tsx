import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../features/auth/login/page';
import SignupPage from '../features/auth/signup/page';
import VillagePage from '../pages/VillagePage';
import VillageNewsPage from '../features/newsFeed/pages/VillageNewsPage';
import VolunteeringEvents from '../features/volunteering/pages/VolunteeringEvents ';
import EmergencyContacts from '../features/emergencies/pages/Emergency';

// import LoginPage from './pages/LoginPage';
// import SignupPage from './pages/SignupPage';
// import NotFoundPage from './pages/NotFoundPage';

// import ResidentLayout from './layouts/ResidentLayout';
// import ModeratorLayout from './layouts/ModeratorLayout';
// import AdminLayout from './layouts/AdminLayout';

// import Dashboard from './pages/dashboard/Resident/Dashboard';
// import ResidentsManagement from './pages/dashboard/Resident/ResidentsManagement';
// import VisitorsManagement from './pages/dashboard/Resident/VisitorsManagement';
// import NewsFeed from './pages/dashboard/Resident/NewsFeed';
// import EventCalendar from './pages/dashboard/Resident/EventCalendar';
// import ContactsDirectory from './pages/dashboard/Resident/ContactsDirectory';
// import SuggestionBox from './pages/dashboard/Resident/SuggestionBox';
// import VolunteeringBoard from './pages/dashboard/Resident/VolunteeringBoard';
// import IncidentReporting from './pages/dashboard/Resident/IncidentReporting';

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/auth/login" element={<LoginPage />} />
                <Route path="/auth/signup" element={<SignupPage />} />
                <Route path="/visitVillage/:villageId" element={<VillagePage />} />
                <Route path="/news" element={<VillageNewsPage />} />
                <Route path="/VolunteeringEvents" element={<VolunteeringEvents />} />
                <Route path="/EmergencyContacts" element={<EmergencyContacts />} />


                {/*
        
                <Route path="/resident" element={<ResidentLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="residents" element={<ResidentsManagement />} />
                    <Route path="visitors" element={<VisitorsManagement />} />
                    <Route path="news" element={<NewsFeed />} />
                    <Route path="events" element={<EventCalendar />} />
                    <Route path="contacts" element={<ContactsDirectory />} />
                    <Route path="suggestions" element={<SuggestionBox />} />
                    <Route path="volunteers" element={<VolunteeringBoard />} />
                    <Route path="incidents" element={<IncidentReporting />} />
                </Route>

                <Route path="/moderator" element={<ModeratorLayout />}>

                </Route>
                <Route path="/admin" element={<AdminLayout />}>
                </Route>
                <Route path="*" element={<NotFoundPage />} /> */}
            </Routes>
        </BrowserRouter>
    );
}
