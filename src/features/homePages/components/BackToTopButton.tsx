"use client";

import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

export default function BackToTopButton() {
    const [visible, setVisible] = useState(false);

    const handleScroll = () => {

        setVisible(window.scrollY > 300); // show after scrolling down 300px
    };

    const scrollToTop = () => {
        const hero = document.getElementById("hero");
        if (hero) {
            hero.scrollIntoView({ behavior: "smooth" });
        } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (!visible) return null;

    return (
        <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-[9999] p-3 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg transition-all"
            aria-label="Back to Top"
        >
            <ChevronUp className="w-5 h-5" />
        </button>
    );
}
