import {
    AlertTriangle,
    Calendar,
    Globe,
    HandHeart,
    MessageSquare,
    Newspaper,
    Phone,
    Shield,
    Users,
    Wifi,
} from "lucide-react";
import { Link as ScrollLink } from "react-scroll";
import { useLanguage } from "../../i18n/useLanguage";
import { featuresTranslations } from "./i18n/PlatFormFeaturesTranslations";

const icons = [
    Users,
    Newspaper,
    Calendar,
    Phone,
    MessageSquare,
    HandHeart,
    Shield,
    Globe,
    AlertTriangle,
    Wifi,
];

const PlatformFeatures = () => {
    const { language } = useLanguage();
    const translatedFeatures = featuresTranslations[language];

    const sectionTitle =
        language === "Kinyarwanda"
            ? "Ibikorwa by’Urubuga"
            : language === "Français"
                ? "Fonctionnalités de la plateforme"
                : "Platform Features";

    const learnMoreText =
        language === "Kinyarwanda"
            ? "Menya byinshi →"
            : language === "Français"
                ? "En savoir plus →"
                : "Learn More →";

    return (
        <section
            id="features"
            aria-labelledby="features-heading"
            className="py-16 bg-gray-50"
            role="region"
        >
            <div className="px-4 sm:px-6 lg:px-8">
                <h2
                    id="features-heading"
                    className="text-4xl font-bold text-center mb-12"
                    style={{ color: "var(--smart-village-primary)" }}
                >
                    {sectionTitle}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {translatedFeatures.map((feature, index) => {
                        const Icon = icons[index];
                        return (
                            <article
                                key={index}
                                className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                                aria-labelledby={`feature-${index}-title`}
                            >
                                <div className="flex flex-col items-center text-center">
                                    <div
                                        className="flex items-center justify-center w-12 h-12 rounded-lg mb-4 bg-primary-dark"
                                        aria-hidden="true"
                                    >
                                        <Icon className="w-6 h-6 text-white" aria-hidden="true" />
                                    </div>
                                    <h3
                                        id={`feature-${index}-title`}
                                        className="text-xl font-semibold mb-3 text-primary-dark"
                                    >
                                        {feature.title}
                                    </h3>
                                </div>

                                <p className="text-gray-600 mb-4 leading-relaxed">
                                    {feature.description}
                                </p>

                                <ScrollLink
                                    to="about"
                                    smooth={true}
                                    duration={600}
                                    offset={-70} // adjust for sticky navbar
                                    className="cursor-pointer text-sm font-medium inline-flex items-center"
                                    style={{ color: "var(--smart-village-primary)" }}
                                >
                                    {learnMoreText}
                                </ScrollLink>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default PlatformFeatures;
