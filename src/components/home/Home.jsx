import {useEffect, useState} from 'react';
import {ShoppingCart, ChevronLeft, ChevronRight} from 'lucide-react';
import axios from "axios";

const Home = () => {
    const baseUrl = import.meta.env.VITE_API_URL
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const size = 4;
    let page = 0;
    const totalPages = Math.ceil(totalProducts / size);

    const loadProducts = async () => {
        try {
            const response = await axios.get(`${baseUrl}/api/v1/products/list`, {
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

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Featured Products</h1>
                <p className="mt-2 text-gray-600">Discover our latest collection of premium products</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <div key={product.propertyId}
                         className="bg-gray-400 rounded-lg shadow-md overflow-hidden flex flex-col">
                        {product.productImages?.map((image) => (
                            <div className="w-full" key={image.propertyId}>
                                <img
                                    src={image.resourceUrl}
                                    alt={product.name}
                                    className="w-full h-48 object-cover"
                                />
                            </div>
                        ))}
                        <div className="p-4 flex-grow">
                            <h2 className="text-xl font-semibold mb-2">Product</h2>
                            <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                            <p className="text-2xl font-bold text-gray-700">${product.unitPrice}</p>
                        </div>
                        <div className="p-4 pt-0">
                            <button
                                className="w-full bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                                <ShoppingCart className="w-4 h-4"/>
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 flex justify-center items-center gap-2">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-md border ${
                        currentPage === 1
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white text-gray-700 hover:bg-gray-50'
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
                                ? 'bg-gray-700 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-50 border'
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
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                >
                    <ChevronRight className="w-4 h-4"/>
                </button>
            </div>
        </div>
    );
};

export default Home;