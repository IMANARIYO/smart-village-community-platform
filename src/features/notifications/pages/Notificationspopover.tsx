import { Bell } from "lucide-react";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/features/i18n/useLanguage";
import { NavBartranslations } from "@/components/NavBarTranslation";
import { UserProfileStorage } from "@/features/auth/utils/UserProfileStorage";
import { useEffect, useState } from "react";

interface Notification {
    id: string;
    title: string;
    description: string;
    type: "info" | "success" | "warning";
}

interface NotificationDropdownProps {
    notifications?: Notification[];
}

// ✅ Dummy notifications for testing
const dummyNotifications: Notification[] = [
    {
        id: "1",
        title: "New community event",
        description: "Village meeting scheduled for tomorrow at 5 PM",
        type: "info",
    },
    {
        id: "2",
        title: "Safety update",
        description: "New safety guidelines have been published",
        type: "success",
    },
    {
        id: "3",
        title: "Volunteer opportunity",
        description: "Help needed for community cleanup this weekend",
        type: "warning",
    },
    {
        id: "4",
        title: "System maintenance",
        description: "Scheduled downtime on Saturday 2 AM - 4 AM",
        type: "info",
    },
    {
        id: "5",
        title: "Health check reminder",
        description: "Don't forget your annual check-up next week",
        type: "success",
    },
];

export function NotificationDropdown({ notifications = dummyNotifications }: NotificationDropdownProps) {
    const navigate = useNavigate();
    const { language } = useLanguage();
    const t = NavBartranslations[language];

    const [user, setUser] = useState(() => UserProfileStorage.getUserProfile());

    useEffect(() => {
        const handleStorageChange = () => {
            setUser(UserProfileStorage.getUserProfile());
        };

        // Polling method (or you can add an event system to trigger this)
        const interval = setInterval(handleStorageChange, 500);

        return () => clearInterval(interval);
    }, []);

    if (!user) return null; // Nothing if no user

    const unreadCount = notifications.length;

    return (
        <Popover>
            <PopoverTrigger asChild>
                <button className="relative p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200">
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                            {unreadCount > 9 ? "9+" : unreadCount}
                        </span>
                    )}
                </button>
            </PopoverTrigger>

            <PopoverContent
                align="end"
                className="w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 max-h-96 overflow-y-auto"
            >
                <div className="px-4 py-2 border-b border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-900">{t.notifications}</h3>
                </div>

                <div className="py-2">
                    {notifications.length === 0 ? (
                        <p className="text-sm text-gray-500 px-4 py-3">No new notifications</p>
                    ) : (
                        notifications.map((n) => (
                            <div
                                key={n.id}
                                className={`px-4 py-3 hover:bg-gray-50 border-l-4 
                                ${n.type === "info"
                                        ? "border-blue-500"
                                        : n.type === "success"
                                            ? "border-green-500"
                                            : "border-yellow-500"
                                    }`}
                            >
                                <p className="text-sm font-medium text-gray-900">{n.title}</p>
                                <p className="text-xs text-gray-500 mt-1">{n.description}</p>
                            </div>
                        ))
                    )}
                </div>

                <div className="px-4 py-2 border-t border-gray-200">
                    <button
                        onClick={() => navigate("/notifications")}
                        className="text-xs text-green-600 hover:text-green-800 font-medium"
                    >
                        {t.viewAllNotifications}
                    </button>
                </div>
            </PopoverContent>
        </Popover>
    );
}