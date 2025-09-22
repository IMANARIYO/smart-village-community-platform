import { Bell, X, Clock, CheckCircle, AlertTriangle, Info, ExternalLink } from "lucide-react";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/features/i18n/useLanguage";
import { NavBartranslations } from "@/components/NavBarTranslation";
import { UserProfileStorage } from "@/features/auth/utils/UserProfileStorage";
import { useEffect, useState } from "react";

interface Notification {
    id: string;
    title: string;
    description: string;
    type: "info" | "success" | "warning" | "error";
    timestamp: string;
    isRead: boolean;
    actionUrl?: string;
    priority: "low" | "medium" | "high";
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
        timestamp: "2 hours ago",
        isRead: false,
        actionUrl: "/events/village-meeting",
        priority: "high",
    },
    {
        id: "2",
        title: "Safety update",
        description: "New safety guidelines have been published",
        type: "success",
        timestamp: "4 hours ago",
        isRead: false,
        actionUrl: "/safety/guidelines",
        priority: "medium",
    },
    {
        id: "3",
        title: "Volunteer opportunity",
        description: "Help needed for community cleanup this weekend",
        type: "warning",
        timestamp: "1 day ago",
        isRead: true,
        actionUrl: "/volunteering/cleanup",
        priority: "medium",
    },
    {
        id: "4",
        title: "System maintenance",
        description: "Scheduled downtime on Saturday 2 AM - 4 AM",
        type: "info",
        timestamp: "2 days ago",
        isRead: true,
        priority: "low",
    },
    {
        id: "5",
        title: "Health check reminder",
        description: "Don't forget your annual check-up next week",
        type: "success",
        timestamp: "3 days ago",
        isRead: false,
        actionUrl: "/health/checkup",
        priority: "high",
    },
];

// Hook to detect mobile screen size
function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkIsMobile();
        window.addEventListener('resize', checkIsMobile);
        return () => window.removeEventListener('resize', checkIsMobile);
    }, []);

    return isMobile;
}

// Notification type icons
const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
        case "info":
            return <Info className="w-4 h-4 text-blue-500" />;
        case "success":
            return <CheckCircle className="w-4 h-4 text-green-500" />;
        case "warning":
            return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
        case "error":
            return <X className="w-4 h-4 text-red-500" />;
        default:
            return <Bell className="w-4 h-4 text-gray-500" />;
    }
};

// Notification priority colors
const getPriorityColor = (priority: Notification["priority"]) => {
    switch (priority) {
        case "high":
            return "bg-red-100 border-red-200";
        case "medium":
            return "bg-yellow-100 border-yellow-200";
        case "low":
            return "bg-gray-100 border-gray-200";
        default:
            return "bg-gray-100 border-gray-200";
    }
};

// Individual notification item component
function NotificationItem({ notification, onNavigate }: { notification: Notification; onNavigate: (url: string) => void }) {
    const handleClick = () => {
        if (notification.actionUrl) {
            onNavigate(notification.actionUrl);
        }
    };

    return (
        <div
            className={`notification-item p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer ${
                !notification.isRead ? getPriorityColor(notification.priority) : "bg-white"
            }`}
            onClick={handleClick}
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleClick();
                }
            }}
        >
            <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                        <p className={`text-sm font-medium ${
                            !notification.isRead ? "text-gray-900" : "text-gray-600"
                        }`}>
                            {notification.title}
                        </p>
                        {!notification.isRead && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                        )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {notification.description}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center space-x-1 text-xs text-gray-400">
                            <Clock className="w-3 h-3" />
                            <span>{notification.timestamp}</span>
                        </div>
                        {notification.actionUrl && (
                            <ExternalLink className="w-3 h-3 text-gray-400" />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export function NotificationDropdown({ notifications = dummyNotifications }: NotificationDropdownProps) {
    const navigate = useNavigate();
    const { language } = useLanguage();
    const t = NavBartranslations[language];
    const isMobile = useIsMobile();
    const [isOpen, setIsOpen] = useState(false);

    const [user, setUser] = useState(() => UserProfileStorage.getUserProfile());

    useEffect(() => {
        const handleStorageChange = () => {
            setUser(UserProfileStorage.getUserProfile());
        };

        const interval = setInterval(handleStorageChange, 500);
        return () => clearInterval(interval);
    }, []);

    if (!user) return null;

    const unreadNotifications = notifications.filter(n => !n.isRead);
    const unreadCount = unreadNotifications.length;
    const sortedNotifications = [...notifications].sort((a, b) => {
        // Sort by read status first (unread first), then by priority
        if (a.isRead !== b.isRead) return a.isRead ? 1 : -1;
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    const handleNavigate = (url: string) => {
        navigate(url);
        setIsOpen(false);
    };

    const NotificationTrigger = (
        <button className="relative p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
                <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs font-medium"
                >
                    {unreadCount > 9 ? "9+" : unreadCount}
                </Badge>
            )}
        </button>
    );

    const NotificationContent = (
        <div className="w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">{t.notifications}</h3>
                    {unreadCount > 0 && (
                        <p className="text-sm text-gray-500">
                            {unreadCount} {unreadCount === 1 ? t.newNotification : t.newNotifications}
                        </p>
                    )}
                </div>
                {unreadCount > 0 && (
                    <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                        {t.markAllRead}
                    </Button>
                )}
            </div>

            <div className="max-h-96 overflow-y-auto notification-scroll">
                {sortedNotifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 px-4">
                        <Bell className="w-12 h-12 text-gray-300 mb-4" />
                        <p className="text-sm text-gray-500 text-center">{t.noNotifications}</p>
                        <p className="text-xs text-gray-400 text-center mt-1">
                            {t.notificationSubtext}
                        </p>
                    </div>
                ) : (
                    sortedNotifications.map((notification) => (
                        <NotificationItem
                            key={notification.id}
                            notification={notification}
                            onNavigate={handleNavigate}
                        />
                    ))
                )}
            </div>

            {sortedNotifications.length > 0 && (
                <div className="p-4 border-t border-gray-200">
                    <Button
                        variant="ghost"
                        className="w-full text-green-600 hover:text-green-700 hover:bg-green-50"
                        onClick={() => handleNavigate("/notifications")}
                    >
                        {t.viewAllNotifications}
                        <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            )}
        </div>
    );

    // Use Sheet for mobile, Popover for desktop
    if (isMobile) {
        return (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    {NotificationTrigger}
                </SheetTrigger>
                <SheetContent side="right" className="w-full sm:w-96 p-0">
                    <SheetHeader className="sr-only">
                        <SheetTitle>{t.notifications}</SheetTitle>
                    </SheetHeader>
                    {NotificationContent}
                </SheetContent>
            </Sheet>
        );
    }

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                {NotificationTrigger}
            </PopoverTrigger>
            <PopoverContent
                align="end"
                className="w-96 p-0 bg-white rounded-lg shadow-lg border border-gray-200"
                sideOffset={8}
            >
                {NotificationContent}
            </PopoverContent>
        </Popover>
    );
}