import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Calendar, RefreshCw } from "lucide-react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { VolunteeringEventCard } from "./VolunteeringEventCard";
import { CreateVolunteeringEventDialog } from "./CreateVolunteeringEventDialog";

import VolunteerService from "../volunteeringServices";
import { toast } from "sonner";
import { VolunteeringEventListItem, VolunteeringStatus } from "../types";


interface EventsCardProps {
    events?: VolunteeringEventListItem[];
    villageId?: string;
    showCreateButton?: boolean;
    maxEvents?: number;
}

export const VolunteeringEventsListCard: React.FC<EventsCardProps> = ({
    events: propEvents,
    villageId,
    showCreateButton = false,
    maxEvents = 3
}) => {
    const [events, setEvents] = useState<VolunteeringEventListItem[]>(propEvents || []);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const fetchEvents = useCallback(async () => {
        if (propEvents) return; // Use prop events if provided

        try {
            setLoading(true);
            const params = {
                limit: maxEvents,
                village_id: villageId,
                status: VolunteeringStatus.Approved
            };
            const res = await VolunteerService.getVolunteeringEvents(params);
            setEvents(res.data);
        } catch (err) {
            console.error("Error fetching events:", err);
            toast.error("Failed to fetch volunteering events");
        } finally {
            setLoading(false);
        }
    }, [propEvents, maxEvents, villageId]);

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchEvents();
        setRefreshing(false);
        toast.success("Events refreshed");
    };

    const handleJoinEvent = (eventId: string) => {
        toast.info(`Join functionality for event ${eventId} not implemented yet`);
    };

    useEffect(() => {
        if (!propEvents) {
            fetchEvents();
        }
    }, [fetchEvents, propEvents, villageId]);

    return (
        <Card className="border-none bg-white shadow-sm">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="bg-green-500 p-2 rounded-lg">
                            <Calendar className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <CardTitle className="text-xl font-bold text-gray-900">Volunteering Events</CardTitle>
                            <CardDescription className="text-sm text-gray-600">
                                Make a difference in your community
                            </CardDescription>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleRefresh}
                            disabled={refreshing}
                        >
                            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                        </Button>

                        {showCreateButton && (
                            <CreateVolunteeringEventDialog onSuccess={fetchEvents} />
                        )}

                        <Link to="/VolunteeringEvents">
                            <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                                View All →
                            </Button>
                        </Link>
                    </div>
                </div>
            </CardHeader>

            <Separator className="mx-6" />

            <CardContent className="space-y-4 pt-6">
                {loading ? (
                    <div className="flex items-center justify-center py-8">
                        <RefreshCw className="w-6 h-6 animate-spin text-gray-400" />
                        <span className="ml-2 text-gray-500">Loading events...</span>
                    </div>
                ) : events.length > 0 ? (
                    events.slice(0, maxEvents).map((event) => (
                        <VolunteeringEventCard
                            key={event.volunteer_id}
                            event={event}
                            onJoinEvent={handleJoinEvent}
                        />
                    ))
                ) : (
                    <div className="text-center py-8">
                        <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 mb-4">No volunteering events available</p>
                        {showCreateButton && (
                            <CreateVolunteeringEventDialog onSuccess={fetchEvents} />
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};