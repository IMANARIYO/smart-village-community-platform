
// src/pages/ComingSoon.tsx
import { sidebarLinks } from '@/features/dashboard/utils/sideBarLinks';
import { Users } from 'lucide-react';
import React from 'react';
import { useLocation } from 'react-router-dom';


const ComingSoon: React.FC = () => {
    const location = useLocation();
    const currentLink = sidebarLinks.find(link => link.path === location.pathname);
    const IconComponent = currentLink?.icon || Users;

    return (
        <div className="text-center py-12">
            <div className="flex items-center justify-center space-x-2 mb-4">
                <IconComponent className="w-8 h-8 text-blue-600" />
                <h2 className="text-2xl font-semibold text-gray-900">{currentLink?.label || 'Feature'}</h2>
            </div>

            <p className="text-gray-600 mb-6">This feature is coming soon! We're working hard to bring you the best experience.</p>

            <div className="bg-gray-50 p-6 rounded-lg max-w-md mx-auto">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Development Status:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Feature design completed</li>
                    <li>• Implementation in progress</li>
                    <li>• Expected release: Soon</li>
                </ul>
            </div>
        </div>
    );
};

export default ComingSoon;