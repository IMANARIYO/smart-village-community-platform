"use client"

import { Link } from "react-router-dom"
import { Calendar, MapPin } from "lucide-react"
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardAction,
} from "../../../components/ui/card"
import { Separator } from "@radix-ui/react-dropdown-menu"
import { Button } from "../../../components/ui/button"



interface EventProps {
    title: string;
    description: string;
    date: string;
    location: string;
    volunteers: string;
    status: string;
}
export const EventCard: React.FC<EventProps> = ({ title, description, date, location, volunteers }) => (
    <Card className="border border-yellow-200 hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <CardTitle className="text-yellow-600 text-lg mb-2">
                        {title}
                    </CardTitle>
                    <CardDescription className="text-gray-700 text-sm leading-relaxed">
                        {description}
                    </CardDescription>
                </div>
                <div className="ml-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
                        {volunteers}
                    </span>
                </div>
            </div>
        </CardHeader>

        <CardContent className="pt-0">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-gray-600">
                    <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{location}</span>
                    </div>
                </div>

                <Button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2">
                    Join Event
                </Button>
            </div>
        </CardContent>
    </Card>
);


export function EventsCard() {


    return (
        <Card className="border-none bg-white">
            <CardHeader>
                <div className="flex items-center space-x-3">
                    <div className="bg-yellow-500 p-2 rounded-lg">
                        <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <CardTitle className="text-xl font-bold text-gray-900">Volunteering Events</CardTitle>
                        <CardDescription className="text-sm text-gray-600">Make a difference in your community</CardDescription>
                    </div>
                </div>

                <Link to="/VolunteeringEvents">
                    <CardAction className="text-yellow-600 hover:text-yellow-700 font-medium">View All →</CardAction>
                </Link>
            </CardHeader>
            <Separator className="!w-[94%] bg-gray-200 mx-auto !h-0.5" />
            <CardContent className="space-y-4">
                {[
                    {
                        title: "Tree Planting Drive",
                        description: "Help us plant 100 trees in the neighborhood to improve air quality and create a greener environment.",
                        date: "2025-01-04",
                        location: "Youth Center",
                        volunteers: "15/30 Volunteers",
                        status: "Active"
                    },
                    {
                        title: "Youth Mentorship Program",
                        description: "Volunteer to mentor young people in the community and help them develop new skills.",
                        date: "2025-01-04",
                        location: "Youth Center",
                        volunteers: "12/25 Volunteers",
                        status: "Active"
                    }
                ].map((event, index) => (
                    <EventCard key={index} {...event} />
                ))}
            </CardContent>
        </Card>
    )
}
