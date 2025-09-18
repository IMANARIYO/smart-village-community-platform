"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import type { RoleEnum } from "../authTypes";
import { tokenStorage } from "../../../utils/tokenStorage";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../../../components/ui/popover";
import { LoginForm } from "./login-form";
import { LogInIcon, MoreVertical } from "lucide-react";

interface UserProfile {
    user_id: string;
    phone_number: string;
    role: RoleEnum;
    is_verified: boolean;
    first_name: string;
    last_name: string;
    gender: string;
    national_id: string;
    person_type: string;
}

export function UserProfilePopover() {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const token = tokenStorage.getAccessToken();
            if (!token) return setLoading(false);

            try {
                const res = await axios.get("https://smartville.onrender.com/me/", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (res.data.status === "success") {
                    setUser(res.data.data);
                }
            } catch (err) {
                console.error("Failed to fetch user profile:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const handleSignOut = () => {
        tokenStorage.clearAuth();
        setUser(null);
        setOpen(false); // close popover
    };

    // Helper to generate initials
    const getInitials = () => {
        if (!user) return "SI"; // default for Sign In
        return `${user.first_name[0] || ""}${user.last_name[0] || ""}`.toUpperCase();
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <button
                    className="flex items-center gap-2 focus:outline-none"
                >
                    {user ? (
                        <div
                            className="
    w-10 h-10             
  bg-primary-light         
    rounded-full           
    flex items-center justify-center
    
    px-2
  "
                        >
                            {getInitials()}
                            <MoreVertical className="w-4 h-4" />
                        </div>

                    ) : (
                        <LogInIcon />
                    )}
                </button>
            </PopoverTrigger>

            <PopoverContent className="w-64 p-4">
                {loading ? (
                    <p>Loading...</p>
                ) : user ? (
                    <div className="space-y-2">
                        <p>
                            <strong>Name:</strong> {user.first_name} {user.last_name}
                        </p>
                        <p>
                            <strong>Phone:</strong> {user.phone_number}
                        </p>
                        <p>
                            <strong>Role:</strong> {user.role}
                        </p>
                        <p>
                            <strong>Verified:</strong> {user.is_verified ? "Yes" : "No"}
                        </p>
                        <p>
                            <strong>National ID:</strong> {user.national_id}
                        </p>
                        <div className="mt-2 flex justify-end">
                            <button
                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm font-medium"
                                onClick={handleSignOut}
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                ) : (
                    <LoginForm />
                )}
            </PopoverContent>
        </Popover>
    );
}
