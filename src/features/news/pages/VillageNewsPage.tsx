import { useEffect, useState } from 'react';
import { Search, Filter, Calendar, Users, AlertTriangle, Megaphone, Building } from 'lucide-react';
import { useParams } from 'react-router-dom';

import EventService from '../../events/eventService';
import { LanguageSelector } from '../../../components/LanguageSelector';
import type { Event } from '@/features/events/types';
import type { SmallPersonInfo } from '@/types';



const VillageNewsPage = () => {


    const [selectedCategory, setSelectedCategory] = useState("All Categories");
    const [searchTerm, setSearchTerm] = useState("");
    const [newsItems, setNewsItems] = useState<Event[]>([]);
    const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
    const toggleExpand = (id: string) => {
        setExpandedItems(prev => ({
            ...prev,
            [id]: !prev[id],
        }));
    };


    const [loading, setLoading] = useState(false);
    const { villageId } = useParams<{ villageId: string }>();
    useEffect(() => {
        const fetchEvents = async () => {
            if (!villageId) return;
            try {
                setLoading(true);
                const res =
                    await EventService.getVillageEvents(villageId);
                console.log("vilahge  news  pages  event    etching", res.data)
                if (res.success) {

                    setNewsItems(
                        res.data.events.map((event) => ({
                            ...event,
                            organizer: event.organizer?.person ?? {} as SmallPersonInfo,
                        }))
                    );
                }
            } catch (error) {
                console.error("Failed to fetch village events:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [villageId]);

    const categories = [
        "All Categories",
        "Announcements",
        "Emergency",
        "Events",
        "General",
    ];


    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'featured':
                return <Megaphone className="w-4 h-4" />;
            case 'emergency':
                return <AlertTriangle className="w-4 h-4" />;
            case 'general':
                return <Building className="w-4 h-4" />;
            case 'events':
                return <Calendar className="w-4 h-4" />;
            case 'announcement':
                return <Users className="w-4 h-4" />;
            default:
                return <Megaphone className="w-4 h-4" />;
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'featured':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'emergency':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'general':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'events':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'announcement':
                return 'bg-purple-100 text-purple-800 border-purple-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getTypeName = (type: string) => {
        switch (type) {
            case 'featured':
                return 'Featured';
            case 'emergency':
                return 'Emergency';
            case 'general':
                return 'General';
            case 'events':
                return 'Events';
            case 'announcement':
                return 'Announcement';
            default:
                return 'General';
        }
    };

    const filteredNews = newsItems.filter(item => {
        const matchesCategory = selectedCategory === 'All Categories' ||
            item.category === selectedCategory ||
            (selectedCategory === 'Emergency' && item.type === 'Emergency') ||
            (selectedCategory === 'Events' && item.type === "Event") ||
            (selectedCategory === 'Announcements' && item.type === 'Announcement');
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <h1 className="text-xl font-bold text-gray-900">Nyarucyamo II</h1>
                        </div>
                        <nav className="hidden md:flex space-x-8">
                            <a href="#" className="text-gray-700 hover:text-gray-900">Home</a>
                            <a href="#" className="text-green-600 font-medium">News</a>
                            <a href="#" className="text-gray-700 hover:text-gray-900">Events</a>
                            <a href="#" className="text-gray-700 hover:text-gray-900">Contacts</a>
                        </nav>
                        <div className="flex items-center space-x-4">
                            <LanguageSelector />
                            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                                👤 Sign In
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="bg-green-600 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="bg-yellow-500/20 text-yellow-200 text-sm font-medium mb-4 inline-block px-3 py-1 rounded-full">
                        🏘️ Smart Village Platform
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Village News
                    </h1>
                    <h2 className="text-xl text-white/90 mb-2">Nyarucyamo II Village</h2>
                    <p className="text-white/80">Community Updates</p>
                </div>
            </section>

            {/* Search and Filter Section */}
            <section className="py-8 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        {/* Search Bar */}
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search news..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="flex items-center space-x-2">
                            <Filter className="w-5 h-5 text-gray-500" />
                            <span className="text-sm text-gray-600">Filter by Category:</span>
                            <div className="flex flex-wrap gap-2">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`px-3 py-1 text-sm rounded-full border transition-colors ${selectedCategory === category
                                            ? 'bg-green-600 text-white border-green-600'
                                            : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                                            }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* News Items */}
            <section className="py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-6">
                        {filteredNews.map((item) => (
                            <article
                                key={item.event_id}
                                className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                            >

                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center space-x-3">
                                        <span className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-medium rounded border ${getTypeColor(item.type)}`}>
                                            {getTypeIcon(item.type)}
                                            <span className="ml-1">{getTypeName(item.type)}</span>
                                        </span>
                                        <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded border ${getTypeColor('general')}`}>
                                            {item.category}
                                        </span>
                                    </div>
                                    <div className="text-right text-sm text-gray-500">
                                        <div className="flex items-center space-x-1">
                                            <Calendar className="w-4 h-4" />
                                            <span>{item.date} at 9:00 AM</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Article Content */}
                                <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-green-600 cursor-pointer">
                                    {item.title}
                                </h2>
                                <p
                                    className={`text-gray-600 mb-4 leading-relaxed ${expandedItems[item.event_id] ? "" : "line-clamp-4"
                                        }`}
                                >
                                    {item.description}

                                </p>


                                {/* Article Footer */}
                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                                        <span className="flex items-center space-x-1">
                                            <Users className="w-4 h-4" />
                                            {/* <span>{item.views} Views</span> */}
                                        </span>
                                        <span>By {item.organizer?.first_name}-{item.organizer?.last_name}</span>
                                    </div>
                                    <button
                                        onClick={() => toggleExpand(item.event_id)}
                                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                    >
                                        {expandedItems[item.event_id] ? "Show Less ↑" : "Read More →"}
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>

                    {filteredNews.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-gray-400 mb-4">
                                <Search className="w-12 h-12 mx-auto" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No news found</h3>
                            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default VillageNewsPage;