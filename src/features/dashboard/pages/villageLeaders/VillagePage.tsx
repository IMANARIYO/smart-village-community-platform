


import React, { useEffect, useState } from 'react';
import { Calendar, Users, Phone, Bell, Lock, Shield, UserCheck, ChevronRight, Eye, MessageSquareMore } from 'lucide-react';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { Link, useParams } from 'react-router-dom';

import VillageService from '../../../news/newsServices';
import type { GetVillageNewsApiResponse } from '../../../news/newsTypes';
import EventService from '../../../events/eventService';
import type { VillageEventsApiResponse } from '../../../events/types';
import { VolunteeringEventsListCard } from '@/features/volunteering/components/VolunteeringEventsListCard';
import { Button } from '@/components/ui/button';
import { useVisitedVillage } from '@/features/homePages/context/VillageContext';
import { LoginDialog } from '../../../auth/components/LoginDialog';
import { tokenStorage } from '@/features/auth/utils/tokenStorage';
import { extractErrorMessage } from '@/utils/extractErrorMessage';

interface StatCardProps {
    icon: React.ReactNode;
    value: string;
    label: string;
    color: string;
}

interface QuickLinkProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    count: string;
    href: string;
    bgColor?: string;
    trending?: boolean;
    featured?: boolean;
    priority?: boolean;
}

interface AnnouncementProps {
    title: string;
    description: string;
    date: string;
    views: string;
}


const StatCard = ({ icon, value, label, color }: StatCardProps) => (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${color}`}>
            {icon}
        </div>
        <div className="text-2xl font-bold mb-1">{value}</div>
        <div className="text-sm opacity-90">{label}</div>
    </div>
);

const QuickLink = ({ icon, bgColor, title, description, count, trending, featured, priority, href }: QuickLinkProps) => (
    <div className={`relative bg-${bgColor} rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden`}>
        <div className="absolute top-2 right-2 w-22 h-22 rounded-full bg-transparent opacity-10 border border-red-700" />
        <div className="absolute bottom-2 left-2 w-20 h-20 rounded-full border border-red-700 opacity-10" />

        <div className="flex items-start justify-between mb-4 relative z-10">
            <div
                className={`p-3 rounded-lg ${trending
                    ? 'bg-green-100 text-green-600'
                    : featured
                        ? 'bg-yellow-100 text-yellow-600'
                        : priority
                            ? 'bg-blue-100 text-blue-600'
                            : 'bg-gray-100 text-gray-600'
                    }`}
            >
                {icon}
            </div>
            {trending && <span className="text-xs bg-primary-light text-green-600 px-2 py-1 rounded-full">Trending</span>}
            {featured && <span className="text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full">Features</span>}
            {priority && <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">Priority</span>}
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2 relative z-10">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 relative z-10">{description}</p>
        <div className="flex items-center justify-between relative z-10">
            <span className="text-sm text-gray-500">{count}</span>
            <Link to={href}>
                <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
        </div>
    </div>
);

const AnnouncementCard: React.FC<AnnouncementProps> = ({ title, description, date, views }) => (
    <div className="bg-primary-light p-4 rounded-lg border-2 border-primary-light-hover transition-colors cursor-pointer">
        <div className="flex justify-between items-start mb-2">
            <h4 className="font-semibold text-gray-900">{title}</h4>
            <span className="text-xs text-gray-500">{date}</span>
        </div>
        <p className="text-gray-600 text-sm mb-3">{description}</p>
        <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 flex gap-2 items-center"><Eye className="w-4 h-4" />{views}</span>
            <Button className="text-sm text-primary-dark hover:text-primary-dark-hover font-medium">
                Read More →
            </Button>
        </div>
    </div>
);


const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; locked?: boolean }> = ({ icon, title, locked }) => (
    <div className={`flex items-center justify-between p-4 rounded-lg border ${locked ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-100 hover:border-gray-200 cursor-pointer'
        } transition-colors`}>
        <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${locked ? 'bg-gray-100 text-gray-400' : 'bg-blue-100 text-blue-600'}`}>
                {icon}
            </div>
            <span className={`font-medium ${locked ? 'text-gray-400' : 'text-gray-900'}`}>{title}</span>
        </div>
        {locked && <Lock className="w-4 h-4 text-gray-400" />}
    </div>
);

