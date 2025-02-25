import {useEffect, useState} from 'react';
import {ShoppingCart, ChevronLeft, ChevronRight} from 'lucide-react';
import {useNavigate} from "react-router-dom";
import axiosFetch from "../utils/Auth.js";

const Home = (props) => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const size = 4;
    let page = 0;
    const totalPages = Math.ceil(totalProducts / size);
    const token = localStorage.getItem("jwtToken");
    const navigate = useNavigate();

    const loadProducts = async () => {
        try {
            const response = await axiosFetch.get(`/api/v1/products/visitor/list`, {
                params: {
                    'searchText': '',
                    'page': page,
                    'size': size,
                }
            })
            const data = response.data?.object
            setTotalProducts(data?.count)
            setProducts(data?.dataList)
        } catch (error) {
            console.error("Something went wrong!...", error)
        }
    }

    useEffect(() => {
        loadProducts();
    }, []);


    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        page = pageNumber - 1;
        loadProducts();
    };

    const handleAddToCart = (id) => {
        token ? props.setCartCount((prevCount) => prevCount + 1) :
            navigate("login");

        props.readProductId(id)
    };

    const showProduct = (id) => {
        navigate(`product/${id}`)
    }

    return (
        <div className="container mx-auto px-4 py-2">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white">Featured Products</h1>
                <p className="mt-2 text-white">Discover our latest collection of premium products</p>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <div
                        key={product.propertyId}
                        className="bg-primary rounded-lg shadow-md overflow-hidden flex flex-col"
                        onClick={() => showProduct(product.propertyId)}
                    >
                        <div className="w-full">
                            <img
                                src={product?.productImages[0]?.resourceUrl}
                                alt={product.name}
                                className="w-full h-48 object-cover"
                            />
                        </div>
                        <div className="p-4 flex-grow">
                            <h2 className="text-xl font-semibold text-white mb-2">{product.name || 'Product'}</h2>
                            <p className="text-white text-sm mb-4">{product.description}</p>
                            <p className="text-2xl font-bold text-white">${product.unitPrice}</p>
                        </div>
                        <div className="p-4 pt-0">
                            <button
                                onClick={() => handleAddToCart(product.propertyId)}
                                className="w-full bg-accent text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2"
                            >
                                <ShoppingCart className="w-4 h-4 text-accent"/>
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center items-center gap-2">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-md border ${
                        currentPage === 1
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-white text-accent hover:bg-gray-50'
                    }`}
                >
                    <ChevronLeft className="w-4 h-4"/>
                </button>

                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`px-3 py-1 rounded-md ${
                            currentPage === index + 1
                                ? 'bg-accent text-white'
                                : 'bg-white text-accent hover:bg-gray-50 border'
                        }`}
                    >
                        {index + 1}
                    </button>
                ))}

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-md border ${
                        currentPage === totalPages
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-white text-accent hover:bg-gray-50'
                    } `}
                >
                    <ChevronRight className="w-4 h-4"/>
                </button>
            </div>
        </div>
    );
};

export default Home;