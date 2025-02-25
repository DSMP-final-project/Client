import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axiosFetch from "../utils/Auth.js";
import ReviewPopup from "../../review/ReviewPopup.jsx";

const ProductDetails = () => {
    const [newReview, setNewReview] = useState('');
    const navigate = useNavigate();
    const {id} = useParams();
    const [productImages, setProductImages] = useState([]);
    const [productDetails, setProductDetails] = useState({});
    const [isReviewPopUp, setIsReviewPopUp] = useState(false);

    // Sample product data
    const product = {
        name: 'Ultra Comfort Running Shoes',
        price: 129.99,
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
        setProductDetails(response?.data?.object)
        console.log(response?.data?.object)
    }

    useEffect(() => {
        showData();
    }, [id]);

    useEffect(() => {
        setProductImages(productDetails?.productImages || []);
    }, [productImages]);

    const handleAddReview = () => {
        navigate(`/product/review/${id}`)
        console.log(id)
    };

    const handleBuyNow = () => {
        console.log('Processing purchase...');
    };

    const StarRating = ({rating}) => {
        return (
            <div className="text-accent">
                {'★'.repeat(rating)}
                {'☆'.repeat(5 - rating)}
            </div>
        );
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <button
                onClick={() => navigate("/")}
                className="mb-6 flex items-center gap-2 text-white hover:text-light"
            >
                ← Back to Products
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {
                    productImages.length !== 0 && (
                        <div className="space-y-4">
                            <div className="aspect-square overflow-hidden rounded-lg bg-primary">
                                <img src={productImages[0]?.resourceUrl} alt={product.name}
                                     className="w-full h-full object-cover"/>
                            </div>
                            {productImages.length > 1 && (
                                <div className="grid grid-cols-3 gap-4 mt-4">
                                    {productImages.slice(1).map((img, idx) => (
                                        <img
                                            key={idx}
                                            src={img.resourceUrl}
                                            alt={`${product.name} view ${idx + 2}`}
                                            className="aspect-square rounded-lg object-cover bg-primary"
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    )
                }

                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold text-white">{product.name}</h1>
                        <p className="text-2xl font-semibold mt-2 text-white">${productDetails.unitPrice}</p>
                    </div>

                    <p className="text-white">{product.description}</p>

                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold text-white mb-2">Size</h3>
                            <div className="flex gap-2 flex-wrap">
                                {product.sizes.map((size) => (
                                    <button
                                        key={size}
                                        className="w-12 h-12 border border-gray-700 text-white rounded-md hover:border-light"
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold text-white mb-2">Color</h3>
                            <div className="flex gap-2">
                                {product.colors.map((color) => (
                                    <button
                                        key={color}
                                        className="px-4 py-2 border border-gray-700 text-white rounded-md hover:border-light"
                                    >
                                        {color}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleBuyNow}
                        className="w-full bg-accent text-white py-3 rounded-md hover:bg-opacity-90 transition-colors"
                    >
                        Buy Now
                    </button>
                </div>
            </div>

            <div className="mt-12">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">Customer Reviews</h2>
                    <button
                        onClick={() => setIsReviewPopUp(true)}
                        className="px-4 py-2 bg-primary text-white border border-gray-700 rounded-md hover:bg-gray-700"
                    >
                        Add Review
                    </button>
                </div>
                {
                    isReviewPopUp && <ReviewPopup onClose={()=>setIsReviewPopUp(false)}/>
                }

                <div className="space-y-4">
                    {product.reviews.map((review) => (
                        <div key={review.id} className="p-4 border border-gray-700 rounded-lg bg-primary">
                            <div className="flex items-start gap-4">
                                <div
                                    className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white">
                                    {review.user[0]}
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between">
                                        <div>
                                            <p className="font-semibold text-white">{review.user}</p>
                                            <StarRating rating={review.rating}/>
                                        </div>
                                        <span className="text-white text-sm">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                                    </div>
                                    <p className="mt-2 text-white">{review.comment}</p>
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