import React, { useState } from 'react';
import { Calendar, Users, Phone, Bell, Lock, Shield, UserCheck, ChevronRight } from 'lucide-react';

interface StatCardProps {
    icon: React.ReactNode;
    value: string;
    label: string;
    color: string;
}

interface QuickLinkProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    count: string;
    trending?: boolean;
    featured?: boolean;
    priority?: boolean;
}

interface AnnouncementProps {
    title: string;
    description: string;
    date: string;
    views: string;
}

interface EventProps {
    title: string;
    description: string;
    date: string;
    location: string;
    status: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, value, label, color }) => (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${color}`}>
            {icon}
        </div>
        <div className="text-2xl font-bold mb-1">{value}</div>
        <div className="text-sm opacity-90">{label}</div>
    </div>
);

const QuickLink: React.FC<QuickLinkProps> = ({ icon, title, description, count, trending, featured, priority }) => (
    <div className="relative bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden">

        <div className="absolute top-2 right-2 w-22 h-22 rounded-full bg-transparent opacity-10 border border-red-700 " />

        <div className="absolute bottom-0 right-0 w-24 h-24 rounded-full bg-gray-800 opacity-20" />
        <div className="absolute -bottom-10 -left-10 w-28 h-28 rounded-full bg-gray-800 opacity-20" />

        {/* Content */}
        <div className="flex items-start justify-between mb-4 relative z-10">
            <div
                className={`p-3 rounded-lg ${trending
                    ? "bg-green-100 text-green-600"
                    : featured
                        ? "bg-yellow-100 text-yellow-600"
                        : priority
                            ? "bg-blue-100 text-blue-600"
                            : "bg-gray-100 text-gray-600"
                    }`}
            >
                {icon}
            </div>
            {trending && (
                <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                    Trending
                </span>
            )}
            {featured && (
                <span className="text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full">
                    Features
                </span>
            )}
            {priority && (
                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                    Priority
                </span>
            )}
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2 relative z-10">
            {title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 relative z-10">{description}</p>
        <div className="flex items-center justify-between relative z-10">
            <span className="text-sm text-gray-500">{count}</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
    </div>
)


const AnnouncementCard: React.FC<AnnouncementProps> = ({ title, description, date, views }) => (
    <div className="bg-white p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors cursor-pointer">
        <div className="flex justify-between items-start mb-2">
            <h4 className="font-semibold text-gray-900">{title}</h4>
            <span className="text-xs text-gray-500">{date}</span>
        </div>
        <p className="text-gray-600 text-sm mb-3">{description}</p>
        <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">{views}</span>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Read More →
            </button>
        </div>
    </div>
);

const EventCard: React.FC<EventProps> = ({ title, description, date, location, status }) => (
    <div className="bg-white p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
        <div className="flex justify-between items-start mb-2">
            <h4 className="font-semibold text-gray-900">{title}</h4>
            <span className={`text-xs px-2 py-1 rounded-full ${status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                }`}>
                {status}
            </span>
        </div>
        <p className="text-gray-600 text-sm mb-3">{description}</p>
        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
            <span>{date}</span>
            <span>{location}</span>
        </div>
        <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg font-medium transition-colors">
            Join Event
        </button>
    </div>
);

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; locked?: boolean }> = ({ icon, title, locked }) => (
    <div className={`flex items-center justify-between p-4 rounded-lg border ${locked ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-100 hover:border-gray-200 cursor-pointer'
        } transition-colors`}>
        <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${locked ? 'bg-gray-100 text-gray-400' : 'bg-blue-100 text-blue-600'}`}>
                {icon}
            </div>
            <span className={`font-medium ${locked ? 'text-gray-400' : 'text-gray-900'}`}>{title}</span>
        </div>
        {locked && <Lock className="w-4 h-4 text-gray-400" />}
    </div>
);

