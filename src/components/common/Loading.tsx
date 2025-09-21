// src/components/common/Loading.tsx
import React from "react";
import { CircularProgress } from "@mui/material";

interface LoadingProps {
    message?: string;
    fullScreen?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({
    message = "Loading...",
    fullScreen = false,
}) => {
    if (fullScreen) {
        return (
            <div className="flex flex-col items-center justify-center h-screen w-full">
                <CircularProgress />
                <p className="mt-3 text-gray-600">{message}</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center p-6">
            <CircularProgress size={24} />
            {message && <p className="mt-2 text-sm text-gray-500">{message}</p>}
        </div>
    );
};
