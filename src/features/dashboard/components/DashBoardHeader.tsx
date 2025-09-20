// src/components/layout/Header.tsx
import React from 'react';
import { Bell, Menu, ChevronLeft, ChevronRight } from 'lucide-react';

interface HeaderProps {
    onToggleSidebar: () => void;
    onOpenMobileSidebar: () => void;
    sidebarState: 'expanded' | 'collapsed' | 'hidden';
    isMobile: boolean;
}

const Header: React.FC<HeaderProps> = ({
    onToggleSidebar,
    onOpenMobileSidebar,
    sidebarState,
    isMobile
}) => {
    const getToggleIcon = () => {
        if (isMobile) {
            return <Menu className="w-5 h-5 text-gray-600" />;
        }

        switch (sidebarState) {
            case 'hidden':
                return <Menu className="w-5 h-5 text-gray-600" />;
            case 'collapsed':
                return <ChevronRight className="w-5 h-5 text-gray-600" />;
            case 'expanded':
                return <ChevronLeft className="w-5 h-5 text-gray-600" />;
            default:
                return <Menu className="w-5 h-5 text-gray-600" />;
        }
    };

    const handleToggleClick = () => {
        if (isMobile) {
            onOpenMobileSidebar();
        } else {
            onToggleSidebar();
        }
    };

    const getHeaderMargin = () => {
        if (isMobile) return '';

        switch (sidebarState) {
            case 'expanded': return 'lg:ml-64';
            case 'collapsed': return 'lg:ml-16';
            case 'hidden': return 'lg:ml-0';
            default: return 'lg:ml-64';
        }
    };

    return (
        <header className={`bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30 transition-all duration-300 ease-in-out ${getHeaderMargin()}`}>
            <div className="flex items-center justify-between px-3 sm:px-4 md:px-6 py-3 md:py-4">

                <div className="flex items-center space-x-2 sm:space-x-4 flex-1 min-w-0">
                    <button
                        onClick={handleToggleClick}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex-shrink-0"
                        title={isMobile ? "Open menu" : "Toggle sidebar"}
                    >
                        {getToggleIcon()}
                    </button>

                    <div className="min-w-0 flex-1">
                        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 truncate">
                            Smart Village Platform
                        </h1>
                        <p className="text-xs sm:text-sm text-gray-600 hidden sm:block truncate">
                            Empowering communities through digital connectivity and transparency.
                        </p>
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
                    {/* Notifications */}
                    <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                        <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full"></span>
                    </button>

                    {/* User Avatar */}
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs sm:text-sm font-medium">JD</span>
                    </div>

                    {/* Mobile menu button (optional secondary action) */}
                    <div className="sm:hidden">
                        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                            <div className="w-1 h-4 bg-gray-400 rounded-full"></div>
                        </button>
                    </div>
                </div>
            </div>


            <div className="sm:hidden px-3 pb-2">
                <p className="text-xs text-gray-600 truncate">
                    Empowering communities through digital connectivity
                </p>
            </div>
        </header>
    );
};

export default Header;