import { MessageSquare, Globe } from "lucide-react";
import { useLanguage } from "../../i18n/useLanguage";
import { aboutTranslations } from "./aboutTranslations";

function AboutPage() {
    const { language } = useLanguage();
    const t = aboutTranslations[language];

    return (
        <section
            id="about"
            aria-labelledby="about-heading"
            className="py-16 relative"
            role="region"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Image */}
                    <figure className="flex justify-center lg:justify-start">
                        <img
                            src="/imgs/diverse-hands-coming-together-in-unity-community-c.png"
                            alt={t.imageAlt}
                            className="rounded-lg shadow-lg w-full h-80 object-cover"
                            loading="lazy"
                            decoding="async"
                        />
                        <figcaption className="sr-only">{t.imageAlt}</figcaption>
                    </figure>

                    {/* Text */}
                    <article aria-labelledby="about-heading">
                        <header>
                            <h2
                                id="about-heading"
                                className="text-4xl font-bold mb-6 tracking-tight"
                                style={{ color: "var(--smart-village-primary)" }}
                            >
                                {t.title}
                            </h2>
                        </header>

                        <p className="text-gray-700 mb-8 leading-relaxed text-base">
                            {t.description}
                        </p>

                        {/* Mission & Vision */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <section
                                aria-labelledby="mission-heading"
                                className="flex space-x-3"
                            >
                                <div className="flex-shrink-0">
                                    <MessageSquare
                                        className="w-6 h-6"
                                        aria-hidden="true"
                                        style={{ color: "var(--smart-village-primary)" }}
                                    />
                                </div>
                                <div>
                                    <h3
                                        id="mission-heading"
                                        className="font-semibold mb-2 text-primary-dark text-lg"
                                    >
                                        {t.missionTitle}
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {t.missionDescription}
                                    </p>
                                </div>
                            </section>

                            <section
                                aria-labelledby="vision-heading"
                                className="flex space-x-3"
                            >
                                <div className="flex-shrink-0">
                                    <Globe
                                        className="w-6 h-6 text-blue-600"
                                        aria-hidden="true"
                                    />
                                </div>
                                <div>
                                    <h3
                                        id="vision-heading"
                                        className="font-semibold text-blue-600 mb-2 text-lg"
                                    >
                                        {t.visionTitle}
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {t.visionDescription}
                                    </p>
                                </div>
                            </section>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
}

export default AboutPage;
