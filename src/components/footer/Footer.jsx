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
        <footer className="bg-primary text-white">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-4">SecretSanta</h2>
                        <p className="mb-4">
                            Your one-stop destination for premium products and exceptional shopping experience.
                        </p>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-accent"/>
                                <p>123 Commerce St, Business City, 12345</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="w-5 h-5 text-accent"/>
                                <p>+1 (234) 567-8900</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail className="w-5 h-5 text-accent"/>
                                <p>contact@secretsanta.com</p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            {['About Us', 'Contact Us', 'Products', 'Privacy Policy', 'Terms & Conditions',
                                'Returns & Exchanges', 'Shipping Information'].map((link) => (
                                <li key={link}>
                                    <a href="#" className="hover:text-light transition-colors">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
                        <ul className="space-y-2">
                            {['Cosmetics', 'Clothing', 'Accessories', 'Electronics', 'Trending'].map((category
                            ) => (
                                <li key={category}>
                                    <a href="#" className="hover:text-light transition-colors">
                                        {category}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter & Social */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Newsletter</h3>
                        <p className="mb-4">Subscribe to our newsletter for updates, news, and exclusive offers.</p>
                        <form onSubmit={handleNewsletterSubmit} className="mb-6">
                            <div className="flex">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-grow px-4 py-2 rounded-l-md focus:outline-none text-black bg-white"
                                />
                                <button
                                    type="submit"
                                    className="bg-accent px-4 py-2 rounded-r-md hover:bg-opacity-90 transition-colors
                                     text-white"
                                >
                                    <Send className="w-5 h-5"/>
                                </button>
                            </div>
                        </form>

                        <div>
                            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
                            <div className="flex space-x-4">
                                {[Facebook, Twitter, Instagram, Linkedin].map((Icon,
                                                                               index) => (
                                    <a key={index} href="#" className="hover:text-light transition-colors">
                                        <Icon className="w-6 h-6 text-accent"/>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-700">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p>© {new Date().getFullYear()} SecretSanta. All rights reserved.</p>
                        <div className="mt-4 md:mt-0">
                            <ul className="flex space-x-6">
                                {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link) => (
                                    <li key={link}>
                                        <a href="#" className="hover:text-light transition-colors">
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;