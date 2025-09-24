"use client";

import { useEffect, useState } from "react";
import type { UserProfile } from "../authTypes";
import { tokenStorage } from "../../../utils/tokenStorage";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { LoginForm } from "./login-form";
import { ChevronDown, LogIn, User, Phone, IdCard, ShieldCheck, MapPin } from "lucide-react";
import { useLanguage } from "@/features/i18n/useLanguage";
import { NavBartranslations } from "@/components/NavBarTranslation";
import { UserProfileStorage } from "../utils/UserProfileStorage";
import UserService from "../authService";
import { useAuthStore } from "@/store/authStore";

export function UserProfilePopover() {
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState(false);
    const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

    const { language } = useLanguage();
    const t = NavBartranslations[language];
    const { isAuthenticated, logout } = useAuthStore();

    useEffect(() => {
        const fetchUser = async () => {
            const token = tokenStorage.getAccessToken();
            if (!token || !isAuthenticated) {
                setUserProfile(null);
                return;
            }


            if (userProfile) {
                return;
            }

            const cachedProfile = UserProfileStorage.getUserProfile();
            if (cachedProfile) {
                setUserProfile(cachedProfile);
                return;
            }

            setLoading(true);
            try {
                const res = await UserService.getMyProfile();
                if (res.success) {
                    setUserProfile(res.data);
                    UserProfileStorage.setUserProfile(res.data);
                }
            } catch (err) {
                console.error("Failed to fetch user profile:", err);
                const expiredProfile = UserProfileStorage.getUserProfile();
                if (expiredProfile) setUserProfile(expiredProfile);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [isAuthenticated, userProfile]);

    useEffect(() => {
        const goOnline = () => setIsOnline(true);
        const goOffline = () => setIsOnline(false);
        window.addEventListener("online", goOnline);
        window.addEventListener("offline", goOffline);
        return () => {
            window.removeEventListener("online", goOnline);
            window.removeEventListener("offline", goOffline);
        };
    }, []);

    const handleSignOut = () => {
        logout();
        UserProfileStorage.clearUserProfile();
        setUserProfile(null);
        setOpen(false);
    };

    const refreshProfile = async () => {
        const token = tokenStorage.getAccessToken();
        if (!token) return;
        setLoading(true);
        UserProfileStorage.clearUserProfile();
        try {
            const res = await UserService.getMyProfile();
            if (res.success) {
                setUserProfile(res.data);
                UserProfileStorage.setUserProfile(res.data);
            }
        } catch (err) {
            console.error("Failed to refresh user profile:", err);
        } finally {
            setLoading(false);
        }
    };

    const getInitials = () => {
        return userProfile ? `${userProfile.first_name?.[0] || ""}${userProfile.last_name?.[0] || ""}`.toUpperCase() : "SI";
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger>
                {userProfile ? (
                    <div className="flex items-center space-x-4 p-2 text-sm font-medium text-foreground bg-sv-primary-light hover:bg-primary-light-hover rounded-lg cursor-pointer transition-all duration-200 w-full">
                        <div className="h-5 w-5 bg-sv-primary text-primary-foreground rounded-full flex items-center justify-center font-medium">
                            {getInitials()}
                        </div>
                        <span className="text-xs text-muted-foreground">{userProfile.role}</span>
                        <div className="flex items-center ml-auto space-x-1">
                            <div className={`w-2 h-2 rounded-full ${isOnline ? "bg-success-normal" : "bg-muted"}`}></div>
                            <ChevronDown className="w-4 h-4 transition-transform" />
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-primary-foreground bg-sv-primary-dark hover:bg-primary-light-active rounded-lg cursor-pointer transition-all duration-200">
                        <LogIn className="w-4 h-4" />
                        <span>{t.signIn}</span>
                    </div>
                )}
            </PopoverTrigger>

            <PopoverContent className="w-full sm:w-80 md:w-96 lg:w-[30vw] max-h-[90vh] overflow-y-auto p-4">
                {loading ? (
                    <p>{t.loading}</p>
                ) : userProfile ? (
                    <div className="bg-card rounded-lg shadow-lg border border-border overflow-hidden">
                        {/* Header */}
                        <div className="px-4 py-3 border-b border-border flex items-center space-x-3">
                            <div className="w-12 h-12 bg-sv-primary text-primary-foreground rounded-full flex items-center justify-center font-medium text-lg">
                                {getInitials()}
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-card-foreground">{`${userProfile.first_name} ${userProfile.last_name}`}</p>
                                <p className="text-sm text-muted-foreground">{userProfile.role}</p>
                                <div className="flex items-center mt-1">
                                    <div className={`w-2 h-2 rounded-full mr-2 ${isOnline ? "bg-success-normal" : "bg-muted"}`}></div>
                                    <span className={`text-xs ${isOnline ? "text-success-normal" : "text-muted-foreground"}`}>
                                        {isOnline ? t.online : t.offline}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Quick actions */}
                        <div className="py-2 flex flex-col border-b border-border">
                            <a href="#profile" className="flex items-center px-4 py-2 text-sm text-card-foreground hover:bg-muted rounded-md">
                                <User className="w-4 h-4 mr-3 text-muted-foreground" /> {t.viewProfile}
                            </a>
                            <a href="#settings" className="flex items-center px-4 py-2 text-sm text-card-foreground hover:bg-muted rounded-md">
                                <div className="w-4 h-4 mr-3 text-muted-foreground">⚙️</div> {t.settings}
                            </a>
                            <a href="#help" className="flex items-center px-4 py-2 text-sm text-card-foreground hover:bg-muted rounded-md">
                                <div className="w-4 h-4 mr-3 text-muted-foreground">❓</div> {t.helpSupport}
                            </a>
                        </div>

                        {/* Detailed Info */}
                        <div className="px-4 py-3 space-y-2 text-sm text-card-foreground border-b border-border">
                            <div className="flex items-center space-x-2">
                                <User className="w-4 h-4 text-muted-foreground" />
                                <span>{userProfile.first_name} {userProfile.last_name}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Phone className="w-4 h-4 text-muted-foreground" />
                                <span>{userProfile.phone_number}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <ShieldCheck className="w-4 h-4 text-muted-foreground" />
                                <span>{userProfile.is_verified ? t.verified : t.notVerified}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <IdCard className="w-4 h-4 text-muted-foreground" />
                                <span>{userProfile.national_id}</span>
                            </div>
                            {userProfile.village && (
                                <div className="flex items-center space-x-2">
                                    <MapPin className="w-4 h-4 text-muted-foreground" />
                                    <span>
                                        {userProfile.village.name}, {userProfile.village.cell}, {userProfile.village.sector}, {userProfile.village.district}, {userProfile.village.province}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Footer actions */}
                        <div className="flex justify-between items-center px-4 py-3">
                            <button
                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm font-medium"
                                onClick={refreshProfile}
                                disabled={loading}
                            >
                                {t.refresh}
                            </button>
                            <button
                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm font-medium"
                                onClick={handleSignOut}
                            >
                                {t.signOut}
                            </button>
                        </div>
                    </div>
                ) : (
                    <LoginForm />
                )}
            </PopoverContent>
        </Popover >
    );
}
