"use client";

import { Globe } from "lucide-react";
import { useLanguage } from "../features/i18n/useLanguage";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import type { Language } from "../features/i18n/translations";


export function LanguageSelector() {
    const { language, setLanguage } = useLanguage();
    const langs = ["English", "Kinyarwanda", "Français"];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    className="flex items-center gap-2 text-gray-700 hover:text-green-600"
                >
                    <Globe className="w-4 h-4" />
                    <span>{language}</span>
                </Button>


            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-40">
                {langs.map((lang) => (
                    <DropdownMenuItem
                        key={lang}
                        onClick={() => setLanguage(lang as Language)}
                        className={`cursor-pointer ${language === lang ? "bg-green-100 text-green-800 font-semibold" : ""
                            }`}
                    >
                        {lang}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
