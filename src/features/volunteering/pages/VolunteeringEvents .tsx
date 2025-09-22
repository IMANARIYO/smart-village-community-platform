import { useEffect, useState } from 'react';
import { Search, Filter, ChevronDown, Users, Heart, GraduationCap, TreePine, Shield, DollarSign, Calendar, Vote } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    VolunteeringCategory,
    VolunteeringStatus,
    type VolunteeringEventListItem
} from '../types';
import { VolunteeringEventCard } from '../components/VolunteeringEventCard';
import { CreateVolunteeringEventDialog } from '../components/CreateVolunteeringEventDialog';
import VolunteerService from '../volunteeringServices';

const VolunteeringEvents = () => {
    const [selectedCategory, setSelectedCategory] = useState<'All Categories' | VolunteeringCategory>('All Categories');
    const [selectedStatus, setSelectedStatus] = useState<'All Statuses' | VolunteeringStatus>('All Statuses');
    const [searchTerm, setSearchTerm] = useState('');
    const [events, setEvents] = useState<VolunteeringEventListItem[]>([]);
    const [, setLoading] = useState(false);


    const categoryIcons: Record<VolunteeringCategory, typeof Users> = {
        [VolunteeringCategory.CommunitySocial]: Users,
        [VolunteeringCategory.HealthWellness]: Heart,
        [VolunteeringCategory.EducationSkills]: GraduationCap,
        [VolunteeringCategory.EnvironmentalSustainability]: TreePine,
        [VolunteeringCategory.SafetyEmergency]: Shield,
        [VolunteeringCategory.EconomicLivelihood]: DollarSign,
        [VolunteeringCategory.SpecialOneOff]: Calendar,
        [VolunteeringCategory.CivicGovernance]: Vote,
    };

    const categories = [
        { value: 'All Categories', label: 'All Categories', icon: Filter },
        ...Object.values(VolunteeringCategory).map(cat => ({
            value: cat,
            label: cat,
            icon: categoryIcons[cat],
        })),
    ];

    const statuses = [
        { value: 'All Statuses', label: 'All Statuses' },
        ...Object.values(VolunteeringStatus).map(status => ({ value: status, label: status })),
    ];

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            try {
                const data = await VolunteerService.getVolunteeringEvents({
                    category: selectedCategory !== 'All Categories' ? selectedCategory : undefined,
                    status: selectedStatus !== 'All Statuses' ? selectedStatus : undefined,
                });
                setEvents(data.data);
            } catch (error) {
                console.error('Failed to fetch volunteering events', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [selectedCategory, selectedStatus]);

    const filteredEvents = events.filter(event => {
        const matchesSearch =
            event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch;
    });

    const selectedCategoryData = categories.find(cat => cat.value === selectedCategory);
    const SelectedIcon = selectedCategoryData?.icon || Filter;

    return (
        <div className="min-h-screen bg-gray-50">
            <CreateVolunteeringEventDialog />

            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <h1 className="text-xl font-semibold text-gray-900">Nyarucyamo II</h1>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Volunteering Events</h1>
                    <p className="text-xl mb-2">Nyarucyamo II Village</p>
                    <p className="text-lg opacity-90">Make a difference in your community</p>
                </div>
            </div>

            {/* Search and Filter Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white p-6 rounded-lg shadow-sm mb-8 flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search events..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    {/* Category Dropdown */}
                    <div className="flex items-center space-x-3">
                        <span className="text-sm text-gray-600 font-medium">Filter by Category:</span>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 min-w-[200px]">
                                <SelectedIcon className="h-4 w-4 text-gray-500" />
                                <span className="text-sm font-medium text-gray-700 flex-1 text-left">{selectedCategory}</span>
                                <ChevronDown className="h-4 w-4 text-gray-400" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-64 max-h-80 overflow-y-auto">
                                {categories.map(category => {
                                    const IconComponent = category.icon;
                                    return (
                                        <DropdownMenuItem
                                            key={category.value}
                                            onClick={() => setSelectedCategory(category.value as VolunteeringCategory)}
                                            className="flex items-center space-x-2 cursor-pointer"
                                        >
                                            <IconComponent className="h-4 w-4 text-gray-500" />
                                            <span className="flex-1">{category.label}</span>
                                            {selectedCategory === category.value && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
                                        </DropdownMenuItem>
                                    );
                                })}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    {/* Status Dropdown */}
                    <div className="flex items-center space-x-3">
                        <span className="text-sm text-gray-600 font-medium">Filter by Status:</span>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 min-w-[200px]">
                                <span className="text-sm font-medium text-gray-700 flex-1 text-left">{selectedStatus}</span>
                                <ChevronDown className="h-4 w-4 text-gray-400" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-64 max-h-80 overflow-y-auto">
                                {statuses.map(status => (
                                    <DropdownMenuItem
                                        key={status.value}
                                        onClick={() => setSelectedStatus(status.value as 'All Statuses' | VolunteeringStatus)}
                                        className="cursor-pointer"
                                    >
                                        {status.label}
                                        {selectedStatus === status.value && <div className="w-2 h-2 bg-green-500 rounded-full ml-auto"></div>}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                {/* Events Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredEvents.map(event => (
                        <VolunteeringEventCard event={event} key={event.volunteer_id} />
                    ))}
                </div>

                {filteredEvents.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        <p className="text-lg mb-2">No events found</p>
                        <p className="text-sm">Try adjusting your search terms or filter criteria</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VolunteeringEvents;
