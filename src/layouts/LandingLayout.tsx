import { Navigation } from "@/components/navigation";
import BackToTopButton from "@/features/homePages/components/BackToTopButton";
import LandingFooter from "@/features/homePages/components/LandingFooter";
import { Outlet } from "react-router-dom";

export const LandingLayout: React.FC = () => {
    return (
        <div className="w-screen flex flex-col font-sans overflow-x-hidden">

            <Navigation />


            <main
                id="main-content"
                role="main"
                className="flex-1"
                tabIndex={-1}
            >
                <Outlet />
            </main>


            <BackToTopButton />
            <LandingFooter />
        </div>
    );
};
