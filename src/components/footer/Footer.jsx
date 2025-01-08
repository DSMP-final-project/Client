import 'react';
import {
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Mail,
    Phone,
    MapPin,
    Send
} from 'lucide-react';

const Footer = () => {
    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        // Add your newsletter subscription logic here
    };

    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                    <div>
                        <h2 className="text-2xl font-bold text-white mb-4">UpScale</h2>
                        <p className="mb-4">Your one-stop destination for premium products and exceptional shopping
                            experience.</p>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-gray-400"/>
                                <p>123 Commerce St, Business City, 12345</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="w-5 h-5 text-gray-400"/>
                                <p>+1 (234) 567-8900</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail className="w-5 h-5 text-gray-400"/>
                                <p>contact@upscale.com</p>
                            </div>
                        </div>
                    </div>


                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="hover:text-gray-400 transition-colors">About Us</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-gray-400 transition-colors">Contact Us</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-gray-400 transition-colors">Products</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-gray-400 transition-colors">Terms & Conditions</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-gray-400 transition-colors">Returns & Exchanges</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-gray-400 transition-colors">Shipping Information</a>
                            </li>
                        </ul>
                    </div>


                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="hover:text-gray-400 transition-colors">Cosmetics</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-gray-400 transition-colors">Clothing</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-gray-400 transition-colors">Accessories</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-gray-400 transition-colors">Electronics</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-gray-400 transition-colors">Trending</a>
                            </li>
                        </ul>
                    </div>


                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Newsletter</h3>
                        <p className="mb-4">Subscribe to our newsletter for updates, news, and exclusive offers.</p>
                        <form onSubmit={handleNewsletterSubmit} className="mb-6">
                            <div className="flex">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-grow px-4 py-2 rounded-l-md focus:outline-none text-gray-900"
                                />
                                <button
                                    type="submit"
                                    className="bg-gray-700 px-4 py-2 rounded-r-md hover:bg-gray-800 transition-colors"
                                >
                                    <Send className="w-5 h-5"/>
                                </button>
                            </div>
                        </form>


                        <div>
                            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
                            <div className="flex space-x-4">
                                <a href="#" className="hover:text-gray-400 transition-colors">
                                    <Facebook className="w-6 h-6"/>
                                </a>
                                <a href="#" className="hover:text-gray-400 transition-colors">
                                    <Twitter className="w-6 h-6"/>
                                </a>
                                <a href="#" className="hover:text-gray-400 transition-colors">
                                    <Instagram className="w-6 h-6"/>
                                </a>
                                <a href="#" className="hover:text-gray-400 transition-colors">
                                    <Linkedin className="w-6 h-6"/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p>&copy; {new Date().getFullYear()} UpScale. All rights reserved.</p>
                        <div className="mt-4 md:mt-0">
                            <ul className="flex space-x-6">
                                <li>
                                    <a href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-gray-400 transition-colors">Terms of Service</a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-gray-400 transition-colors">Cookie Policy</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;