import { PageLoader } from "@/components/common/PageLoader";
import React, { Suspense } from "react";
import { motion, Variants, Easing } from "framer-motion";

// Lazy imports
const HeroSection = React.lazy(() => import("@/features/homePages/components/HeroSection"));
const AboutPage = React.lazy(() => import("../features/homePages/components/AboutPage"));
const PlatformFeatures = React.lazy(() => import("../features/homePages/components/PlatformFeatures"));
const CTASection = React.lazy(() => import("../features/homePages/components/CTASectionPage"));
const Contact = React.lazy(() => import("../features/contacts/pages/ContactPage"));
const MeetOurTeam = React.lazy(() => import("../features/our-team/pages/meet-our-team-page"));
const ease: Easing = [0.42, 0, 0.58, 1];
const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

export default function HomePage() {
    return (
        <main id="home" role="main" className="space-y-20">
            <Suspense fallback={<PageLoader />}>
                <motion.div initial="hidden" animate="visible" variants={fadeUp}>
                    <HeroSection />
                </motion.div>

                <motion.div initial="hidden" animate="visible" variants={fadeUp}>
                    <AboutPage />
                </motion.div>

                <motion.div initial="hidden" animate="visible" variants={fadeUp}>
                    <PlatformFeatures />
                </motion.div>

                <motion.div initial="hidden" animate="visible" variants={fadeUp}>
                    <CTASection />
                </motion.div>

                <motion.div initial="hidden" animate="visible" variants={fadeUp}>
                    <Contact />
                </motion.div>

                <motion.div initial="hidden" animate="visible" variants={fadeUp}>
                    <MeetOurTeam />
                </motion.div>
            </Suspense>
        </main>
    );
}
