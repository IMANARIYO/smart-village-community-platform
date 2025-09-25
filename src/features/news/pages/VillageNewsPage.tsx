import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import EventService from '../../events/eventService';

import { VillageEvent } from '@/features/events/types';
import { Loading } from '@/components/common/Loading';
import { NewsCard } from '../components/NewsCard';
import { NewsFilters } from '../components/NewsFilters';
import { Village } from '@/types';




const VillageNewsPage = () => {

    const [village, setVillage] = useState<Village | null>(null)
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [newsItems, setNewsItems] = useState<VillageEvent[]>([]);
    const [sortBy, setSortBy] = useState("created_at");
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [loading, setLoading] = useState(false);
    const { villageId } = useParams<{ villageId: string }>();
    useEffect(() => {
        const fetchEvents = async () => {
            if (!villageId) return;
            try {
                setLoading(true);
                const res =
                    await EventService.getVillageEvents(villageId);

                if (res.success) {

                    setNewsItems(res.data.events);
                    setVillage(res.data.village)
                }
            } catch (error) {
                console.error("Failed to fetch village events:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [villageId]);


    const filteredAndSortedNews = newsItems
        .filter((item) => {
            const matchesCategory =
                selectedCategory === "all" ||
                item.type === selectedCategory ||
                item.category === selectedCategory;

            const matchesSearch =
                item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.description.toLowerCase().includes(searchTerm.toLowerCase());

            return matchesCategory && matchesSearch;
        })
        .sort((a, b) => {
            const aValue = a[sortBy as keyof VillageEvent];
            const bValue = b[sortBy as keyof VillageEvent];

            if (sortBy === 'created_at' || sortBy === 'event_date') {
                const aTime = new Date(aValue as string).getTime();
                const bTime = new Date(bValue as string).getTime();
                return sortOrder === 'asc' ? aTime - bTime : bTime - aTime;
            }

            if (typeof aValue === 'string' && typeof bValue === 'string') {
                const aStr = aValue.toLowerCase();
                const bStr = bValue.toLowerCase();
                return sortOrder === 'asc'
                    ? aStr.localeCompare(bStr)
                    : bStr.localeCompare(aStr);
            }

            if (typeof aValue === 'number' && typeof bValue === 'number') {
                return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
            }

            return 0;
        });
    if (loading)
        return <Loading />
    return (
        <div className="min-h-screen bg-gray-50">


            {/* Hero Section */}
            <section className="bg-green-600 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="bg-yellow-500/20 text-yellow-200 text-sm font-medium mb-4 inline-block px-3 py-1 rounded-full">
                        🏘️ Smart Village Platform
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Village News
                    </h1>
                    <h2 className="text-xl text-white/90 mb-2">{village?.village}</h2>
                    <p className="text-white/80">Community Updates</p>
                </div>
            </section>

            {/* Search and Filter Section */}
            <section className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <NewsFilters
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                        selectedCategory={selectedCategory}
                        onCategoryChange={setSelectedCategory}
                        sortBy={sortBy}
                        onSortChange={setSortBy}
                        sortOrder={sortOrder}
                        onSortOrderChange={setSortOrder}
                    />
                </div>
            </section>

            {/* News Grid */}
            <section className="py-8">
                <div className=" px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
                        {filteredAndSortedNews.map((event) => (
                            <NewsCard key={event.event_id} event={event} />
                        ))}
                    </div>

                    {filteredAndSortedNews.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500">No news found matching your criteria.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default VillageNewsPage;