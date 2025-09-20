import AboutPage from "../features/homePages/components/AboutPage";
import Contact from "../features/contacts/pages/ContactPage";
import CTASection from "../features/homePages/components/CTASectionPage";
import PlatformFeatures from "../features/homePages/components/PlatformFeatures";
import MeetOurTeam from "../features/our-team/components/meet-our-team";
import HeroSection from "@/features/homePages/components/HeroSection";
export default function HomePage() {


    return (
        <main id="home" role="main">
            <HeroSection />
            <AboutPage />
            <PlatformFeatures />
            <CTASection />
            <Contact />
            <MeetOurTeam />
        </main>
    );
}
