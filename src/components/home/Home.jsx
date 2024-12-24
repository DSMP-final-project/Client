import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    IconButton,
} from "@material-tailwind/react";
import {ArrowRightIcon, ArrowLeftIcon} from "@heroicons/react/24/outline";
import axios from "axios";
import {useEffect, useState} from "react";

export default function Home() {
    const baseUrl = import.meta.env.VITE_API_URL;

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [totalData, setTotalData] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const loadProducts = async (currentPage = 0) => {
        try {
            console.log("Fetching page:", currentPage);
            const response = await axios.get(`${baseUrl}/api/v1/products/list`, {
                params: {
                    searchText: '',
                    page: currentPage,
                    size: size,
                },
            });

            const data = response.data?.object;
            console.log(data?.count)
            console.log(size)
            console.log(Math.ceil(totalData / size))

            setProducts(data?.dataList || []);
            setTotalData(data?.count);

        } catch (error) {
            console.error("Error loading products:", error);
        }
    };

    useEffect(() => {
        loadProducts(page);
        setTotalPages(Math.ceil(totalData / size))
    }, []);

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            console.log("Changing to page:", newPage);
            setPage(newPage);
        }
    };

    return (
        <div>
            <div className="flex flex-wrap gap-6">
                {products.map((product) => (
                    <Card className="mt-6 w-96 border-2 border-black rounded-md shadow-md bg-gray-300"
                          key={product.propertyId}>

                        {product.productImages?.map((image) => (
                            <CardHeader color="blue-gray" className="relative h-56" key={image.propertyId}>
                                <img
                                    src={image.resourceUrl}
                                    alt={product.name || "Product Image"}
                                    className="h-full w-full object-cover"
                                />
                            </CardHeader>
                        ))}

                        <CardBody>
                            <Typography variant="h6" color="blue-gray">
                                {product.name || "Product Name"}
                            </Typography>
                            <Typography>
                                {product.description}
                            </Typography>
                            <Typography>
                                Price: ${product.unitPrice}
                            </Typography>
                            <Typography>
                                Quantity: {product.qty}
                            </Typography>
                        </CardBody>
                        <CardFooter className="pt-0">
                            <Button>Read More</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
            <div className="flex justify-center items-center my-6 gap-8">
                <IconButton
                    size="sm"
                    variant="outlined"
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 0}
                >
                    <ArrowLeftIcon strokeWidth={2} className="h-4 w-4"/>
                </IconButton>
                <Typography color="gray" className="font-normal">
                    Page <strong className="text-gray-900">{page + 1}</strong> of{" "}
                    <strong className="text-gray-900">{totalPages}</strong>
                </Typography>
                <IconButton
                    size="sm"
                    variant="outlined"
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page + 1 >= totalPages}
                >
                    <ArrowRightIcon strokeWidth={2} className="h-4 w-4"/>
                </IconButton>
            </div>
        </div>
    );
}
