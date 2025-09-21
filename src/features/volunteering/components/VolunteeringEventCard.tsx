
import { useState } from "react";
import { Calendar, MapPin, Eye, Users, Tag } from "lucide-react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

import VolunteerService from "../volunteeringServices";
import type { BaseVolunteringEvent } from "@/types";
import { JoinEventDialog } from "@/features/participations/components/JoinEventDialog";
import { VolunteeringEventListItem } from "../types";

interface VolunteeringEventCardProps {
    event: BaseVolunteringEvent;
    onJoinEvent?: (eventId: string) => void;
    showJoinButton?: boolean;
}

export const VolunteeringEventCard: React.FC<VolunteeringEventCardProps> = ({
    event,

    showJoinButton = true,
}) => {
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [eventDetails, setEventDetails] = useState<VolunteeringEventListItem | null>(null);
    const [loading, setLoading] = useState(false);


    const handleViewDetails = async () => {
        try {
            setLoading(true);
            const res = await VolunteerService.getVolunteerEventById(event.volunteer_id);
            if (res.success) {
                setEventDetails(res.data);
                setDetailsOpen(true);
            } else {
                toast.error("Failed to fetch event details");
            }
        } catch (err) {
            console.error("Error fetching event details:", err);
            toast.error("Error fetching event details");
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <Card className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                                <Calendar className="h-4 w-4 text-green-600" />
                            </div>
                            {event.category && (
                                <Badge variant="outline" className="text-xs flex items-center">
                                    <Tag className="w-3 h-3 mr-1" />
                                    {event.category}
                                </Badge>
                            )}
                            <Badge variant="secondary" className="text-xs">
                                {event.status}
                            </Badge>
                        </div>
                        {event.village?.village && (
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                {event.village.village}
                            </span>
                        )}
                    </div>

                    <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
                        {event.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 text-sm leading-relaxed">
                        {event.description?.length > 100
                            ? `${event.description.substring(0, 100)}...`
                            : event.description}
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center text-gray-600">
                            <Calendar className="h-4 w-4 mr-2 text-green-600" />
                            <span>{new Date(event.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                            <Users className="h-4 w-4 mr-2 text-blue-600" />
                            <span>{event.capacity} spots</span>
                        </div>
                        {event.village && (
                            <div className="flex items-center text-gray-600 col-span-2">
                                <MapPin className="h-4 w-4 mr-2 text-red-600" />
                                <span className="truncate">
                                    {event.village.sector}, {event.village.district}
                                </span>
                            </div>
                        )}
                    </div>
                </CardContent>

                <CardFooter className="flex gap-2 px-6 pb-6">
                    <Button
                        variant="outline"
                        className="flex-1"
                        onClick={handleViewDetails}
                        disabled={loading}
                    >
                        <Eye className="h-4 w-4 mr-2" />
                        {loading ? "Loading..." : "View Details"}
                    </Button>
                    {showJoinButton && event.status === "APPROVED" && (


                        <JoinEventDialog event={event} />
                    )}
                </CardFooter>
            </Card>

            <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Event Details</DialogTitle>
                    </DialogHeader>
                    {eventDetails && (
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-semibold text-gray-900">Title</h4>
                                <p className="text-gray-600">{eventDetails.title}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900">Description</h4>
                                <p className="text-gray-600 leading-relaxed">{eventDetails.description}</p>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <h4 className="font-semibold text-gray-900">Date</h4>
                                    <p className="text-gray-600">{new Date(eventDetails.date).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">Start Time</h4>
                                    <p className="text-gray-600">{eventDetails.start_time || "Not specified"}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">End Time</h4>
                                    <p className="text-gray-600">{eventDetails.end_time || "Not specified"}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h4 className="font-semibold text-gray-900">Capacity</h4>
                                    <p className="text-gray-600">{eventDetails.capacity} volunteers</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">Category</h4>
                                    <p className="text-gray-600">{eventDetails.category}</p>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900">Location</h4>
                                <p className="text-gray-600">{eventDetails.location || "Not specified"}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900">Skills Required</h4>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {eventDetails.skills_required?.length ? (
                                        eventDetails.skills_required.map((skill, index) => (
                                            <Badge key={index} variant="outline">{skill}</Badge>
                                        ))
                                    ) : (
                                        <p className="text-gray-500">No specific skills required</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};
