// src/layouts/DashboardLayout.tsx
import Header from '@/features/dashboard/components/DashBoardHeader';
import MainContent from '@/features/dashboard/components/DashBoardMainContent';
import Sidebar from '@/features/dashboard/components/DashBoardSideBar';
import React, { useState, useEffect } from 'react';


const DashboardLayout: React.FC = () => {
    const [sidebarState, setSidebarState] = useState<'expanded' | 'collapsed' | 'hidden'>('expanded');
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Responsive breakpoint detection
    useEffect(() => {
        const checkScreenSize = () => {
            const mobile = window.innerWidth < 1024; // lg breakpoint
            setIsMobile(mobile);

            // Auto-hide sidebar on mobile
            if (mobile && sidebarState !== 'hidden') {
                setSidebarState('hidden');
            } else if (!mobile && sidebarState === 'hidden') {
                setSidebarState('expanded');
            }
        };

        // Initial check
        checkScreenSize();

        // Listen for resize events
        window.addEventListener('resize', checkScreenSize);

        // Cleanup
        return () => window.removeEventListener('resize', checkScreenSize);
    }, [sidebarState]);

    // Close mobile sidebar on route change or outside click
    useEffect(() => {
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isMobileSidebarOpen) {
                setIsMobileSidebarOpen(false);
            }
        };

        document.addEventListener('keydown', handleEscapeKey);
        return () => document.removeEventListener('keydown', handleEscapeKey);
    }, [isMobileSidebarOpen]);

    const toggleDesktopSidebar = () => {
        if (isMobile) return;

        switch (sidebarState) {
            case 'expanded':
                setSidebarState('collapsed');
                break;
            case 'collapsed':
                setSidebarState('hidden');
                break;
            case 'hidden':
                setSidebarState('expanded');
                break;
            default:
                setSidebarState('expanded');
        }
    };

    const openMobileSidebar = () => {
        setIsMobileSidebarOpen(true);
    };

    const closeMobileSidebar = () => {
        setIsMobileSidebarOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Desktop Sidebar */}
            <Sidebar
                isOpen={false} // Not used for desktop
                onClose={() => { }} // Not used for desktop
                variant="desktop"
                state={sidebarState}
            />

            {/* Mobile Sidebar */}
            <Sidebar
                isOpen={isMobileSidebarOpen}
                onClose={closeMobileSidebar}
                variant="mobile"
                state="expanded" // Always expanded when open on mobile
            />

            {/* Header */}
            <Header
                onToggleSidebar={toggleDesktopSidebar}
                onOpenMobileSidebar={openMobileSidebar}
                sidebarState={sidebarState}
                isMobile={isMobile}
            />

            {/* Main Content */}
            <MainContent
                sidebarState={sidebarState}
                isMobile={isMobile}
            />
        </div>
    );
};

export default DashboardLayout;