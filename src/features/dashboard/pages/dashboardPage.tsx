import { useState } from 'react';
import {
    Users,

    Calendar,


    Menu,

    ChevronLeft,
    ChevronRight,
    Home,
    Bell
} from "lucide-react";
import { sidebarLinks } from '../utils/sideBarLinks';




const Dashboard1 = () => {
    const [sidebarState, setSidebarState] = useState<'expanded' | 'collapsed' | 'hidden'>('expanded');
    const [activeLink, setActiveLink] = useState('/residents');

    const toggleSidebar = () => {
        if (sidebarState === 'expanded') {
            setSidebarState('collapsed');
        } else if (sidebarState === 'collapsed') {
            setSidebarState('hidden');
        } else {
            setSidebarState('expanded');
        }
    };

    const getSidebarWidth = () => {
        switch (sidebarState) {
            case 'expanded': return 'w-64';
            case 'collapsed': return 'w-16';
            case 'hidden': return 'w-0';
            default: return 'w-64';
        }
    };

    const getMainMargin = () => {
        switch (sidebarState) {
            case 'expanded': return 'ml-64';
            case 'collapsed': return 'ml-16';
            case 'hidden': return 'ml-0';
            default: return 'ml-64';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sidebar */}
            <div className={`fixed left-0 top-0 h-full bg-white shadow-lg transition-all duration-300 ease-in-out z-10 ${getSidebarWidth()} ${sidebarState === 'hidden' ? 'overflow-hidden' : 'overflow-visible'}`}>
                {sidebarState !== 'hidden' && (
                    <>
                        {/* Sidebar Header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-200">
                            {sidebarState === 'expanded' && (
                                <div className="flex items-center space-x-2">
                                    <Home className="w-6 h-6 text-blue-600" />
                                    <h2 className="text-lg font-semibold text-gray-800">Community Hub</h2>
                                </div>
                            )}
                            {sidebarState === 'collapsed' && (
                                <Home className="w-6 h-6 text-blue-600 mx-auto" />
                            )}
                        </div>

                        {/* Sidebar Navigation */}
                        <nav className="mt-4">
                            <ul className="space-y-1 px-2">
                                {sidebarLinks.map((link) => {
                                    const IconComponent = link.icon;
                                    const isActive = activeLink === link.path;

                                    return (
                                        <li key={link.path}>
                                            <button
                                                onClick={() => setActiveLink(link.path)}
                                                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors duration-200 text-left ${isActive
                                                    ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-600'
                                                    : 'text-gray-700 hover:bg-gray-100'
                                                    }`}
                                                title={sidebarState === 'collapsed' ? link.label : undefined}
                                            >
                                                <IconComponent className="w-5 h-5 flex-shrink-0" />
                                                {sidebarState === 'expanded' && (
                                                    <span className="text-sm font-medium truncate">{link.label}</span>
                                                )}
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>
                    </>
                )}
            </div>

            {/* Main Content */}
            <div className={`transition-all duration-300 ease-in-out ${getMainMargin()}`}>
                {/* Header */}
                <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-5">
                    <div className="flex items-center justify-between px-6 py-4">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={toggleSidebar}
                                className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                                title="Toggle sidebar"
                            >
                                {sidebarState === 'hidden' ? (
                                    <Menu className="w-5 h-5 text-gray-600" />
                                ) : sidebarState === 'collapsed' ? (
                                    <ChevronRight className="w-5 h-5 text-gray-600" />
                                ) : (
                                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                                )}
                            </button>

                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Community Dashboard</h1>
                                <p className="text-sm text-gray-600">Welcome back! Here's what's happening in your community.</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                                <Bell className="w-5 h-5 text-gray-600" />
                                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                            </button>

                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-medium">JD</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-6">
                    <div className="max-w-7xl mx-auto">
                        {/* Current Page Content */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center space-x-2 mb-4">
                                {(() => {
                                    const currentLink = sidebarLinks.find(link => link.path === activeLink);
                                    const IconComponent = currentLink?.icon || Users;
                                    return (
                                        <>
                                            <IconComponent className="w-6 h-6 text-blue-600" />
                                            <h2 className="text-xl font-semibold text-gray-900">
                                                {currentLink?.label || 'Dashboard'}
                                            </h2>
                                        </>
                                    );
                                })()}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
                                    <div className="flex items-center space-x-3">
                                        <Users className="w-8 h-8 text-blue-600" />
                                        <div>
                                            <h3 className="text-lg font-semibold text-blue-900">245</h3>
                                            <p className="text-sm text-blue-700">Active Residents</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
                                    <div className="flex items-center space-x-3">
                                        <Calendar className="w-8 h-8 text-green-600" />
                                        <div>
                                            <h3 className="text-lg font-semibold text-green-900">12</h3>
                                            <p className="text-sm text-green-700">Upcoming Events</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
                                    <div className="flex items-center space-x-3">
                                        <Bell className="w-8 h-8 text-purple-600" />
                                        <div>
                                            <h3 className="text-lg font-semibold text-purple-900">3</h3>
                                            <p className="text-sm text-purple-700">New Alerts</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="prose max-w-none">
                                <p className="text-gray-600 mb-4">
                                    This is your community dashboard. Use the sidebar to navigate between different sections
                                    of the community management system. You can collapse the sidebar to save space or hide
                                    it completely for a full-width view.
                                </p>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="text-sm font-medium text-gray-900 mb-2">Sidebar Controls:</h4>
                                    <ul className="text-sm text-gray-600 space-y-1">
                                        <li>• Click the toggle button to cycle through: Expanded → Collapsed → Hidden</li>
                                        <li>• In collapsed mode, hover over icons to see tooltips</li>
                                        <li>• The sidebar state persists as you navigate</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard1;