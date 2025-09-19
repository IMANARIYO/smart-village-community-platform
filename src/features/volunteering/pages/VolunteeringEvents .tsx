import { useEffect, useState } from 'react';
import { Search, Filter, ChevronDown, Users, Heart, GraduationCap, TreePine, Shield, DollarSign, Calendar, Vote } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
// import { VolunteeringEventCard } from '../components/VolunteeringEventCard';
import type { VolunteeringCategory } from '../types';
import { VolunteeringEventCard } from '../components/VolunteeringEventCard';
import { CreateVolunteeringEventDialog } from '../components/CreateVolunteeringEventDialog';
import { refreshToken } from '@/utils/api';


const VolunteeringEvents = () => {
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const [searchTerm, setSearchTerm] = useState('');

    const categories = [
        { value: 'All Categories', label: 'All Categories', icon: Filter },
        { value: 'Community & Social', label: 'Community & Social', icon: Users },
        { value: 'Health & Wellness', label: 'Health & Wellness', icon: Heart },
        { value: 'Education & Skills', label: 'Education & Skills', icon: GraduationCap },
        { value: 'Environmental & Sustainability', label: 'Environmental & Sustainability', icon: TreePine },
        { value: 'Safety & Emergency', label: 'Safety & Emergency', icon: Shield },
        { value: 'Economic & Livelihood', label: 'Economic & Livelihood', icon: DollarSign },
        { value: 'Special / One-Off Events', label: 'Special / One-Off Events', icon: Calendar },
        { value: 'Civic & Governance', label: 'Civic & Governance', icon: Vote }
    ];
    useEffect(() => {
        const checkAndRefresh = async () => {
            try {
                console.log("Trying to refresh token...");
                alert("Refreshing token now..."); // popup for visibility
                const newAccess = await refreshToken();
                if (newAccess) {
                    console.log("Token refreshed successfully:", newAccess);
                    alert("Token refreshed successfully!");
                } else {
                    console.warn("Token refresh returned null");
                }
            } catch (err) {
                console.error("Refresh token failed:", err);
                alert("Refresh token failed. Check console.");
            }
        };

        checkAndRefresh();
    }, []);
    const defaultOrganizer = {
        user_id: "u1",
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@example.com",
        phone_number: null,
    };

    const defaultVillage = {
        village_id: "v1",
        village: "Youth Center",
        cell: "Cell A",
        sector: "Sector 1",
        district: "District X",
        province: "Province Y",
        village_leader: defaultOrganizer,
    };

    const events = [
        {
            id: "1",
            title: "Tree Planting Drive",
            description: "Our weekend cleanup drive was a huge success with over 100 volunteers participating. Streets, parks and common areas are now spotless thanks to community effort.",
            date: "2025-01-04 at 8:00 AM",
            capacity: 50,
            village: defaultVillage,
            organizer: defaultOrganizer,
            approved_volunteers_count: 35,
            is_full: false,
            category: "Environmental & Sustainability" as VolunteeringCategory,
        }


    ];

    const filteredEvents = events.filter(event => {
        const matchesCategory = selectedCategory === 'All Categories' || event.category === selectedCategory;
        const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
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
                        <div className="flex items-center">
                            <h1 className="text-xl font-semibold text-gray-900">Nyarucyamo II</h1>
                        </div>
                        <nav className="hidden md:flex space-x-8">
                            <a href="#" className="text-gray-500 hover:text-gray-700">Home</a>
                            <a href="#" className="text-gray-500 hover:text-gray-700">News</a>
                            <a href="#" className="text-orange-500 hover:text-orange-600 font-medium">Events</a>
                            <a href="#" className="text-gray-500 hover:text-gray-700">Contacts</a>
                        </nav>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-sm text-gray-700">English</span>
                            </div>
                            <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700">
                                Sign In
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                    <div className="mb-4">
                        <span className="bg-yellow-500 text-yellow-900 px-3 py-1 rounded-full text-sm font-medium">
                            Smart Village Platform
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Volunteering Events</h1>
                    <p className="text-xl mb-2">Nyarucyamo II Village</p>
                    <p className="text-lg opacity-90">Make a difference in your community</p>
                </div>
            </div>

            {/* Search and Filter Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search Input */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search events..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>

                        {/* Category Filter Dropdown */}
                        <div className="flex items-center space-x-3">
                            <span className="text-sm text-gray-600 font-medium">Filter by Category:</span>
                            <DropdownMenu>
                                <DropdownMenuTrigger className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent min-w-[200px]">
                                    <SelectedIcon className="h-4 w-4 text-gray-500" />
                                    <span className="text-sm font-medium text-gray-700 flex-1 text-left">
                                        {selectedCategory}
                                    </span>
                                    <ChevronDown className="h-4 w-4 text-gray-400" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-64 max-h-80 overflow-y-auto">
                                    {categories.map((category) => {
                                        const IconComponent = category.icon;
                                        return (
                                            <DropdownMenuItem
                                                key={category.value}
                                                onClick={() => setSelectedCategory(category.value)}
                                                className="flex items-center space-x-2 cursor-pointer"
                                            >
                                                <IconComponent className="h-4 w-4 text-gray-500" />
                                                <span className="flex-1">{category.label}</span>
                                                {selectedCategory === category.value && (
                                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                )}
                                            </DropdownMenuItem>
                                        );
                                    })}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>

                    {/* Active Filter Display */}
                    {selectedCategory !== 'All Categories' && (
                        <div className="mt-4 flex items-center space-x-2">
                            <span className="text-sm text-gray-500">Active filter:</span>
                            <div className="flex items-center space-x-1 bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                                <SelectedIcon className="h-3 w-3" />
                                <span>{selectedCategory}</span>
                                <button
                                    onClick={() => setSelectedCategory('All Categories')}
                                    className="ml-1 hover:bg-orange-200 rounded-full p-0.5"
                                >
                                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Results Summary */}
                <div className="mb-6">
                    <p className="text-gray-600">
                        Showing <span className="font-semibold">{filteredEvents.length}</span> of <span className="font-semibold">{events.length}</span> events
                        {selectedCategory !== 'All Categories' && (
                            <span> in <span className="font-semibold">{selectedCategory}</span></span>
                        )}
                    </p>
                </div>

                {/* Events Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredEvents.map((event) => (
                        <VolunteeringEventCard event={event} key={event.id} />
                    ))}
                </div>

                {filteredEvents.length === 0 && (
                    <div className="text-center py-12">
                        <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-full">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291.94-5.709 2.291M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <p className="text-gray-500 text-lg mb-2">No events found</p>
                        <p className="text-gray-400 text-sm">
                            Try adjusting your search terms or filter criteria
                        </p>
                        {selectedCategory !== 'All Categories' && (
                            <button
                                onClick={() => setSelectedCategory('All Categories')}
                                className="mt-4 text-green-600 hover:text-green-700 font-medium"
                            >
                                Clear filter and show all events
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default VolunteeringEvents;