export default function VillagePage() {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const { setVisitedVillage } = useVisitedVillage();
    const { villageId } = useParams<{ villageId: string }>();
    const [villageData, setVillageData] = useState<GetVillageNewsApiResponse | null>(null);
    const [eventsData, setEventsData] = useState<VillageEventsApiResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = tokenStorage.getAccessToken();
        setIsSignedIn(!!token);
    }, []);

    const handleLoginSuccess = () => {
        setIsSignedIn(true);
    };



    useEffect(() => {
        const fetchVillageData = async () => {
            if (!villageId) return;

            try {
                setLoading(true);

                const [newsRes, eventsRes] = await Promise.all([
                    VillageService.getVillageNews(villageId),
                    EventService.getVillageEvents(villageId)
                ]);

                if (newsRes.success) {
                    setVillageData(newsRes.data);
                    setVisitedVillage({
                        village_id: newsRes.data.village.village_id,
                        village: newsRes.data.village.village,
                        cell: newsRes.data.village.cell,
                        sector: newsRes.data.village.sector,
                        district: newsRes.data.village.district,
                        province: newsRes.data.village.province,
                        village_leader: newsRes.data.village.village_leader,
                    });
                }

                if (eventsRes.success) {
                    setEventsData(eventsRes);
                }
            } catch (error) {
                console.error("Failed to fetch village data:", extractErrorMessage(error));
            } finally {
                setLoading(false);
            }
        };
        fetchVillageData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [villageId]);

    const stats = [

        { icon: <Users className="w-6 h-6" />, value: `${villageData?.total_residents ?? 0}`, label: "Residents", color: "bg-blue-600" },
        { icon: <Bell className="w-6 h-6" />, value: `${villageData?.total_volunteering_events ?? 0}`, label: "volunteering events", color: "bg-green-600" },
        { icon: <Calendar className="w-6 h-6" />, value: `${eventsData?.data?.events?.length ?? 0}`, label: "Events", color: "bg-yellow-600" },
        { icon: <Shield className="w-6 h-6" />, value: "Excellent", label: "Safety Level", color: "bg-purple-600" }
    ];

    const announcements = eventsData?.data?.events
        ?.filter(event => event.type === 'Announcement' || event.type === 'Alert')
        ?.slice(0, 3)
        ?.map(event => ({
            title: event.title,
            description: event.description,
            date: new Date(event.date).toLocaleDateString(),
            views: "0 Views"
        })) || [];



    return (
        <div className="min-h-screen bg-background-normal">



            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-green-600 via-blue-600 to-purple-600 py-20">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: "url('/imgs/homeBackGround.png')",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundAttachment: "fixed",
                        backgroundPosition: "top",
                    }}
                ></div>
                <div className='absolute inset-0 bg-[linear-gradient(270deg,rgba(46,125,50,0.7)_0%,rgba(25,118,210,0.7)_50%,rgba(46,125,50,0.7)_100%)]' />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="text-yellow-400 text-sm font-medium mb-4">🏘️ Smart Community Platform</div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                        Welcome to<br />
                        <span className="text-yellow-400">{villageData?.village.village}</span>
                    </h1>
                    <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto">
                        Discover community news, join volunteering events, and stay connected with your neighbors in our smart village platform.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                        {stats.map((stat, index) => (
                            <StatCard key={index} {...stat} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Quick Links Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Quick Links</h2>
                        <p className="text-gray-600">Explore community features and stay connected with your neighbors</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Bell className="w-6 h-6" />,
                                title: "News",
                                description: "Stay updated with the latest community announcements and important news",
                                count: "8 records",
                                href: `/news/${villageId}`,
                                bgColor: "primary-light",
                                trending: true
                            },
                            {
                                icon: <Calendar className="w-6 h-6" />,
                                title: "Events",
                                description: "Stay updated with the latest community announcements and important news",
                                count: `${villageData?.events.length} active`,
                                href: "/VolunteeringEvents",
                                bgColor: "secondary-light-hover",
                                featured: true
                            },
                            {
                                bgColor: "accent-light",
                                icon: <Phone className="w-6 h-6" />,
                                title: "Contacts",
                                href: "/EmergencyContacts",
                                description: "Stay updated with the latest community announcements and important news",
                                count: "24/7 Available",
                                priority: true
                            }
                        ].map((link, index) => (
                            <QuickLink key={index} {...link} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Content Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Announcements */}
                            <Card className='border-none bg-primary-light'>
                                <CardHeader>
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-green-600 p-2 rounded-lg">
                                            <MessageSquareMore className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-xl font-bold text-gray-900">Latest Announcements</CardTitle>
                                            <CardDescription className="text-sm text-gray-600">Stay informed with community updates</CardDescription>
                                        </div>
                                    </div>
                                    {/* <CardAction className="text-green-600 hover:text-green-700 font-medium">View All →</CardAction> */}

                                    <Link to="/VolunteeringEvents" >
                                        <CardAction className="text-green-600 hover:text-green-700 font-medium">
                                            View All →
                                        </CardAction>
                                    </Link>
                                </CardHeader>
                                <Separator className="!w-[94%] bg-primary-light-active mx-auto !h-0.5" />
                                <CardContent className="space-y-4">
                                    {loading ? (
                                        <div className="text-center py-4 text-muted-foreground">Loading announcements...</div>
                                    ) : announcements.length > 0 ? (
                                        announcements.map((announcement, index) => (
                                            <AnnouncementCard key={index} {...announcement} />
                                        ))
                                    ) : (
                                        <div className="text-center py-4 text-muted-foreground">No announcements available</div>
                                    )}
                                </CardContent>
                            </Card>

                            <VolunteeringEventsListCard villageId={villageData?.village.village_id} />
                        </div>


                        <div className="space-y-6">
                            {/* Sign In Card */}
                            {!isSignedIn && (
                                <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-6 text-white">
                                    <div className="bg-yellow-500 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                                        <UserCheck className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold mb-2">Sign in for More Features</h3>
                                    <p className="text-sm opacity-90 mb-4">
                                        Access emergency contacts, detailed incident reports, visitor management, and more community features
                                    </p>
                                    <LoginDialog onLoginSuccess={handleLoginSuccess}>
                                        <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                                            👤 Sign In
                                        </button>
                                    </LoginDialog>
                                </div>
                            )}

                            {/* Features Card */}
                            <div className="bg-white rounded-xl p-6 shadow-sm">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">🔓 Unlock Features</h3>
                                <div className="space-y-3">
                                    <FeatureCard
                                        icon={<Shield className="w-5 h-5" />}
                                        title="Safety Reports"
                                        locked={!isSignedIn}
                                    />
                                    <FeatureCard
                                        icon={<Phone className="w-5 h-5" />}
                                        title="Emergency Contacts"
                                        locked={!isSignedIn}
                                    />
                                    <FeatureCard
                                        icon={<Users className="w-5 h-5" />}
                                        title="Visitor Management"
                                        locked={!isSignedIn}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}