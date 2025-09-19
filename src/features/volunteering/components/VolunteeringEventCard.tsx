
"use client";

import { Calendar, MapPin, Eye } from "lucide-react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import type { VolunteeringEvent } from "../types";


interface VolunteeringEventCardProps {
    event: VolunteeringEvent;
}

export const VolunteeringEventCard: React.FC<VolunteeringEventCardProps> = ({ event }) => {
    const progressPercentage = Math.round(
        (event.approved_volunteers_count / event.capacity) * 100
    );

    const getProgressColor = (percentage: number) => {
        if (percentage >= 80) return "bg-green-500";
        if (percentage >= 50) return "bg-yellow-500";
        return "bg-red-500";
    };

    return (
        <Card className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center">
                            <Calendar className="h-4 w-4 text-orange-600" />
                        </div>
                        {event.is_full && (
                            <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">
                                Full
                            </span>
                        )}
                    </div>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {event.village?.village}
                    </span>
                </div>

                <CardTitle className="text-xl font-semibold text-gray-900 mb-2">{event.title}</CardTitle>
                <CardDescription className="text-gray-600 text-sm leading-relaxed">
                    {event.description}
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{event.date}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{event.village?.village}</span>
                </div>

                <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">
                            {event.capacity - event.approved_volunteers_count} Spots Available
                        </span>
                        <div className="flex items-center text-sm text-gray-500">
                            <Eye className="h-4 w-4 mr-1" />
                            {/* Optional: you can add view count here */}
                            0 Views
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                                className={`h-2 rounded-full ${getProgressColor(progressPercentage)}`}
                                style={{ width: `${progressPercentage}%` }}
                            ></div>
                        </div>
                        <span className="text-sm text-gray-600">{progressPercentage}%</span>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-2 px-6 pb-6">
                <Button className="w-full bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center justify-center">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                </Button>
                <Button className="w-full bg-orange-500 text-white hover:bg-orange-600">
                    Join Event
                </Button>
            </CardFooter>
        </Card>
    );
};
