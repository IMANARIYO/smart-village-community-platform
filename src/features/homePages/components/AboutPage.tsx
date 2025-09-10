import { MessageSquare, Globe } from "lucide-react";
import { useLanguage } from "../../i18n/useLanguage";
import { aboutTranslations } from "./aboutTranslations";


function AboutPage() {
    const { language } = useLanguage();
    const t = aboutTranslations[language];

    return (
        <section id="about" className="py-16 bg-white">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <img
                            src="/imgs/diverse-hands-coming-together-in-unity-community-c.png"
                            alt={t.imageAlt}
                            className="rounded-lg shadow-lg w-full h-80 object-cover"
                        />
                    </div>

                    <div>
                        <h2
                            className="text-4xl font-bold mb-8"
                            style={{ color: "var(--smart-village-primary)" }}
                        >
                            {t.title}
                        </h2>

                        <p className="text-gray-600 mb-8 leading-relaxed">{t.description}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-start space-x-3">
                                <div className="flex-shrink-0">
                                    <MessageSquare
                                        className="w-6 h-6"
                                        style={{ color: "var(--smart-village-primary)" }}
                                    />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-2 text-primary-dark">
                                        {t.missionTitle}
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {t.missionDescription}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="flex-shrink-0">
                                    <Globe className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-blue-600 mb-2">
                                        {t.visionTitle}
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {t.visionDescription}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutPage;