export default function NyarucyamoVillage() {
    const [isSignedIn, setIsSignedIn] = useState(false);

    const stats = [
        { icon: <Users className="w-6 h-6" />, value: "1123", label: "Residents", color: "bg-blue-600" },
        { icon: <Bell className="w-6 h-6" />, value: "12", label: "Announcements", color: "bg-green-600" },
        { icon: <Calendar className="w-6 h-6" />, value: "8", label: "Events", color: "bg-yellow-600" },
        { icon: <Shield className="w-6 h-6" />, value: "Excellent", label: "Safety Level", color: "bg-purple-600" }
    ];

    const quickLinks = [
        {
            icon: <Bell className="w-6 h-6" />,
            title: "News",
            description: "Stay updated with the latest community announcements and important news",
            count: "8 records",
            trending: true
        },
        {
            icon: <Calendar className="w-6 h-6" />,
            title: "Events",
            description: "Stay updated with the latest community announcements and important news",
            count: "12 Active",
            featured: true
        },
        {
            icon: <Phone className="w-6 h-6" />,
            title: "Contacts",
            description: "Stay updated with the latest community announcements and important news",
            count: "24/7 Available",
            priority: true
        }
    ];

    const announcements = [
        {
            title: "Umuganda Day: Community Cleanup",
            description: "Join us this Saturday for a neighborhood cleanup initiative. We'll be cleaning streets, parks, and common areas.",
            date: "2025-08-04",
            views: "243 Views"
        },
        {
            title: "Umuganda Day: Community Cleanup",
            description: "Join us this Saturday for a neighborhood cleanup initiative. We'll be cleaning streets, parks, and common areas.",
            date: "2025-08-04",
            views: "243 Views"
        }
    ];

    const events = [
        {
            title: "Tree Planting Drive",
            description: "Help us plant 100 trees in the neighborhood to improve air quality and create a greener environment.",
            date: "2025-08-04",
            location: "Youth Center",
            status: "Active"
        },
        {
            title: "Youth Mentorship Program",
            description: "Volunteer to mentor young people in the community and help them develop new skills.",
            date: "2025-08-04",
            location: "Youth Center",
            status: "Active"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <h1 className="text-xl font-bold text-gray-900">Nyarucyamo II</h1>
                        </div>
                        <nav className="hidden md:flex space-x-8">
                            <a href="#" className="text-gray-700 hover:text-gray-900">Home</a>
                            <a href="#" className="text-gray-700 hover:text-gray-900">News</a>
                            <a href="#" className="text-gray-700 hover:text-gray-900">Events</a>
                            <a href="#" className="text-gray-700 hover:text-gray-900">Contacts</a>
                        </nav>
                        <div className="flex items-center space-x-4">
                            <select className="text-sm border-0 bg-transparent">
                                <option>🌍 English</option>
                            </select>
                            <button
                                onClick={() => setIsSignedIn(!isSignedIn)}
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                            >
                                👤 {isSignedIn ? 'Sign Out' : 'Sign In'}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-green-600 via-blue-600 to-purple-600 py-20">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="text-yellow-400 text-sm font-medium mb-4">🏘️ Smart Community Platform</div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                        Welcome to<br />
                        <span className="text-yellow-400">Nyarucyamo II Village</span>
                    </h1>
                    <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto">
                        Discover community news, join volunteering events, and stay connected with your neighbors in our smart village platform.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                        {stats.map((stat, index) => (
                            <StatCard key={index} {...stat} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Quick Links */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Quick Links</h2>
                        <p className="text-gray-600">Explore community features and stay connected with your neighbors</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {quickLinks.map((link, index) => (
                            <QuickLink key={index} {...link} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Announcements & Events */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Latest Announcements */}
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-green-600 p-2 rounded-lg">
                                            <Bell className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">Latest Announcements</h3>
                                            <p className="text-sm text-gray-600">Stay informed with community updates</p>
                                        </div>
                                    </div>
                                    <button className="text-green-600 hover:text-green-700 font-medium">
                                        View All →
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {announcements.map((announcement, index) => (
                                        <AnnouncementCard key={index} {...announcement} />
                                    ))}
                                </div>
                            </div>

                            {/* Volunteering Events */}
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-yellow-500 p-2 rounded-lg">
                                            <Calendar className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">Volunteering Events</h3>
                                            <p className="text-sm text-gray-600">Make a difference in your community</p>
                                        </div>
                                    </div>
                                    <button className="text-yellow-600 hover:text-yellow-700 font-medium">
                                        View All →
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {events.map((event, index) => (
                                        <EventCard key={index} {...event} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Sign In & Features */}
                        <div className="space-y-6">
                            {/* Sign In Card */}
                            {!isSignedIn && (
                                <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-6 text-white">
                                    <div className="bg-yellow-500 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                                        <UserCheck className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold mb-2">Sign in for More Features</h3>
                                    <p className="text-sm opacity-90 mb-4">
                                        Access emergency contacts, detailed incident reports, visitor management, and more community features
                                    </p>
                                    <button
                                        onClick={() => setIsSignedIn(true)}
                                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                                    >
                                        👤 Sign In
                                    </button>
                                </div>
                            )}

                            {/* Features List */}
                            <div className="bg-white rounded-xl p-6 shadow-sm">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">🔓 Unlock Features</h3>
                                <div className="space-y-3">
                                    <FeatureCard
                                        icon={<Shield className="w-5 h-5" />}
                                        title="Safety Reports"
                                        locked={!isSignedIn}
                                    />
                                    <FeatureCard
                                        icon={<Phone className="w-5 h-5" />}
                                        title="Emergency Contacts"
                                        locked={!isSignedIn}
                                    />
                                    <FeatureCard
                                        icon={<Users className="w-5 h-5" />}
                                        title="Visitor Management"
                                        locked={!isSignedIn}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}