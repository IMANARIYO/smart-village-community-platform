"use client";

import { Calendar, MapPin } from "lucide-react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,

} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import type { Event } from "../types"; // adjust path to your Event interface

interface EventCardProps {
    event: Event;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => (
    <Card className="border border-yellow-200 hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <CardTitle className="text-yellow-600 text-lg mb-2">{event.title}</CardTitle>
                    <CardDescription className="text-gray-700 text-sm leading-relaxed">
                        {event.description}
                    </CardDescription>
                </div>
                {event.organizer && (
                    <div className="ml-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
                            {/* {event.organizer} */} organizer
                        </span>
                    </div>
                )}
            </div>
        </CardHeader>

        <CardContent className="pt-0">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-gray-600">
                    <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{event.exact_place_of_village}</span>
                    </div>
                </div>

                <Button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2">
                    Join Event
                </Button>
            </div>
        </CardContent>
    </Card>
);
