


import { useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useLanguage } from "../features/i18n/useLanguage";
import { LanguageSelector } from "./LanguageSelector";
import { MobileSheet } from "./MobileSheet";
import { useEffect, useState } from "react";
import { UserProfilePopover } from "../features/auth/components/UserProfileDialog";
import { NavBartranslations } from "./NavBarTranslation";
import { useVisitedVillage } from "@/features/homePages/context/VillageContext";
import { NotificationDropdown } from "@/features/notifications/pages/Notificationspopover";
import { tokenStorage } from "@/features/auth/utils/tokenStorage";
import { UserProfileStorage } from "@/features/auth/utils/UserProfileStorage";
import { useActiveSection } from "@/hooks/useActiveSection";


interface NavLinkItem {
    id: string;
    label: string;
    to: string;
    group?: 'main' | 'community' | 'services';
}

interface NavLinksProps {
    links: NavLinkItem[];
    activeSection: string;
    isMobile?: boolean;
}

export function NavLinks({ links, activeSection, isMobile = false }: NavLinksProps) {
    const location = useLocation();
    const current = location.hash || location.pathname;

    // Group links by category
    const groupedLinks = links.reduce((acc, link) => {
        const group = link.group || 'main';
        if (!acc[group]) acc[group] = [];
        acc[group].push(link);
        return acc;
    }, {} as Record<string, NavLinkItem[]>);

    const isLinkActive = (link: NavLinkItem) => {
        if (link.to === "#" && (current === "/" || current === "/home" || activeSection === "home")) {
            return true;
        }
        if (link.to.startsWith("#")) {
            const sectionId = link.to.substring(1);
            return activeSection === sectionId || current === link.to;
        }
        return current === link.to;
    };

    if (isMobile) {
        return (
            <div className="flex flex-col space-y-1">
                {Object.entries(groupedLinks).map(([groupName, groupLinks]) => (
                    <div key={groupName} className="mb-4">
                        {groupName !== 'main' && (
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">
                                {groupName}
                            </div>
                        )}
                        {groupLinks.map((link) => {
                            const isActive = isLinkActive(link);
                            return (
                                <HashLink
                                    key={link.id}
                                    to={link.to}
                                    className={`block px-3 py-3 text-base font-medium rounded-lg transition-all duration-200 ${isActive
                                        ? "bg-green-50 text-green-700 border-l-4 border-green-600"
                                        : "text-gray-700 hover:bg-gray-50 hover:text-green-600"
                                        }`}
                                >
                                    {link.label}
                                </HashLink>
                            );
                        })}
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="flex items-center">
            {Object.entries(groupedLinks).map(([groupName, groupLinks], groupIndex) => (
                <div key={groupName} className="flex items-center">
                    {groupIndex > 0 && (
                        <div className="w-px h-6 bg-gray-300 mx-4"></div>
                    )}
                    <div className="flex items-center space-x-1">
                        {groupLinks.map((link) => {
                            const isActive = isLinkActive(link);
                            return (
                                <HashLink
                                    key={link.id}
                                    to={link.to}
                                    className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${isActive
                                        ? "bg-green-100 text-green-700 shadow-sm"
                                        : "text-gray-700 hover:bg-gray-100 hover:text-green-600"
                                        }`}
                                >
                                    {link.label}
                                </HashLink>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
}

export function Navigation() {
    const { language } = useLanguage();
    const t = NavBartranslations[language];
    const [navState, setNavState] = useState<'landing' | 'village-selected' | 'logged-in'>('landing');
    const { visitedVillage } = useVisitedVillage();

    useEffect(() => {
        const checkUserAuth = () => {
            const token = tokenStorage.getAccessToken();
            const userProfile = UserProfileStorage.getUserProfile();

            if (token && userProfile) {
                setNavState("logged-in");
            } else if (visitedVillage) {
                setNavState("village-selected");
            } else {
                setNavState("landing");
            }
        };

        checkUserAuth();
    }, [visitedVillage]);
    const getNavLinks = () => {
        switch (navState) {
            case 'landing':
                return [
                    { id: 'home', label: t.home, to: '#', group: 'main' as const },
                    { id: 'features', label: t.features, to: '#features', group: 'main' as const },
                    { id: 'about', label: t.about, to: '#about', group: 'main' as const },
                    { id: 'contact', label: t.contact, to: '#contact', group: 'main' as const },
                ];
            case 'village-selected':
                return [
                    { id: 'home', label: t.home, to: '#', group: 'main' as const },
                    { id: 'news', label: t.news, to: '#news', group: 'community' as const },
                    { id: 'events', label: t.events, to: '#events', group: 'community' as const },
                    { id: 'volunteering', label: t.volunteering, to: '#volunteering', group: 'community' as const },
                    { id: 'contacts', label: `{${t.contacts}`, to: '#contacts', group: 'services' as const },


                    ...(tokenStorage.getAccessToken() && UserProfileStorage.getUserProfile()
                        ? [
                            { id: "visitors", label: t.visitors, to: "#visitors", group: "services" as const },
                            { id: "safety", label: t.safety, to: "#safety", group: "services" as const },
                        ]
                        : []),
                ];
            case 'logged-in':
                return [
                    { id: 'home', label: t.home, to: '#', group: 'main' as const },
                    { id: 'news', label: t.news, to: '#news', group: 'community' as const },
                    { id: 'volunteering', label: t.volunteering, to: '#volunteering', group: 'community' as const },
                    { id: 'contacts', label: t.contacts, to: '#contacts', group: 'services' as const },
                    { id: 'visitors', label: t.visitors, to: '#visitors', group: 'services' as const },
                    { id: 'safety', label: t.safety, to: '#safety', group: 'services' as const },
                ];
            default:
                return [];
        }
    };

    const navLinks = getNavLinks();
    const sectionIds = navLinks.map(link => link.id);
    const activeSection = useActiveSection(sectionIds);

    return (
        <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 fixed top-0 z-50 w-full shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo Section */}
                    <div className="flex-shrink-0">
                        <div className="flex flex-col">
                            <button className="text-left">
                                <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent hover:from-green-700 hover:to-green-800 transition-all duration-200">
                                    Smart Village
                                </span>
                            </button>
                            {visitedVillage && (
                                <span className="text-xs text-gray-500 font-medium">
                                    {visitedVillage.village}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex flex-1 justify-center">
                        <NavLinks
                            links={navLinks}
                            activeSection={activeSection}
                        />
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center space-x-3">
                        <LanguageSelector />
                        <NotificationDropdown />
                        <UserProfilePopover />
                    </div>

                    {/* Mobile Menu */}
                    <div className="md:hidden">
                        <MobileSheet
                            title="Smart Village"
                            description="Navigate through sections"
                            footer={
                                <div className="flex flex-col border-t border-gray-200 p-4 space-y-4 bg-accent">
                                    <LanguageSelector />
                                    <div className="flex flex-col items-start space-y-3">
                                        <UserProfilePopover />
                                        <NotificationDropdown />
                                    </div>
                                </div>

                            }
                        >
                            <div className="py-4">
                                <NavLinks
                                    links={navLinks}
                                    activeSection={activeSection}
                                    isMobile={true}
                                />
                            </div>
                        </MobileSheet>
                    </div>
                </div>
            </div>
        </nav>
    );
}
