/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import MyButton from "./MyButton";
import { useLanguage } from "../features/i18n/useLanguage";
import { translations } from "../features/i18n/translations"; // your translations object

export function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLanguageOpen, setIsLanguageOpen] = useState(false);

    const { language, setLanguage } = useLanguage();
    const langs = ["English", "Kinyarwanda", "Français"];

    const t = translations[language]; // current translation set

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link
                            to="/"
                            className="text-2xl font-bold"
                            style={{ color: "var(--smart-village-primary)" }}
                        >
                            Smart Village
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            <Link
                                to="/"
                                className="text-gray-900 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors"
                            >
                                {t.home}
                            </Link>
                            <Link
                                to="#features"
                                className="text-gray-900 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors"
                            >
                                {t.features}
                            </Link>
                            <Link
                                to="#about"
                                className="text-gray-900 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors"
                            >
                                {t.about}
                            </Link>
                            <Link
                                to="#contact"
                                className="text-gray-900 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors"
                            >
                                {t.contact}
                            </Link>
                        </div>
                    </div>

                    {/* Language Selector & CTA */}
                    <div className="hidden md:flex items-center space-x-4">
                        <div className="relative">
                            <button
                                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                                className="flex items-center space-x-1 text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors"
                            >
                                <Globe className="w-4 h-4" />
                                <span>{language}</span>
                                <ChevronDown className="w-4 h-4" />
                            </button>

                            {isLanguageOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                                    {langs.map((lang) => (
                                        <button
                                            key={lang}
                                            onClick={() => {
                                                setLanguage(lang as any);
                                                setIsLanguageOpen(false);
                                            }}
                                            className={`block px-4 py-2 text-sm w-full text-left transition-colors ${language === lang
                                                ? "bg-green-100 text-green-800 font-semibold"
                                                : "text-gray-700 hover:bg-gray-100"
                                                }`}
                                        >
                                            {lang}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <Link to="/auth/login">
                            <MyButton
                                className="text-white font-medium px-6"
                                style={{ backgroundColor: "#2E7D32" }}
                            >
                                {t.visitCommunity}
                            </MyButton>
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <MyButton
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-700 hover:text-green-600 p-2"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </MyButton>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
                            <Link
                                to="/"
                                className="text-gray-900 hover:text-green-600 block px-3 py-2 text-base font-medium"
                            >
                                {t.home}
                            </Link>
                            <Link
                                to="#features"
                                className="text-gray-900 hover:text-green-600 block px-3 py-2 text-base font-medium"
                            >
                                {t.features}
                            </Link>
                            <Link
                                to="#about"
                                className="text-gray-900 hover:text-green-600 block px-3 py-2 text-base font-medium"
                            >
                                {t.about}
                            </Link>
                            <Link
                                to="#contact"
                                className="text-gray-900 hover:text-green-600 block px-3 py-2 text-base font-medium"
                            >
                                {t.contact}
                            </Link>

                            {/* Mobile language selector */}
                            <div className="px-3 py-2">
                                {langs.map((lang) => (
                                    <button
                                        key={lang}
                                        onClick={() => {
                                            setLanguage(lang as any);
                                            setIsMenuOpen(false);
                                        }}
                                        className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${language === lang
                                            ? "bg-green-100 text-green-800 font-semibold"
                                            : "text-gray-700 hover:bg-gray-100"
                                            }`}
                                    >
                                        {lang}
                                    </button>
                                ))}
                            </div>

                            <div className="px-3 py-2">
                                <Link to="/auth/login">
                                    <MyButton
                                        className="w-full text-white font-medium"
                                        style={{ backgroundColor: "var(--smart-village-primary)" }}
                                    >
                                        {t.visitCommunity}
                                    </MyButton>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
