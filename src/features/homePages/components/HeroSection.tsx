

import VillageSelectingDialog from "./VillageSelectingDialog";

import { homeTranslations } from "../i18n/homeTranslations";
import { useLanguage } from "@/features/i18n/useLanguage";
import { useVisitedVillage } from "../context/VillageContext";
import { useEffect } from "react";

export default function HeroSection() {

    const { language } = useLanguage();
    const t = homeTranslations[language];
    const { clearVisitedVillage } = useVisitedVillage();

    useEffect(() => {
        clearVisitedVillage();
    }, [clearVisitedVillage]);
    return (
        <section
            id="hero"
            aria-labelledby="hero-heading"
            className="relative w-full h-screen flex items-center justify-center"
        >

            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: "url('/imgs/homeBackGround.png')",
                    backgroundSize: "contain",
                    backgroundPosition: "top",
                }}
                aria-hidden="true"
            />


            <div
                className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-600 opacity-80"
                aria-hidden="true"
            />


            <div className="relative z-10 flex flex-col items-center justify-center text-center text-white px-4">
                <h1
                    id="hero-heading"
                    className="text-4xl md:text-6xl font-bold tracking-tight"
                >
                    {t.heroTitle}
                </h1>
                <p className="mt-4 text-lg md:text-2xl">{t.heroSubtitle}</p>

                <div className="mt-6 flex gap-4 flex-wrap justify-center">
                    <VillageSelectingDialog />
                    <a
                        href="#about"
                        className="border border-white px-6 py-2 rounded font-semibold hover:bg-white hover:text-black transition"
                    >
                        {t.learnButton}
                    </a>
                </div>
            </div>
        </section>
    );
}
