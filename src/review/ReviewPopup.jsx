import {useState} from 'react';
import {Star} from 'lucide-react';
import {useParams} from 'react-router-dom';
import Cookies from 'js-cookie';
import axiosFetch from "../components/utils/Auth.js";

const ReviewPopup = (props) => {
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [comment, setComment] = useState('');
    const {id} = useParams();

    const handleSubmit = async () => {
        await axiosFetch.post(`/api/v1/reviews/add`, {
            userId: Cookies.get('userId'),
            productId: id,
            rating: rating,
            comment: comment,
        }).then(props.onClose)
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-primary rounded-lg shadow-lg w-full max-w-md">
                {/* Header */}
                <div className="p-4 border-b border-gray-700">
                    <h2 className="text-xl font-bold text-white">Write a Review</h2>
                </div>

                {/* Content */}
                <div className="p-4 space-y-4">
                    {/* Star Rating */}
                    <div className="flex items-center justify-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                className={`w-8 h-8 cursor-pointer transition-colors ${
                                    (hoveredRating || rating) >= star
                                        ? 'fill-accent text-accent'
                                        : 'text-gray-500'
                                }`}
                                onMouseEnter={() => setHoveredRating(star)}
                                onMouseLeave={() => setHoveredRating(0)}
                                onClick={() => setRating(star)}
                            />
                        ))}
                    </div>

                    {/* Comment Section */}
                    <textarea
                        placeholder="Share your experience..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full min-h-[100px] p-3 border border-gray-700 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-accent bg-primary text-white placeholder-gray-300"
                    />
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-700 flex justify-end space-x-2">
                    <button
                        className="px-4 py-2 border border-gray-700 rounded-lg text-white hover:bg-gray-700 transition-colors"
                        onClick={props.onClose}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={!rating}
                        className={`px-4 py-2 rounded-lg text-white transition-colors ${
                            rating
                                ? 'bg-accent hover:bg-opacity-90'
                                : 'bg-gray-500 cursor-not-allowed'
                        }`}
                    >
                        Submit Review
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewPopup;