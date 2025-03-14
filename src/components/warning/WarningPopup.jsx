import {useNavigate} from 'react-router-dom';

const WarningPopup = () => {
    const navigate = useNavigate();

    const backToHome = () => {
        navigate('/');
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-primary p-6 rounded-lg shadow-lg w-96">
                <div className="p-6">
                    <div
                        className="flex items-center justify-center w-12 h-12 mx-auto bg-accent bg-opacity-20
                        rounded-full">
                        <svg
                            className="w-6 h-6 text-accent"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732
                                4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                    </div>

                    {/* Title */}
                    <h3 className="mt-4 text-lg font-semibold text-white text-center">
                        Authentication Required
                    </h3>

                    {/* Message */}
                    <p className="mt-2 text-sm text-white text-center">
                        You need to sign in first to access this feature.
                    </p>

                    {/* Close Button */}
                    <button
                        onClick={() => navigate("/login")}
                        className="mt-6 w-full px-4 py-2 text-sm font-medium text-white bg-accent rounded-md
                        hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2
                        transition-colors"
                    >
                        Sign in
                    </button>
                    <button
                        onClick={backToHome}
                        className="mt-6 w-full px-4 py-2 text-sm font-medium text-white bg-accent rounded-md
                         hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2
                         transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WarningPopup;