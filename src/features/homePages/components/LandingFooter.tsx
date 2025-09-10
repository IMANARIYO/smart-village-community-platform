import { Facebook, Instagram, TwitterIcon } from "lucide-react"
import { Link } from "react-router-dom"


function LandingFooter() {
    return (
        <div>
            <footer className="text-white py-12 bg-primary-dark">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-2xl font-bold mb-4">Smart Village</h3>
                            <div className="flex space-x-4">
                                <a href="#" className="text-white hover:text-yellow-300 transition-colors">
                                    <TwitterIcon className="w-6 h-6" />
                                </a>
                                <a href="#" className="text-white hover:text-yellow-300 transition-colors">
                                    <Instagram className="w-6 h-6" />
                                </a>
                                <a href="#" className="text-white hover:text-yellow-300 transition-colors">
                                    <Facebook className="w-6 h-6" />
                                </a>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold mb-4">Platform</h4>
                            <ul className="space-y-2">
                                <li>
                                    <Link to="/" className="hover:text-yellow-300 transition-colors">
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#features" className="hover:text-yellow-300 transition-colors">
                                        Features
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#about" className="hover:text-yellow-300 transition-colors">
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#contact" className="hover:text-yellow-300 transition-colors">
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold mb-4">Support</h4>
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
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold mb-4">Legal</h4>
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
                        </div>
                    </div>

                    <div className="border-t border-green-500 mt-8 pt-8 text-center">
                        <p>&copy; 2025 All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default LandingFooter
