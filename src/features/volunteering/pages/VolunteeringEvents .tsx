import { useState } from 'react';
import { Search, Filter, Calendar, MapPin, Clock, Eye } from 'lucide-react';

const VolunteeringEvents = () => {
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const [searchTerm, setSearchTerm] = useState('');

    const categories = ['All Categories', 'Environment', 'Education', 'Social', 'Health'];

    const events = [
        {
            id: 1,
            title: 'Tree Planting Drive',
            description: 'Our weekend cleanup drive was a huge success with over 100 volunteers participating. Streets, parks and common areas are now spotless thanks to community effort.',
            date: '2025-01-04 at 8:00 AM',
            endTime: '8:00 AM',
            location: 'Youth Center',
            duration: '4 Hours',
            spotsAvailable: 15,
            totalSpots: 50,
            volunteers: '15/50 Volunteers',
            views: '255 Views',
            category: 'Environment',
            featured: true
        },
        {
            id: 2,
            title: 'Blood Donation Camp',
            description: 'We successfully organized a blood donation camp with the help of local hospitals. Over 200 units of blood were collected, significantly impacting the community\'s needs.',
            date: '2025-02-14 at 8:00 AM',
            endTime: '8:00 AM',
            location: 'Community Hall',
            duration: '6 Hours',
            spotsAvailable: 20,
            totalSpots: 50,
            volunteers: '20/50 Volunteers',
            views: '320 Views',
            category: 'Health',
            featured: true
        },
        {
            id: 3,
            title: 'Literacy Workshop',
            description: 'Our literacy workshop aimed at adults was well attended, helping participants improve reading and writing skills with hands-on activities and resources.',
            date: '2025-03-15 at 1:00 PM',
            endTime: '1:00 PM',
            location: 'Local Library',
            duration: '3 Hours',
            spotsAvailable: 10,
            totalSpots: 20,
            volunteers: '10/20 Volunteers',
            views: '180 Views',
            category: 'Education',
            featured: false
        },
        {
            id: 4,
            title: 'Community Soccer Match',
            description: 'The community soccer match brought together local teams for a day of fun and competition, fostering sportsmanship and community spirit.',
            date: '2025-04-20 at 6:00 PM',
            endTime: '6:00 PM',
            location: 'City Stadium',
            duration: '2 Hours',
            spotsAvailable: 25,
            totalSpots: 50,
            volunteers: '25/50 Volunteers',
            views: '445 Views',
            category: 'Social',
            featured: false
        },
        {
            id: 5,
            title: 'Local Art Exhibition',
            description: 'Our local artists showcased their work at the annual art exhibition, drawing art lovers and collectors from across the region to appreciate creativity.',
            date: '2025-05-08 at 9:00 AM',
            endTime: '9:00 AM',
            location: 'Art Gallery',
            duration: '5 Hours',
            spotsAvailable: 35,
            totalSpots: 60,
            volunteers: '35/60 Volunteers',
            views: '567 Views',
            category: 'Social',
            featured: false
        },
        {
            id: 6,
            title: 'Charity Food Festival',
            description: 'Our charity food festival featured local cuisine and raised funds for food banks, bringing the community together to enjoy delicious meals for a great cause.',
            date: '2025-06-12 at 12:00 PM',
            endTime: '6:00 PM',
            location: 'City Park',
            duration: '6 Hours',
            spotsAvailable: 40,
            totalSpots: 80,
            volunteers: '40/80 Volunteers',
            views: '678 Views',
            category: 'Social',
            featured: false
        }
    ];

    const filteredEvents = events.filter(event => {
        const matchesCategory = selectedCategory === 'All Categories' || event.category === selectedCategory;
        const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const getProgressPercentage = (available: number, total: number) => {
        return Math.round((available / total) * 100);
    };

    const getProgressColor = (percentage: number) => {
        if (percentage >= 80) return 'bg-red-500';
        if (percentage >= 50) return 'bg-yellow-500';
        return 'bg-green-500';
    };

    return (
        <div className="min-h-screen bg-gray-50">
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
                        <div className="flex items-center space-x-2">
                            <Filter className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">Filter by Category:</span>
                            <div className="flex space-x-2">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${selectedCategory === category
                                            ? 'bg-orange-500 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                            }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Events Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredEvents.map((event) => (
                        <div key={event.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            {/* Event Header */}
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center">
                                            <Calendar className="h-4 w-4 text-orange-600" />
                                        </div>
                                        {event.featured && (
                                            <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-medium">
                                                Featured
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                        {event.category}
                                    </span>
                                </div>

                                <h3 className="text-xl font-semibold text-gray-900 mb-3">{event.title}</h3>
                                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{event.description}</p>

                                {/* Event Details */}
                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Calendar className="h-4 w-4 mr-2" />
                                        <span>{event.date}</span>
                                        <span className="ml-auto">{event.endTime}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <MapPin className="h-4 w-4 mr-2" />
                                        <span>{event.location}</span>
                                        <span className="ml-auto flex items-center">
                                            <Clock className="h-4 w-4 mr-1" />
                                            {event.duration}
                                        </span>
                                    </div>
                                </div>

                                {/* Progress Section */}
                                <div className="mb-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium text-gray-700">
                                            {event.spotsAvailable} Spots Available
                                        </span>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Eye className="h-4 w-4 mr-1" />
                                            {event.views}
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm text-gray-600">{event.volunteers}</span>
                                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                                            <div
                                                className={`h-2 rounded-full ${getProgressColor(getProgressPercentage(event.spotsAvailable, event.totalSpots))}`}
                                                style={{ width: `${getProgressPercentage(event.spotsAvailable, event.totalSpots)}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-sm text-gray-600">
                                            {getProgressPercentage(event.spotsAvailable, event.totalSpots)}%
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="px-6 pb-6 space-y-2">
                                <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors flex items-center justify-center">
                                    <Eye className="h-4 w-4 mr-2" />
                                    View Details
                                </button>
                                <button className="w-full bg-orange-500 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-orange-600 transition-colors">
                                    Join Event
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredEvents.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No events found matching your criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VolunteeringEvents;