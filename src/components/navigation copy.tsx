/* eslint-disable react-refresh/only-export-components */
"use client";

import { useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useLanguage } from "../features/i18n/useLanguage";
import { Home, Newspaper, Calendar, Mail, Users, Shield, Heart, } from 'lucide-react';
import { LanguageSelector } from "./LanguageSelector";

import { MobileSheet } from "./MobileSheet";
import { useEffect, useState } from "react";
import { UserProfilePopover } from "../features/auth/components/UserProfileDialog";
import { NavBartranslations } from "./NavBarTranslation";

import { useVisitedVillage } from "@/features/homePages/context/VillageContext";
import { NotificationDropdown } from "@/features/notifications/pages/Notificationspopover";


export function useActiveSection(ids: string[]) {
    const [active, setActive] = useState<string>("");
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActive(entry.target.id);
                    }
                });
            },
            { rootMargin: "-30% 0px -60% 0px", threshold: 0.1 }
        );

        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [ids]);

    return active;
}
interface NavLinkItem {
    id: string;
    label: string;
    to: string;
    icon?: React.ComponentType<{ className?: string }>;
}

interface NavLinksProps {
    links: NavLinkItem[];
    activeClass: string;
    baseClass: string;
}

export function NavLinks({ links, activeClass, baseClass }: NavLinksProps) {
    const location = useLocation();
    const current = location.hash || location.pathname;

    return (
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
            {links.map((link) => {
                const isActive =
                    (link.to === "/home" && current === "/home") ||
                    (link.to.startsWith("#") && current === link.to);

                const Icon = link.icon;

                return (
                    <HashLink
                        key={link.id}
                        to={link.to}
                        className={`${baseClass} ${isActive ? activeClass : "hover:text-green-600"} 
                            flex items-center gap-2 px-3 py-2 rounded transition-colors duration-200`}
                    >
                        {Icon && <Icon className="w-5 h-5" />}
                        <span>{link.label}</span>
                    </HashLink>
                );
            })}
        </div>
    );
}

export function Navigation() {
    const { language } = useLanguage();
    const t = NavBartranslations[language];
    const [navState, setNavState] = useState<'landing' | 'village-selected' | 'logged-in'>('landing');
    const { visitedVillage } = useVisitedVillage();

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) setNavState("logged-in");
        else if (visitedVillage) setNavState("village-selected");
        else setNavState("landing");
    }, [visitedVillage]);
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
                    { id: 'volunteering', label: t.volunteering, to: '#volunteering', icon: Heart },
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

    const navLinks = getNavLinks();
    return (
        <nav className="bg-white border-b border-gray-200 fixed top-0 z-50 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    <div className="flex-shrink-0">


                        <div className="flex flex-col  space-x-4">
                            <button

                            >
                                <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent hover:from-green-700 hover:to-green-800 transition-all duration-200">
                                    Smart Village
                                </span>

                            </button>
                            {visitedVillage && (
                                <span className="text-sm text-gray-500 font-normal">{visitedVillage.village}</span>
                            )}


                        </div>

                    </div>


                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            <NavLinks
                                links={navLinks}
                                baseClass="px-3 py-2 text-sm font-medium transition-colors text-gray-900"
                                activeClass="text-green-700 font-semibold border-b-2 border-green-600"
                            />
                        </div>
                    </div>

                    <div className="hidden md:flex items-center space-x-4 w-full">
                        <LanguageSelector />

                        <NotificationDropdown />
                        <UserProfilePopover />


                    </div>

                    <div className="md:hidden">
                        <MobileSheet
                            title="Smart Village"
                            description="Navigate through sections"
                            footer={
                                <>
                                    <NotificationDropdown />
                                    <UserProfilePopover />
                                </>
                            }
                        >
                            <>
                                <NavLinks
                                    links={navLinks}
                                    baseClass="block text-base font-medium text-gray-900 transition-colors"
                                    activeClass="bg-green-100 text-green-700 rounded-md px-3 py-2"
                                />
                                <LanguageSelector />
                            </>
                        </MobileSheet>
                    </div>
                </div>
            </div>
        </nav>
    );
}
