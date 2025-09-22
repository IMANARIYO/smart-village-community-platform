
import React from 'react';
import { Outlet } from 'react-router-dom';

import { AuthHeader } from '@/features/auth/components/header';

const AuthLayout: React.FC = () => {
    return (
        <div className="h-full flex flex-col">

            <AuthHeader />
            <div className="bg-white py-8 px-6 shadow-lg rounded-lg">
                <Outlet />
            </div>

        </div>
    );
};

export default AuthLayout;