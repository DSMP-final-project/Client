import {useEffect, useState} from 'react';
import {
    Search, ShoppingCart, User, Menu, X
} from 'lucide-react';
import {NavLink, useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import axiosFetch from "../utils/auth/Auth.js";

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const [isScroll, setIsScroll] = useState(false)
    const [lastScrollY, setLastScrollY] = useState(0);
    const cookie = Cookies.get("token");

    const categories = ["Cosmetics", "Clothing", "Electronics", "Accessories"];

    const handleSignOut = async () => {
        try {
            await axiosFetch.get('auth/logout');
            location.reload()
        } catch (error) {
            console.error("Error during logout:", error);
        }
    }

    const goToCart = () => {
        navigate("/cart");
    }

    const goProfile = () => {
        navigate("/profile")
    }

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY
            if (currentScroll > 50) {
                setIsScroll(true)
            } else {
                setIsScroll(false)
            }
            setLastScrollY(currentScroll);
        };
        window.addEventListener('scroll', handleScroll, {passive: true});
    }, [lastScrollY]);

    return (<nav className={` shadow-md rounded-b-md sticky top-0 ${isScroll ? "bg-primary/90" : "bg-primary"}`}>
        <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
                {/* Logo */}
                <div className="flex-shrink-0">
                    <h1 className="text-3xl font-bold text-white mx-5">SecretSanta</h1>
                </div>

                {/* Desktop Navigation Links */}
                <div className="hidden md:flex items-center space-x-6">
                    {categories.map((category) => (<a
                        key={category}
                        href="#"
                        className="text-white hover:text-light transition-colors font-bold"
                    >
                        {category}
                    </a>))}
                </div>

                {/* Desktop Search Bar */}
                <div className="hidden md:flex items-center flex-none w-48 mx-4">
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full px-3 py-1.5 rounded-lg border border-gray-300 focus:outline-none
                            focus:border-accent text-white bg-primary placeholder-gray-300 text-sm"
                        />
                        <button className="absolute right-2 top-1.5 text-accent hover:text-light">
                            <Search className="w-4 h-4"/>
                        </button>
                    </div>
                </div>

                {/* Desktop Icons */}
                <div className="hidden md:flex items-center space-x-6">
                    <button className="text-accent hover:text-light relative" onClick={goToCart}>
                        <ShoppingCart className="w-6 h-6"/>
                    </button>

                    {cookie ? (<div className="flex items-center content-center gap-4">
                            <button className="text-accent hover:text-light" onClick={goProfile}>
                                <User className="w-6 h-6"/>
                            </button>
                            <NavLink
                                to="/"
                                className="px-4 py-2 bg-accent text-white font-semibold rounded-lg hover:bg-opacity-90
                                transition"
                                onClick={handleSignOut}
                            >
                                Sign out
                            </NavLink>
                        </div>

                    ) : (<NavLink
                        to="/login"
                        className="px-4 py-2 bg-accent text-white font-semibold rounded-lg hover:bg-opacity-90
                        transition"
                    >
                        Sign in
                    </NavLink>)}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-accent hover:text-light"
                    >
                        {isMenuOpen ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
                    </button>
                </div>
            </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (<div className="md:hidden bg-primary">
            <div className="px-4 pt-2 pb-4 space-y-2">
                {/* Mobile Search */}
                <div className="relative mb-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full px-3 py-1.5 rounded-lg border border-gray-300 focus:outline-none
                        focus:border-accent text-white bg-primary placeholder-gray-300 text-sm"
                    />
                    <button className="absolute right-2 top-1.5 text-accent">
                        <Search className="w-4 h-4"/>
                    </button>
                </div>

                {/* Mobile Navigation Links */}
                {categories.map((category) => (<a
                    key={category}
                    href="#"
                    className="block px-3 py-2 rounded-md text-white hover:text-light hover:bg-gray-50"
                >
                    {category}
                </a>))}

                {/* Mobile Icons */}
                <div className="flex justify-around pt-4 border-t border-gray-200">
                    <button
                        className="text-accent hover:text-light flex flex-col items-center"
                        onClick={goProfile}
                    >
                        <User className="w-6 h-6"/>
                        <span className="text-sm text-white">Account</span>
                    </button>
                    <button
                        className="text-accent hover:text-light flex flex-col items-center relative"
                        onClick={goToCart}
                    >
                        <ShoppingCart className="w-6 h-6"/>
                        {cartCount > 0 && (<span
                            className="absolute -top-2 -right-2 bg-warning text-black text-xs rounded-full w-5 h-5
                            flex items-center justify-center">
                    {cartCount}
                  </span>)}
                        <span className="text-sm text-white">Cart</span>
                    </button>
                </div>

                {/* Mobile Sign In Button */}
                <div className="pt-4">
                    {cookie ? (<NavLink
                        to="/"
                        className="px-4 py-2 bg-accent text-white font-semibold rounded-lg hover:bg-opacity-90
                         transition"
                        onClick={handleSignOut}
                    >
                        Sign out
                    </NavLink>) : (<NavLink
                        to="/login"
                        className="px-4 py-2 bg-accent text-white font-semibold rounded-lg hover:bg-opacity-90
                        transition"
                    >
                        Sign in
                    </NavLink>)}
                </div>
            </div>
        </div>)}
    </nav>);
};

export default NavBar;
