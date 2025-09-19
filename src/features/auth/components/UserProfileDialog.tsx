"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import type { RoleEnum } from "../authTypes";
import { tokenStorage } from "../../../utils/tokenStorage";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { LoginForm } from "./login-form";
import { LogInIcon, MoreVertical } from "lucide-react";
import type { Village } from "@/types";

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
    village?: Village;
}

// User profile storage utility
class UserProfileStorage {
    private static readonly STORAGE_KEY = 'user_profile_data';
    private static readonly CACHE_EXPIRY_KEY = 'user_profile_expiry';
    private static readonly CACHE_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds

    static setUserProfile(profile: UserProfile): void {
        try {
            const expiryTime = Date.now() + this.CACHE_DURATION;
            sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(profile));
            sessionStorage.setItem(this.CACHE_EXPIRY_KEY, expiryTime.toString());
        } catch (error) {
            console.warn('Failed to save user profile to sessionStorage:', error);
        }
    }

    static getUserProfile(): UserProfile | null {
        try {
            const expiryTime = sessionStorage.getItem(this.CACHE_EXPIRY_KEY);


            if (!expiryTime || Date.now() > parseInt(expiryTime)) {
                this.clearUserProfile();
                return null;
            }

            const profileData = sessionStorage.getItem(this.STORAGE_KEY);
            return profileData ? JSON.parse(profileData) : null;
        } catch (error) {
            console.warn('Failed to retrieve user profile from sessionStorage:', error);
            return null;
        }
    }

    static clearUserProfile(): void {
        try {
            sessionStorage.removeItem(this.STORAGE_KEY);
            sessionStorage.removeItem(this.CACHE_EXPIRY_KEY);
        } catch (error) {
            console.warn('Failed to clear user profile from sessionStorage:', error);
        }
    }

    static isProfileCached(): boolean {
        try {
            const expiryTime = sessionStorage.getItem(this.CACHE_EXPIRY_KEY);
            return expiryTime !== null && Date.now() <= parseInt(expiryTime);
        } catch (error) {
            console.log("the error ", error)
            return false;
        }
    }
}

export function UserProfilePopover() {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const token = tokenStorage.getAccessToken();
            if (!token) {
                setLoading(false);
                return;
            }

            // Try to get cached profile first
            const cachedProfile = UserProfileStorage.getUserProfile();
            if (cachedProfile) {
                setUser(cachedProfile);
                setLoading(false);
                return;
            }

            // If no cached profile or expired, fetch from API
            try {
                const res = await axios.get("https://smartville.onrender.com/me/", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (res.data.status === "success") {
                    const profileData = res.data.data;
                    setUser(profileData);
                    // Cache the profile data
                    UserProfileStorage.setUserProfile(profileData);
                }
            } catch (err) {
                console.error("Failed to fetch user profile:", err);
                // If API fails but we have an expired cache, we might want to use it temporarily
                const expiredProfile = UserProfileStorage.getUserProfile();
                if (expiredProfile) {
                    setUser(expiredProfile);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const handleSignOut = () => {
        tokenStorage.clearAuth();
        UserProfileStorage.clearUserProfile(); // Clear cached profile data
        setUser(null);
        setOpen(false); // close popover
    };

    // Method to refresh user profile (useful for manual refresh)
    const refreshProfile = async () => {
        const token = tokenStorage.getAccessToken();
        if (!token) return;

        setLoading(true);
        UserProfileStorage.clearUserProfile(); // Clear cache to force fresh fetch

        try {
            const res = await axios.get("https://smartville.onrender.com/me/", {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.data.status === "success") {
                const profileData = res.data.data;
                setUser(profileData);
                UserProfileStorage.setUserProfile(profileData);
            }
        } catch (err) {
            console.error("Failed to refresh user profile:", err);
        } finally {
            setLoading(false);
        }
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

                        {user.village && (
                            <div>
                                <strong>Village:</strong> {user.village.village}, {user.village.cell}, {user.village.sector}, {user.village.district}, {user.village.province}
                            </div>
                        )}

                        <div className="mt-2 flex justify-between items-center">
                            <button
                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm font-medium"
                                onClick={refreshProfile}
                                disabled={loading}
                            >
                                Refresh
                            </button>
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