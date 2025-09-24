// src/components/layout/Header.tsx
import React from 'react';
import { Menu, ChevronLeft, ChevronRight } from 'lucide-react';
import { NotificationDropdown } from '@/features/notifications/pages/Notificationspopover';
import { UserProfilePopover } from '@/features/auth/components/UserProfileDialog';
import { tokenStorage } from '@/features/auth/utils/tokenStorage';
import { UserProfileStorage } from '@/features/auth/utils/UserProfileStorage';

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
        <header className={`bg-card shadow-sm border-b border-border sticky top-0 z-30 transition-all duration-300 ease-in-out ${getHeaderMargin()}`}>
            <div className="flex items-center justify-between px-3 sm:px-4 md:px-6 py-3 md:py-4">

                <div className="flex items-center space-x-2 sm:space-x-4 flex-1 min-w-0">
                    <button
                        onClick={handleToggleClick}
                        className="p-2 rounded-xl hover:bg-primary-light hover:text-primary-dark transition-all duration-200 flex-shrink-0 active:scale-95"
                        title={isMobile ? "Open menu" : "Toggle sidebar"}
                    >
                        <div className="w-5 h-5 text-primary-normal transition-transform duration-200 hover:scale-110">
                            {getToggleIcon()}
                        </div>
                    </button>

                    <div className="min-w-0 flex-1">
                        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground truncate">
                            Smart Village Platform
                        </h1>
                        <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block truncate">
                            Empowering communities through digital connectivity and transparency.
                        </p>
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
                    {/* Notifications - only show if user is logged in */}
                    {(tokenStorage.getAccessToken() && UserProfileStorage.getUserProfile()) && (
                        <NotificationDropdown />
                    )}

                    {/* User Profile */}
                    <UserProfilePopover />
                </div>
            </div>


            <div className="sm:hidden px-3 pb-2">
                <p className="text-xs text-muted-foreground truncate">
                    Empowering communities through digital connectivity
                </p>
            </div>
        </header>
    );
};

export default Header;