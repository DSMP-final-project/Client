import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound = () => {
    const navigate = useNavigate();

    const goHome = () => {
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-primary flex flex-col items-center justify-center px-4 py-12">
            {/* Large 404 Text */}
            <h1 className="text-9xl md:text-[12rem] font-bold text-warning tracking-widest animate-pulse">
                404
            </h1>

            {/* Creative Message */}
            <div className="text-center mt-6">
                <h2 className="text-3xl md:text-4xl font-semibold text-white">
                    Oops! Lost in the Cosmic Void
                </h2>
                <p className="mt-4 text-lg text-light">
                    It seems we’ve drifted off course. The page you’re looking for doesn’t exist—or it’s hiding in another galaxy!
                </p>
            </div>

            {/* Illustration or Decorative Element */}
            <div className="mt-10 flex justify-center">
                <div className="relative">
                    <div className="w-24 h-24 bg-accent rounded-full opacity-20 animate-ping"></div>
                    <div className="absolute top-0 w-24 h-24 bg-secondary rounded-full opacity-40 animate-ping delay-200"></div>
                    <svg
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-light"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 14v2m0-10v6m-4-2h8"
                        />
                    </svg>
                </div>
            </div>

            {/* Back to Home Button */}
            <button
                onClick={goHome}
                className="mt-12 flex items-center gap-2 px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-light transition-colors"
            >
                <Home className="w-5 h-5" />
                Back to Home
            </button>
        </div>
    );
};

export default NotFound;