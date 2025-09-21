import { useState } from 'react';
import { Search, Filter, Phone, Shield, Flame, Heart, User, Lock, Clock, Wrench, Zap, Droplets, ChevronDown } from 'lucide-react';

const EmergencyContacts = () => {
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const [searchTerm, setSearchTerm] = useState('');

    const categories = ['All Categories', 'Environment', 'Education', 'Social', 'Health'];

    const quickAccessContacts = [
        {
            id: 1,
            name: 'National Police Emergency',
            number: '112',
            icon: Shield,
            color: 'bg-red-500'
        },
        {
            id: 2,
            name: 'Fire Department',
            number: '113',
            icon: Flame,
            color: 'bg-red-500'
        },
        {
            id: 3,
            name: 'Medical Emergency',
            number: '114',
            icon: Heart,
            color: 'bg-red-500'
        }
    ];

    const publicEmergencyNumbers = [
        {
            id: 1,
            name: 'National Police Emergency',
            number: '112',
            description: 'Emergency police response for serious incidents and crimes',
            icon: Shield,
            available: '24/7',
            verified: true
        },
        {
            id: 2,
            name: 'Fire Department',
            number: '113',
            description: 'Fire emergency response and rescue services',
            icon: Flame,
            available: '24/7',
            verified: true
        },
        {
            id: 3,
            name: 'Medical Emergency',
            number: '114',
            description: 'Medical emergencies and ambulance services',
            icon: Heart,
            available: '24/7',
            verified: true
        },
        {
            id: 4,
            name: 'Rwanda National Police',
            number: '+250 788 311 155',
            description: 'Emergency police response for serious incidents and crimes',
            icon: Shield,
            available: '24/7',
            verified: true
        },
        {
            id: 5,
            name: 'Ministry of Health',
            number: '114',
            description: 'General police contact for non-emergency reports',
            icon: Heart,
            available: '24/7',
            verified: true
        },
        {
            id: 6,
            name: 'Water & Sanitation Corporation',
            number: '+250 252 576 562',
            description: 'Water supply issues and sanitation problems',
            icon: Droplets,
            available: 'Business Hours',
            verified: true
        },
        {
            id: 7,
            name: 'Rwanda Energy Group',
            number: '+250 252 582 708',
            description: 'Electricity supply and power outage reports',
            icon: Zap,
            available: 'Business Hours',
            verified: true
        }
    ];

    const communityContacts = [
        {
            id: 1,
            name: 'Village Leader Office',
            icon: User,
            locked: true
        },
        {
            id: 2,
            name: 'Village Security Patrol',
            icon: Shield,
            locked: true
        },
        {
            id: 3,
            name: 'Community Health Worker',
            icon: Heart,
            locked: true
        },
        {
            id: 4,
            name: 'Local Maintenance Services',
            icon: Wrench,
            locked: true
        }
    ];

    const filteredContacts = publicEmergencyNumbers.filter(contact => {
        const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch;
    });

    const getIconComponent = (IconComponent: React.ElementType) => {
        return <IconComponent className="h-5 w-5" />;
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
                            <a href="#" className="text-gray-500 hover:text-gray-700">Events</a>
                            <a href="#" className="text-blue-500 hover:text-blue-600 font-medium">Contacts</a>
                        </nav>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-sm text-gray-700">English</span>
                                <ChevronDown className="h-4 w-4 text-gray-500" />
                            </div>
                            <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700">
                                Sign In
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-700 to-blue-800 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                    <div className="mb-4">
                        <span className="bg-blue-600 text-blue-100 px-3 py-1 rounded-full text-sm font-medium">
                            Smart Village Platform
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Emergency Contacts</h1>
                    <p className="text-xl mb-2">Nyarucyamo II Village</p>
                    <p className="text-lg opacity-90">Emergency assistance when you need it most</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Quick Access Emergency Section */}
                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 mb-8">
                    <div className="flex items-center mb-4">
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                        <h2 className="text-lg font-semibold text-red-800">Quick Access • Emergency</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {quickAccessContacts.map((contact) => (
                            <div key={contact.id} className="bg-white rounded-lg p-6 text-center border border-red-200">
                                <div className={`w-12 h-12 ${contact.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                                    {getIconComponent(contact.icon)}
                                </div>
                                <h3 className="font-medium text-gray-900 mb-2">{contact.name}</h3>
                                <div className="text-2xl font-bold text-red-600 mb-3">{contact.number}</div>
                                <button className="w-full bg-red-500 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-red-600 transition-colors flex items-center justify-center">
                                    <Phone className="h-4 w-4 mr-2" />
                                    Call Now
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Search and Filter Section */}
                <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search news..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                            ? 'bg-blue-500 text-white'
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

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Public Emergency Numbers */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                        <Phone className="h-4 w-4 text-blue-600" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-gray-900">Public Emergency Numbers</h2>
                                </div>
                            </div>
                            <div className="divide-y divide-gray-200">
                                {filteredContacts.map((contact) => (
                                    <div key={contact.id} className="p-6">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-start space-x-4">
                                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    {getIconComponent(contact.icon)}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center space-x-2 mb-1">
                                                        <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                                                        {contact.verified && (
                                                            <div className="flex items-center space-x-1">
                                                                <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                                                                <span className="text-xs text-blue-600">Verified</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-gray-600 mb-2">{contact.description}</p>
                                                    <div className="flex items-center text-xs text-gray-500">
                                                        <Clock className="h-3 w-3 mr-1" />
                                                        <span>Available {contact.available}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-lg font-bold text-blue-600 mb-2">{contact.number}</div>
                                                <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors flex items-center">
                                                    <Phone className="h-4 w-4 mr-2" />
                                                    Call Now
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Community-Specific Contacts */}
                    <div>
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                                        <User className="h-4 w-4 text-green-600" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-gray-900">Community-Specific Contacts</h2>
                                </div>
                            </div>
                            <div className="p-6">
                                <p className="text-sm text-gray-600 mb-6">
                                    Sign In to access local contacts, resident emergency numbers, and community-specific services.
                                </p>
                                <div className="space-y-3">
                                    {communityContacts.map((contact) => (
                                        <div key={contact.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                                                    {getIconComponent(contact.icon)}
                                                </div>
                                                <span className="text-sm text-gray-700">{contact.name}</span>
                                            </div>
                                            <Lock className="h-4 w-4 text-gray-400" />
                                        </div>
                                    ))}
                                </div>
                                <button className="w-full mt-6 bg-green-600 text-white py-3 px-4 rounded-md text-sm font-medium hover:bg-green-700 transition-colors flex items-center justify-center">
                                    <User className="h-4 w-4 mr-2" />
                                    Sign In For More Contacts
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmergencyContacts;