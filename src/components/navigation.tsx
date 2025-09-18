/* eslint-disable react-refresh/only-export-components */
"use client";

import { Link, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useLanguage } from "../features/i18n/useLanguage";
import { translations } from "../features/i18n/translations";
import { LanguageSelector } from "./LanguageSelector";
import VillageSelectingDialog from "../features/homePages/components/VillageSelectingDialog";
import { MobileSheet } from "./MobileSheet";
import { useEffect, useState } from "react";
import { UserProfilePopover } from "../features/auth/components/UserProfileDialog";

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
function NavLinks({ links, activeClass, baseClass }: {
    links: { id: string; label: string; to: string }[];
    activeClass: string;
    baseClass: string;
}) {
    const location = useLocation();
    const current = location.hash || location.pathname;

    return (
        <>
            {links.map((link) => {
                const isActive =
                    (link.to === "/home" && current === "/home") ||
                    (link.to.startsWith("#") && current === link.to);

                return (
                    <HashLink
                        key={link.id}
                        to={link.to}
                        className={`${baseClass} ${isActive ? activeClass : "hover:text-green-600"
                            }`}
                    >
                        {link.label}
                    </HashLink>
                );
            })}
        </>
    );
}

export function Navigation() {
    const { language } = useLanguage();
    const t = translations[language];

    const navLinks = [
        { id: "home", label: t.home, to: "#" },
        { id: "features", label: t.features, to: "#features" },
        { id: "about", label: t.about, to: "#about" },
        { id: "contact", label: t.contact, to: "#contact" },
    ];

    return (
        <nav className="bg-white border-b border-gray-200 fixed top-0 z-50 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    <div className="flex-shrink-0">
                        <Link
                            to="/home"
                            className="text-2xl font-bold text-primary"

                        >
                            Smart Village
                        </Link>
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

                    <div className="hidden md:flex items-center space-x-4">
                        <LanguageSelector />
                        <VillageSelectingDialog />

                        <UserProfilePopover />


                    </div>


                    <div className="md:hidden">
                        <MobileSheet title="Smart Village">
                            <NavLinks
                                links={navLinks}
                                baseClass="block text-base font-medium text-gray-900 transition-colors"
                                activeClass="bg-green-100 text-green-700 rounded-md px-3 py-2"
                            />
                            <LanguageSelector />
                            <VillageSelectingDialog />

                            <UserProfilePopover />

                        </MobileSheet>
                    </div>
                </div>
            </div>
        </nav>
    );
}
