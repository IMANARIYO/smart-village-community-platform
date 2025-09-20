import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../features/auth/login/page';
import SignupPage from '../features/auth/signup/page';
import VillagePage from '../pages/VillagePage';
import VillageNewsPage from '../features/news/pages/VillageNewsPage';
import VolunteeringEvents from '../features/volunteering/pages/VolunteeringEvents ';
import EmergencyContacts from '../features/emergencies/pages/Emergency';
import Dashboard from '../features/dashboard/pages/dashboard';
// import LeadersPage from '@/features/dashboard/pages/villageLeaders/LeadersTable';
import ForgotPasswordPage from '@/features/auth/components/ForgotPasswordPage';
import { AuthLayout, DashboardLayout } from '@/layouts';
import ProjectOverview from '@/features/dashboard/pages/project-overview';
import ProjectFAQ from '@/features/dashboard/pages/project-faq';
import ProjectDocumentation from '@/features/dashboard/pages/project-documentation';
import ResidentsManagement from '@/features/dashboard/pages/residents-management';
import CommunityNews from '@/features/dashboard/pages/community-news';
import EventCalendar from '@/features/dashboard/pages/event-calendar';
import EssentialContacts from '@/features/dashboard/pages/essential-contacts';
import SuggestionBox from '@/features/dashboard/pages/suggestion-box';
import VolunteeringBoard from '@/features/dashboard/pages/volunteering-board';
import IncidentReporting from '@/features/dashboard/pages/incident-reporting';
import ComingSoon from '@/components/common/ComingSoon';
import { LandingLayout } from '@/layouts/LandingLayout';




export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}


                <Route element={<LandingLayout />}>
                    <Route path="/" element={<HomePage />} />

                    <Route path="/visitVillage/:villageId" element={<VillagePage />} />
                    <Route path="/visitVillage/:villageId" element={<VillagePage />} />
                    <Route path="/news/:villageId" element={<VillageNewsPage />} />
                    {/* <Route path="/news" element={<VillageNewsPage />} /> */}
                    <Route path="/VolunteeringEvents/:villageId" element={<VolunteeringEvents />} />
                    <Route path="/EmergencyContacts/:villageId" element={<EmergencyContacts />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/test" element={<VolunteeringEvents />} />

                </Route>

                <Route path="/auth" element={<AuthLayout />}>
                    <Route path="login" element={<LoginPage />} />
                    <Route path="signUp" element={<SignupPage />} />
                    <Route path="forgot-password" element={<ForgotPasswordPage />} />
                    <Route index element={<Navigate to="login" replace />} />
                </Route>

                <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route path="overview" element={<ProjectOverview />} />
                    <Route path="faq" element={<ProjectFAQ />} />
                    <Route path="docs" element={<ProjectDocumentation />} />
                    <Route path="residents" element={<ResidentsManagement />} />
                    <Route path="news" element={<CommunityNews />} />
                    <Route path="events" element={<EventCalendar />} />
                    <Route path="contacts" element={<EssentialContacts />} />
                    <Route path="suggestions" element={<SuggestionBox />} />
                    <Route path="volunteering" element={<VolunteeringBoard />} />
                    <Route path="incidents" element={<IncidentReporting />} />
                    <Route path="languages" element={<ComingSoon />} />
                    <Route path="emergency" element={<ComingSoon />} />
                    <Route path="offline" element={<ComingSoon />} />
                    <Route index element={<Navigate to="overview" replace />} />
                </Route>

                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/overview" element={<Navigate to="/dashboard/overview" replace />} />
                <Route path="/faq" element={<Navigate to="/dashboard/faq" replace />} />
                <Route path="/docs" element={<Navigate to="/dashboard/docs" replace />} />
                <Route path="/residents" element={<Navigate to="/dashboard/residents" replace />} />
                <Route path="/news" element={<Navigate to="/dashboard/news" replace />} />
                <Route path="/events" element={<Navigate to="/dashboard/events" replace />} />
                <Route path="/contacts" element={<Navigate to="/dashboard/contacts" replace />} />
                <Route path="/suggestions" element={<Navigate to="/dashboard/suggestions" replace />} />
                <Route path="/volunteering" element={<Navigate to="/dashboard/volunteering" replace />} />
                <Route path="/incidents" element={<Navigate to="/dashboard/incidents" replace />} />
                <Route path="/languages" element={<Navigate to="/dashboard/languages" replace />} />
                <Route path="/emergency" element={<Navigate to="/dashboard/emergency" replace />} />
                <Route path="/offline" element={<Navigate to="/dashboard/offline" replace />} />


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
                <Route path="*" element={<ProjectOverview />} />
            </Routes>

        </BrowserRouter>
    );
}
