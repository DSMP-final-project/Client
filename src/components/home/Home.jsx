import {useEffect, useState} from 'react';
import {ShoppingCart, ChevronLeft, ChevronRight, Star, Circle} from 'lucide-react';
import {useNavigate} from 'react-router-dom';
import axiosFetch from '../utils/auth/Auth.js';
import Cookies from 'js-cookie';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const size = 4;
    let page = 0;
    const totalPages = Math.ceil(totalProducts / size);
    const navigate = useNavigate();


    const loadProducts = async () => {
        try {
            const response = await axiosFetch.get(`/api/v1/products/visitor/list`, {
                params: {
                    'searchText': '', 'page': page, 'size': size,
                },
            });
            const data = response.data?.object;
            setTotalProducts(data?.count);
            setProducts(data?.dataList);
            console.log(data)
        } catch (error) {
            console.error('Something went wrong!...', error);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        page = pageNumber - 1;
        loadProducts();
    };

    const handleAddToCart = async (id) => {

        try {
            const response = await axiosFetch.post(`/api/v1/cart/save`, null, {
                params: {
                    pId: id, uId: Cookies.get('userId')
                }
            })
        } catch (e) {
            if (e.status === 422) {
                console.log("Product not available.")
            }
        }

    };

    const showProduct = (id) => {
        navigate(`product/${id}`);
    };

    return (<div className="container mx-auto px-4 py-2">
        {/* Header */}
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">Featured Products</h1>
            <p className="mt-2 text-white">Discover our latest collection of premium products</p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (<div
                key={product.propertyId}
                className="bg-primary rounded-lg shadow-md overflow-hidden flex flex-col"
                onClick={() => showProduct(product.propertyId)}
            >
                <div className="w-full">
                    <img
                        src={product?.productImages[0]?.resourceUrl}
                        alt={product.productName}
                        className="w-full h-48 object-cover"
                    />
                </div>
                <div className="p-4 flex-grow grid grid-cols-2 gap-2">
                    {/* Left Column: Product Details */}
                    <div>
                        <h2 className="text-xl font-semibold text-white mb-2">{product.productName || 'Product'}</h2>
                        <p className="text-2xl font-bold text-white">${product.unitPrice}</p>
                        <div className="flex items-center gap-1 mt-2">

                        </div>
                    </div>
                    {/* Right Column: Status and Discount */}
                    <div className="flex flex-col items-end gap-2">
                        <div className='flex gap-2 items-center'>
                            <Star className="w-4 h-4 text-accent"/>
                            <Star className="w-4 h-4 text-accent"/>
                            <Star className="w-4 h-4 text-accent"/>
                            <Star className="w-4 h-4 text-accent"/>
                            <Star className="w-4 h-4 text-accent"/>
                            <span className="text-white text-sm">
                                {product.starMean || 0}
                            </span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Circle
                                className={`w-3 h-3 ${product.available !== false ? 'text-green-500' : 'text-red-500'}`}
                            />
                            <span className="text-white text-xs">
                    {product.available !== false ? 'In Stock' : 'Out of Stock'}
                  </span>
                        </div>
                        {/* Discount Status */}
                        {product.discount && product.discount > 0 ? (
                            <div className="bg-accent text-white text-xs font-semibold px-2 py-1 rounded-full">
                                {product.discount}% OFF
                            </div>) : (<span className="text-white text-xs">No Discount</span>)}
                    </div>
                </div>
                {Cookies.get('token') ? <div className="p-4 pt-0">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(product.propertyId);
                        }}
                        className={`w-full bg-accent text-white py-2 px-4 rounded-md hover:bg-opacity-90
        transition-colors flex items-center justify-center gap-2 ${product.available ? '' : 'opacity-50 cursor-not-allowed'}`}
                        disabled={!product.available}
                    >
                        <ShoppingCart className="w-4 h-4"/>
                        Add to Cart
                    </button>
                </div> : null}

            </div>))}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex justify-center items-center gap-2">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 rounded-md border ${currentPage === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white text-accent hover:bg-gray-50'}`}
            >
                <ChevronLeft className="w-4 h-4"/>
            </button>

            {[...Array(totalPages)].map((_, index) => (<button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-3 py-1 rounded-md ${currentPage === index + 1 ? 'bg-accent text-white' : 'bg-white text-accent hover:bg-gray-50 border'}`}
            >
                {index + 1}
            </button>))}

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-md border ${currentPage === totalPages ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white text-accent hover:bg-gray-50'}`}
            >
                <ChevronRight className="w-4 h-4"/>
            </button>
        </div>
    </div>);
};

export default Home;