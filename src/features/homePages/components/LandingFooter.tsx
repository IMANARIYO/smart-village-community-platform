import { Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

function LandingFooter() {
    return (
        <footer
            className="text-white py-12 bg-primary-dark"
            role="contentinfo"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                    <section aria-labelledby="footer-brand">
                        <h3 id="footer-brand" className="text-2xl font-bold mb-4">
                            Smart Village
                        </h3>
                        <nav aria-label="Social Media">
                            <ul className="flex space-x-4">
                                <li>
                                    <a
                                        href="#"
                                        aria-label="Visit us on Twitter"
                                        title="Twitter"
                                        className="text-white hover:text-yellow-300 transition-colors"
                                    >
                                        <Twitter className="w-6 h-6" aria-hidden="true" />
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        aria-label="Visit us on Instagram"
                                        title="Instagram"
                                        className="text-white hover:text-yellow-300 transition-colors"
                                    >
                                        <Instagram className="w-6 h-6" aria-hidden="true" />
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        aria-label="Visit us on Facebook"
                                        title="Facebook"
                                        className="text-white hover:text-yellow-300 transition-colors"
                                    >
                                        <Facebook className="w-6 h-6" aria-hidden="true" />
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </section>

                    {/* Platform Links */}
                    <nav aria-labelledby="footer-platform">
                        <h4 id="footer-platform" className="text-lg font-semibold mb-4">
                            Platform
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/"
                                    className="hover:text-yellow-300 transition-colors"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="#features"
                                    className="hover:text-yellow-300 transition-colors"
                                >
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="#about"
                                    className="hover:text-yellow-300 transition-colors"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="#contact"
                                    className="hover:text-yellow-300 transition-colors"
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    {/* Support Links */}
                    <nav aria-labelledby="footer-support">
                        <h4 id="footer-support" className="text-lg font-semibold mb-4">
                            Support
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="#" className="hover:text-yellow-300 transition-colors">
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="hover:text-yellow-300 transition-colors">
                                    Documentation
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="hover:text-yellow-300 transition-colors">
                                    Community Forum
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="hover:text-yellow-300 transition-colors">
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    {/* Legal Links */}
                    <nav aria-labelledby="footer-legal">
                        <h4 id="footer-legal" className="text-lg font-semibold mb-4">
                            Legal
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="#" className="hover:text-yellow-300 transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="hover:text-yellow-300 transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="hover:text-yellow-300 transition-colors">
                                    Cookie Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="hover:text-yellow-300 transition-colors">
                                    Accessibility
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>


                <div className="border-t border-green-500 mt-8 pt-8 text-center">
                    <p className="text-sm">
                        &copy; {new Date().getFullYear()} Smart Village. All rights reserved.
                    </p>
                    <address className="not-italic mt-2 text-xs text-gray-300">
                        Kigali, Rwanda
                    </address>
                </div>
            </div>
        </footer>
    );
}

export default LandingFooter;
