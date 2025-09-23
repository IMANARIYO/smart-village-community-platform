import { Navigation } from "@/components/navigation";
import LandingFooter from "@/features/homePages/components/LandingFooter";
import { Outlet } from "react-router-dom";

export const LandingLayout: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col font-sans overflow-x-hidden">
            {/* Navigation always on top */}
            <Navigation />

            {/* Main content grows to fill available space */}
            <main
                id="main-content"
                role="main"
                className="flex-grow"
                tabIndex={-1}
            >
                <Outlet />
            </main>

            {/* Footer at the bottom naturally */}
            <LandingFooter />
        </div>
    );
};
