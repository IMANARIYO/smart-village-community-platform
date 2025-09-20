import { useState } from 'react';
import { ChevronDown, Menu, X, Globe, User, LogIn, MapPin, Home, Newspaper, Calendar, Mail, Users, Shield, Heart, Bell, Search } from 'lucide-react';
import { NavBartranslations } from './NavBarTranslation';
import { useLanguage } from '@/features/i18n/useLanguage';


const DynamicNavigation = () => {
    // State management for different navigation states
    const [navState, setNavState] = useState('landing'); // 'landing', 'village-selected', 'logged-in'
    const [selectedVillage, setSelectedVillage] = useState(null);
    const [user, setUser] = useState(null);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isLanguageOpen, setIsLanguageOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [notifications, setNotifications] = useState(3); // Mock notification count
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    const { language } = useLanguage();
    const t = NavBartranslations[language];

    // Mock villages
    const villages = [
        { id: 1, name: 'Nyarucyamu I Village' },
        { id: 2, name: 'Nyarucyamu II Village' },
        { id: 3, name: 'Kibungo Village' },
    ];

    // Navigation links for different states
    const getNavLinks = () => {
        switch (navState) {
            case 'landing':
                return [
                    { id: 'home', label: t.home, to: '#', icon: Home },
                    { id: 'features', label: t.features, to: '#features', icon: Heart },
                    { id: 'about', label: t.about, to: '#about', icon: Users },
                    { id: 'contact', label: t.contact, to: '#contact', icon: Mail },
                ];
            case 'village-selected':
                return [
                    { id: 'home', label: t.home, to: '#', icon: Home },
                    { id: 'news', label: t.news, to: '#news', icon: Newspaper },
                    { id: 'events', label: t.events, to: '#events', icon: Calendar },
                    { id: 'contacts', label: t.contacts, to: '#contacts', icon: Mail },
                ];
            case 'logged-in':
                return [
                    { id: 'home', label: t.home, to: '#', icon: Home },
                    { id: 'news', label: t.news, to: '#news', icon: Newspaper },
                    { id: 'volunteering', label: t.volunteering, to: '#volunteering', icon: Heart },
                    { id: 'contacts', label: t.contacts, to: '#contacts', icon: Mail },
                    { id: 'visitors', label: t.visitors, to: '#visitors', icon: Users },
                    { id: 'safety', label: t.safety, to: '#safety', icon: Shield },
                ];
            default:
                return [];
        }
    };

    const handleVillageSelect = (village) => {
        setSelectedVillage(village);
        setNavState('village-selected');
    };

    const handleSignIn = () => {
        setUser({ name: 'John Doe', role: 'Resident', avatar: 'JD' });
        setNavState('logged-in');
    };

    const handleSignOut = () => {
        setUser(null);
        setNavState(selectedVillage ? 'village-selected' : 'landing');
        setIsUserMenuOpen(false);
    };

    const resetToLanding = () => {
        setSelectedVillage(null);
        setUser(null);
        setNavState('landing');
    };

    const navLinks = getNavLinks();

    return (
        <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200/50 fixed top-0 z-50 w-full shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Logo and Village Info Section */}
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={resetToLanding}
                            className="flex flex-col items-start"
                        >
                            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent hover:from-green-700 hover:to-green-800 transition-all duration-200">
                                Smart Village
                            </span>
                            {selectedVillage && (
                                <span className="text-sm text-gray-500 font-normal">{selectedVillage.name}</span>
                            )}
                        </button>
                    </div>

                    {/* Search Bar (only for logged-in users) */}
                    {navState === 'logged-in' && (
                        <div className="hidden md:flex flex-1 max-w-md mx-8">
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-4 w-4 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                                    placeholder={t.searchCommunity}
                                />
                            </div>
                        </div>
                    )}

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="flex items-center space-x-1">
                            {navLinks.map((link) => {
                                const IconComponent = link.icon;
                                return (
                                    <a
                                        key={link.id}
                                        href={link.to}
                                        className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
                                    >
                                        <IconComponent className="w-4 h-4" />
                                        <span>{link.label}</span>
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Side Actions */}
                    <div className="hidden md:flex items-center space-x-3">

                        {/* Language Selector */}
                        <div className="relative">
                            <button
                                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                                className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
                            >
                                <Globe className="w-4 h-4" />
                                <span>{t.english}</span>
                                <ChevronDown className={`w-4 h-4 transition-transform ${isLanguageOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isLanguageOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-50">{t.english}</button>
                                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-50">{t.kinyarwanda}</button>
                                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-50">{t.french}</button>
                                </div>
                            )}
                        </div>

                        {/* Village Selector (only show when not logged in) */}
                        {navState === 'landing' && (
                            <div className="relative">
                                <select
                                    onChange={(e) => {
                                        const village = villages.find(v => v.id === parseInt(e.target.value));
                                        if (village) handleVillageSelect(village);
                                    }}
                                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                >
                                    <option value="">{t.visitCommunity}</option>
                                    {villages.map(village => (
                                        <option key={village.id} value={village.id}>{village.name}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {/* Sign In Button (show when village selected but not logged in) */}
                        {navState === 'village-selected' && (
                            <button
                                onClick={handleSignIn}
                                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                            >
                                <LogIn className="w-4 h-4" />
                                <span>{t.signIn}</span>
                            </button>
                        )}

                        {/* Notifications (only for logged-in users) */}
                        {navState === 'logged-in' && (
                            <div className="relative">
                                <button
                                    onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                                    className="relative p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
                                >
                                    <Bell className="w-5 h-5" />
                                    {notifications > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                                            {notifications > 9 ? '9+' : notifications}
                                        </span>
                                    )}
                                </button>

                                {isNotificationOpen && (
                                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 max-h-96 overflow-y-auto">
                                        <div className="px-4 py-2 border-b border-gray-200">
                                            <h3 className="text-sm font-semibold text-gray-900">{t.notifications}</h3>
                                        </div>
                                        <div className="py-2">
                                            <div className="px-4 py-3 hover:bg-gray-50 border-l-4 border-blue-500">
                                                <p className="text-sm font-medium text-gray-900">New community event</p>
                                                <p className="text-xs text-gray-500 mt-1">Village meeting scheduled for tomorrow</p>
                                            </div>
                                            <div className="px-4 py-3 hover:bg-gray-50 border-l-4 border-green-500">
                                                <p className="text-sm font-medium text-gray-900">Safety update</p>
                                                <p className="text-xs text-gray-500 mt-1">New safety guidelines published</p>
                                            </div>
                                            <div className="px-4 py-3 hover:bg-gray-50 border-l-4 border-yellow-500">
                                                <p className="text-sm font-medium text-gray-900">Volunteer opportunity</p>
                                                <p className="text-xs text-gray-500 mt-1">Help needed for community cleanup</p>
                                            </div>
                                        </div>
                                        <div className="px-4 py-2 border-t border-gray-200">
                                            <button className="text-xs text-green-600 hover:text-green-800 font-medium">
                                                {t.viewAllNotifications}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* User Profile (show when logged in) */}
                        {navState === 'logged-in' && user && (
                            <div className="relative">
                                <button
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-green-50 rounded-lg transition-all duration-200"
                                >
                                    <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                                        {user.avatar}
                                    </div>
                                    <div className="text-left">
                                        <div className="font-medium text-gray-900">{user.name}</div>
                                        <div className="text-xs text-gray-500">{user.role}</div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                        <ChevronDown className={`w-4 h-4 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                                    </div>
                                </button>

                                {isUserMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                                        <div className="px-4 py-3 border-b border-gray-200">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-medium">
                                                    {user.avatar}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">{user.name}</p>
                                                    <p className="text-sm text-gray-500">{user.role}</p>
                                                    <div className="flex items-center mt-1">
                                                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                                        <span className="text-xs text-green-600">{t.online}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="py-2">
                                            <a href="#profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                                <User className="w-4 h-4 mr-3" />
                                                {t.viewProfile}
                                            </a>
                                            <a href="#settings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                                <div className="w-4 h-4 mr-3">⚙️</div>
                                                {t.settings}
                                            </a>
                                            <a href="#help" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                                <div className="w-4 h-4 mr-3">❓</div>
                                                {t.helpSupport}
                                            </a>
                                        </div>
                                        <div className="border-t border-gray-200 py-2">
                                            <button
                                                onClick={handleSignOut}
                                                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                            >
                                                <div className="w-4 h-4 mr-3">🚪</div>
                                                {t.signOut}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileOpen(!isMobileOpen)}
                            className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
                        >
                            {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMobileOpen && (
                <div className="md:hidden bg-white border-t border-gray-200">
                    <div className="px-4 py-4 space-y-3">

                        {/* Mobile Search Bar (logged-in users) */}
                        {navState === 'logged-in' && (
                            <div className="px-4 pb-3 border-b border-gray-200">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Search className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                                        placeholder={t.searchCommunity}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Mobile Village Info */}
                        {selectedVillage && (
                            <div className="flex items-center space-x-2 pb-3 border-b border-gray-200">
                                <MapPin className="w-4 h-4 text-green-600" />
                                <span className="text-sm font-medium text-gray-700">{selectedVillage.name}</span>
                            </div>
                        )}

                        {/* Mobile Navigation Links */}
                        {navLinks.map((link) => {
                            const IconComponent = link.icon;
                            return (
                                <a
                                    key={link.id}
                                    href={link.to}
                                    className="flex items-center space-x-3 px-3 py-3 text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
                                >
                                    <IconComponent className="w-5 h-5" />
                                    <span>{link.label}</span>
                                </a>
                            );
                        })}

                        {/* Mobile Actions */}
                        <div className="pt-3 border-t border-gray-200 space-y-3">

                            {/* Mobile Village Selector */}
                            {navState === 'landing' && (
                                <select
                                    onChange={(e) => {
                                        const village = villages.find(v => v.id === parseInt(e.target.value));
                                        if (village) handleVillageSelect(village);
                                        setIsMobileOpen(false);
                                    }}
                                    className="w-full px-4 py-3 text-base font-medium text-white bg-green-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                >
                                    <option value="">{t.visitCommunity}</option>
                                    {villages.map(village => (
                                        <option key={village.id} value={village.id}>{village.name}</option>
                                    ))}
                                </select>
                            )}

                            {/* Mobile Sign In */}
                            {navState === 'village-selected' && (
                                <button
                                    onClick={() => {
                                        handleSignIn();
                                        setIsMobileOpen(false);
                                    }}
                                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-base font-medium text-white bg-green-600 rounded-lg"
                                >
                                    <LogIn className="w-5 h-5" />
                                    <span>{t.signIn}</span>
                                </button>
                            )}

                            {/* Mobile Notifications */}
                            {navState === 'logged-in' && notifications > 0 && (
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-900">{t.notifications} ({notifications})</span>
                                        <button className="text-xs text-green-600 font-medium">{t.viewAllNotifications}</button>
                                    </div>
                                    <div className="bg-blue-50 rounded-lg p-3 border-l-4 border-blue-500">
                                        <p className="text-sm font-medium text-gray-900">New community event</p>
                                        <p className="text-xs text-gray-500 mt-1">Village meeting scheduled for tomorrow</p>
                                    </div>
                                </div>
                            )}

                            {/* Mobile User Profile */}
                            {navState === 'logged-in' && user && (
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-3 px-3 py-3 bg-green-50 rounded-lg">
                                        <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-medium">
                                            {user.avatar}
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-medium text-gray-900">{user.name}</div>
                                            <div className="text-sm text-gray-500">{user.role}</div>
                                            <div className="flex items-center mt-1">
                                                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                                <span className="text-xs text-green-600">{t.online}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <a href="#profile" className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                                            <User className="w-4 h-4 mr-3" />
                                            {t.viewProfile}
                                        </a>
                                        <a href="#settings" className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                                            <div className="w-4 h-4 mr-3">⚙️</div>
                                            {t.settings}
                                        </a>
                                    </div>

                                    <button
                                        onClick={() => {
                                            handleSignOut();
                                            setIsMobileOpen(false);
                                        }}
                                        className="w-full flex items-center justify-center px-4 py-3 text-base font-medium text-red-600 bg-red-50 rounded-lg"
                                    >
                                        <div className="w-4 h-4 mr-2">🚪</div>
                                        {t.signOut}
                                    </button>
                                </div>
                            )}

                            {/* Mobile Language Selector */}
                            <select className="w-full px-4 py-3 text-base font-medium text-gray-700 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                                <option>{t.english}</option>
                                <option>{t.kinyarwanda}</option>
                                <option>{t.french}</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}

            {/* Demo Controls */}
            <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-2">
                <div className="max-w-7xl mx-auto flex items-center justify-center space-x-4">
                    <span className="text-sm font-medium text-yellow-800">Demo Controls:</span>
                    <button
                        onClick={resetToLanding}
                        className={`px-3 py-1 text-xs rounded ${navState === 'landing' ? 'bg-yellow-200 text-yellow-800' : 'bg-white text-yellow-700 hover:bg-yellow-100'}`}
                    >
                        Landing
                    </button>
                    <button
                        onClick={() => handleVillageSelect(villages[0])}
                        className={`px-3 py-1 text-xs rounded ${navState === 'village-selected' ? 'bg-yellow-200 text-yellow-800' : 'bg-white text-yellow-700 hover:bg-yellow-100'}`}
                    >
                        Village Selected
                    </button>
                    <button
                        onClick={() => {
                            if (!selectedVillage) handleVillageSelect(villages[0]);
                            handleSignIn();
                        }}
                        className={`px-3 py-1 text-xs rounded ${navState === 'logged-in' ? 'bg-yellow-200 text-yellow-800' : 'bg-white text-yellow-700 hover:bg-yellow-100'}`}
                    >
                        Logged In
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default DynamicNavigation;