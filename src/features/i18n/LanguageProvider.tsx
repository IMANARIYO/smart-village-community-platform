"use client";

import { useState, useEffect, type ReactNode } from "react";
import { LanguageContext } from "./LanguageContext";
import type { Language } from "./translations";

interface Props {
    children: ReactNode;
}

export function LanguageProvider({ children }: Props) {
    const [language, setLanguageState] = useState<Language>("English");

    useEffect(() => {
        const saved = localStorage.getItem("language") as Language | null;
        if (saved) setLanguageState(saved);
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem("language", lang);
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}
