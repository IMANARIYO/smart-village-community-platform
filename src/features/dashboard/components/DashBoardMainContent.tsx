// src/components/layout/MainContent.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';

interface MainContentProps {
    sidebarState: 'expanded' | 'collapsed' | 'hidden';
    isMobile: boolean;
}

const MainContent: React.FC<MainContentProps> = ({ sidebarState, isMobile }) => {
    const getMainMargin = () => {
        if (isMobile) return '';

        switch (sidebarState) {
            case 'expanded': return 'lg:ml-64';
            case 'collapsed': return 'lg:ml-16';
            case 'hidden': return 'lg:ml-0';
            default: return 'lg:ml-64';
        }
    };

    return (
        <div className={`transition-all duration-300 ease-in-out ${getMainMargin()}`}>
            {/* Main Content Area */}
            <main className="p-2 sm:p-4 md:p-6 min-h-screen">
                {/* Content Container */}
                <div className="max-w-7xl mx-auto">
                    {/* Responsive Content Card */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        {/* Content Padding - Responsive */}
                        <div className="p-3 sm:p-4 md:p-6">
                            {/* Outlet renders the page content */}
                            <div className="w-full overflow-x-auto">
                                <Outlet />
                            </div>
                        </div>
                    </div>

                    {/* Additional responsive spacing for different screen sizes */}
                    <div className="h-4 sm:h-6 md:h-8"></div>
                </div>
            </main>
        </div>
    );
};

export default MainContent;