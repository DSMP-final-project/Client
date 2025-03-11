import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axiosFetch from "../utils/auth/Auth.js";
import ReviewPopup from "../review/ReviewPopup.jsx";
import { ShoppingCart } from 'lucide-react';

const ProductDetails = () => {
    const [reviews, setReviews] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();
    const [productImages, setProductImages] = useState([]);
    const [productDetails, setProductDetails] = useState({});
    const [isReviewPopUp, setIsReviewPopUp] = useState(false);

    // Sample product data with added stock info
    const product = {
        name: 'Ultra Comfort Running Shoes',
        price: 129.99,
        inStock: true,  // Added inStock status
        quantityOnHand: 15,  // Added quantity on hand
        description:
            'Premium running shoes designed for maximum comfort and performance. Features advanced cushioning technology and breathable mesh upper.',
        images: ['/api/placeholder/400/300', '/api/placeholder/400/300', '/api/placeholder/400/300'],
        sizes: ['7', '8', '9', '10', '11', '12'],
        colors: ['Black', 'White', 'Blue'],
        reviews: [
            {
                id: 1,
                user: 'Sarah M.',
                rating: 5,
                comment: "Best running shoes I've ever owned! Super comfortable.",
                date: '2025-01-15',
            },
            {
                id: 2,
                user: 'Mike R.',
                rating: 4,
                comment: 'Great shoes, but took a few days to break in.',
                date: '2025-01-10',
            },
        ],
    };

    const showData = async () => {
        const response = await axiosFetch.get(`/api/v1/products/visitor/${id}`);
        setProductDetails(response?.data?.object);
        console.log(response?.data?.object?.reviewList);
        setReviews(response?.data?.object?.reviewList)
    };

    useEffect(() => {
        showData();
    }, [id]);

    useEffect(() => {
        setProductImages(productDetails?.productImages || []);
    }, [productDetails]);


    const handleBuyNow = () => {
        console.log('Processing purchase...');
    };

    const StarRating = ({ rating }) => {
        return (
            <div className="text-accent">
                {'★'.repeat(rating)}
                {'☆'.repeat(5 - rating)}
            </div>
        );
    };

    return (
        <div className="max-w-6xl mx-auto p-6 bg-light dark:bg-gray-900">
            <button
                onClick={() => navigate("/")}
                className="mb-6 flex items-center gap-2 text-primary dark:text-white hover:text-accent dark:hover:text-gray-300"
            >
                ← Back to Products
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {
                    productImages.length !== 0 && (
                        <div className="space-y-4">
                            <div className="aspect-square overflow-hidden rounded-lg bg-light/50 dark:bg-gray-800">
                                <img src={productImages[0]?.resourceUrl} alt={productDetails.productName}
                                     className="w-full h-full object-cover"/>
                            </div>
                            {productImages.length > 1 && (
                                <div className="grid grid-cols-3 gap-4 mt-4">
                                    {productImages.slice(1).map((img, idx) => (
                                        <img
                                            key={idx}
                                            src={img.resourceUrl}
                                            alt={`${productDetails.productName} view ${idx + 2}`}
                                            className="aspect-square rounded-lg object-cover bg-light/50 dark:bg-gray-800"
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    )
                }

                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold text-primary dark:text-white">{productDetails.productName}</h1>
                        <p className="text-2xl font-semibold mt-2 text-primary dark:text-white">${productDetails.unitPrice}</p>
                        {/* Stock Status and Quantity */}
                        <div className="mt-2 flex items-center gap-4">
                            <span
                                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                    productDetails.available
                                        ? 'bg-accent text-white'
                                        : 'bg-red-500 text-white'
                                }`}
                            >
                                {productDetails.available ? 'In Stock' : 'Out of Stock'}
                            </span>
                            <span className="text-secondary dark:text-gray-300">
                                Quantity Available: {productDetails.qty || 0}
                            </span>
                        </div>
                    </div>

                    <p className="text-secondary dark:text-gray-300">{productDetails.description}</p>

                    <button
                        onClick={handleBuyNow}
                        className="w-full bg-accent text-white py-3 rounded-md hover:bg-accent/90 transition-colors"
                    >
                        Buy Now
                    </button>
                    <button
                        onClick={handleBuyNow}
                        className="w-full bg-accent text-white py-3 rounded-md hover:bg-accent/90 transition-colors flex items-center justify-center gap-2"
                    >
                        <ShoppingCart className="w-5 h-5"/>
                        Add To Cart
                    </button>
                </div>
            </div>

            <div className="mt-12">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-primary dark:text-white">Customer Reviews</h2>
                    <button
                        onClick={() => setIsReviewPopUp(true)}
                        className="px-4 py-2 bg-primary text-white border border-secondary rounded-md hover:bg-primary/90"
                    >
                        Add Review
                    </button>
                </div>
                {isReviewPopUp && <ReviewPopup onClose={() => setIsReviewPopUp(false)} />}

                <div className="space-y-4">
                    {reviews.map((review) => (
                        <div key={review.id} className="p-4 border border-secondary rounded-lg bg-light/50 dark:bg-gray-900/50">
                            <div className="flex items-start gap-4">
                                <div
                                    className="w-10 h-10 rounded-full bg-light dark:bg-gray-800 flex items-center justify-center text-primary dark:text-white">
                                    <span className="text-sm font-bold">
                                    {review.customer.userName ? review.customer.userName.split(" ").map((word) =>
                                        word[0]).join("") : null}
                                </span>
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between">
                                        <div>
                                            <p className="font-semibold text-primary dark:text-white">{review.customer.userName}</p>
                                            <StarRating rating={review.rating} />
                                        </div>
                                        <span className="text-secondary dark:text-gray-300 text-sm">
                                            {new Date(review.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="mt-2 text-secondary dark:text-gray-300">{review?.comment}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;