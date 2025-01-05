import {useState} from 'react';
import {
    Search,
    ShoppingCart,
    User,
    Menu,
    X,
    Heart
} from 'lucide-react';
import {NavLink} from "react-router-dom";

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0); // Replace with your cart state

    const categories = [
        "New Arrivals",
        "Electronics",
        "Clothing",
        "Accessories",
        "Sale"
    ];

    return (
        <nav className="bg-gray-400 shadow-md rounded-md">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">

                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <h1 className="text-2xl font-bold text-gray-800 mx-5">UpScale</h1>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        {categories.map((category) => (
                            <a
                                key={category}
                                href="#"
                                className="text-gray-700 hover:text-gray-800 transition-colors font-bold"
                            >
                                {category}
                            </a>
                        ))}
                    </div>

                    {/* Desktop Search Bar */}
                    <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                            />
                            <button className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-800">
                                <Search className="w-5 h-5"/>
                            </button>
                        </div>
                    </div>

                    {/* Desktop Icons */}
                    <div className="hidden md:flex items-center space-x-6">
                        <button className="text-gray-600 hover:text-gray-800">
                            <Heart className="w-6 h-6"/>
                        </button>
                        <button className="text-gray-600 hover:text-gray-800">
                            <User className="w-6 h-6"/>
                        </button>
                        <button className="text-gray-600 hover:text-gray-800 relative">
                            <ShoppingCart className="w-6 h-6"/>
                            {cartCount > 0 && (
                                <span
                                    className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        <NavLink
                            to="/login"
                            className="px-4 py-2 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-800"
                        >
                            Sign In
                        </NavLink>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-600 hover:text-blue-600"
                        >
                            {isMenuOpen ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-4 pt-2 pb-4 space-y-2">

                        {/* Mobile Search */}
                        <div className="relative mb-4">
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                            />
                            <button className="absolute right-3 top-2.5 text-gray-400">
                                <Search className="w-5 h-5"/>
                            </button>
                        </div>

                        {/* Mobile Navigation Links */}
                        {categories.map((category) => (
                            <a
                                key={category}
                                href="#"
                                className="block px-3 py-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                            >
                                {category}
                            </a>
                        ))}

                        {/* Mobile Icons */}
                        <div className="flex justify-around pt-4 border-t border-gray-200">
                            <button className="text-gray-600 hover:text-blue-600 flex flex-col items-center">
                                <Heart className="w-6 h-6"/>
                                <span className="text-sm">Wishlist</span>
                            </button>
                            <button className="text-gray-600 hover:text-blue-600 flex flex-col items-center">
                                <User className="w-6 h-6"/>
                                <span className="text-sm">Account</span>
                            </button>
                            <button className="text-gray-600 hover:text-blue-600 flex flex-col items-center relative">
                                <ShoppingCart className="w-6 h-6"/>
                                {cartCount > 0 && (
                                    <span
                                        className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                                <span className="text-sm">Cart</span>
                            </button>
                        </div>

                        {/* Mobile Sign In Button */}
                        <div className="pt-4">
                            <NavLink
                                to="/login"
                                className="w-full px-4 py-2 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-800"
                            >
                                Sign In
                            </NavLink>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default NavBar;
