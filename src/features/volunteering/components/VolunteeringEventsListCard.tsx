
import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardAction,
} from "@/components/ui/card";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { VolunteeringEventCard } from "./VolunteeringEventCard";
import type { VolunteeringEvent } from "../types";


interface EventsCardProps {
    events: VolunteeringEvent[];
}

export const VolunteeringEventsListCard: React.FC<EventsCardProps> = ({ events }) => {
    return (
        <Card className="border-none bg-white">
            <CardHeader>
                <div className="flex items-center space-x-3">
                    <div className="bg-yellow-500 p-2 rounded-lg">
                        <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <CardTitle className="text-xl font-bold text-gray-900">Volunteering Events</CardTitle>
                        <CardDescription className="text-sm text-gray-600">
                            Make a difference in your community
                        </CardDescription>
                    </div>
                </div>

                <Link to="/VolunteeringEvents">
                    <CardAction className="text-yellow-600 hover:text-yellow-700 font-medium">
                        View All →
                    </CardAction>
                </Link>
            </CardHeader>

            <Separator className="!w-[94%] bg-gray-200 mx-auto !h-0.5" />

            <CardContent className="space-y-4">
                {events.map((event) => (
                    <VolunteeringEventCard key={event.id} event={event} />
                ))}
            </CardContent>
        </Card>
    );
};
