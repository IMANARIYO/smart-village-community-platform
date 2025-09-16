import { Navigation } from "../components/navigation";

import AboutPage from "../features/homePages/components/AboutPage";
import Contact from "../features/homePages/components/Contact";
import CTASection from "../features/homePages/components/CTASectionPage";
import LandingFooter from "../features/homePages/components/LandingFooter";
import PlatformFeatures from "../features/homePages/components/PlatformFeatures";
import { homeTranslations } from "../features/homePages/i18n/homeTranslations";
import { useLanguage } from "../features/i18n/useLanguage";


export default function HomePage() {
    const { language } = useLanguage();
    const t = homeTranslations[language];

    return (
        <section className="h-screen w-screen mt-12">
            <Navigation />


            <div className="relative w-full h-screen">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: "url('/imgs/homeBackGround.png')",
                        backgroundSize: "contain",
                        backgroundPosition: "top",
                    }}
                ></div>

                <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-600 opacity-80" />

                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
                    <h1 className="text-4xl md:text-6xl font-bold">{t.heroTitle}</h1>
                    <p className="mt-4 text-lg md:text-2xl">{t.heroSubtitle}</p>

                    <div className="mt-6 flex gap-4 flex-wrap justify-center">
                        <button className="bg-yellow-400 text-black px-6 py-2 rounded font-semibold hover:bg-yellow-500 transition">
                            {t.joinButton}
                        </button>
                        <button className="border border-white px-6 py-2 rounded font-semibold hover:bg-white hover:text-black transition">
                            {t.learnButton}
                        </button>
                    </div>
                </div>
            </div>


            <AboutPage />
            <PlatformFeatures />
            <CTASection />
            <Contact />
            <LandingFooter />
        </section>
    );
}
