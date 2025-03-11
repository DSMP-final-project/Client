import { Trash2} from 'lucide-react';
import {useNavigate} from "react-router-dom";
import axiosFetch from "../utils/auth/Auth.js";
import Cookies from "js-cookie";
import {useEffect, useState} from "react";

const ShoppingCart = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);

    const getCartItems = async () => {
        try {
            const response = await axiosFetch.get(`/api/v1/cart/list`, {
                params: {
                    size: 10,
                    page: 0,
                    userId: Cookies.get('userId')
                }
            });
            console.log(response?.data?.object?.dataList)
            setCartItems(response?.data?.object?.dataList)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        getCartItems();
    }, []);

    const deleteItem =async (cartId, productId) => {
            try{
                const response = await axiosFetch.delete('/api/v1/cart/delete',{
                    params:{
                        cartId:cartId,
                        productId:productId
                    }
                })
                location.reload()
            }catch (e){
                console.log(e)
            }
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item?.unitPrice * item?.qty), 0);
    };

    const navigatePayment = () => {
        navigate("payment");
    }

    return (
        <div className="w-full max-w-2xl mx-auto border border-gray-700 rounded-lg shadow-lg bg-primary">
            <div className="p-4 border-b border-gray-700">
                <h2 className="text-xl font-bold text-white">Shopping Cart ({cartItems.length} items)</h2>
            </div>

            <div className="p-4 space-y-4">
                {cartItems.length === 0 ? (
                    <div className="text-center py-8 text-white">Your cart is empty</div>
                ) : (
                    cartItems.map((item) => (
                        <div key={item?.cartId} className="flex items-center space-x-4 p-4 border border-gray-700
                        rounded-lg">
                            <img
                                src={item?.productImages===null?null:item?.productImages[0]?.resourceUrl}
                                alt={item.productName}
                                className="w-16 h-16 object-cover rounded"
                            />
                            <div className="flex-grow">
                                <h3 className="font-medium text-white">{item?.productName}</h3>
                                <p className="text-white">${item?.unitPrice.toFixed(2)}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="w-8 text-center text-white">{item?.qty}</span>
                                <button
                                    onClick={()=>deleteItem(item?.cartId,item?.productId)}
                                    className="p-1 rounded-full hover:bg-gray-700 text-red-500"
                                >
                                    <Trash2 className="w-4 h-4"/>
                                </button>
                            </div>
                            <div className="w-24 text-right text-white">
                                ${(item?.unitPrice * item?.qty).toFixed(2)}
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="p-4 border-t border-gray-700 flex justify-between items-center">
                <div className="text-lg font-semibold text-white">
                    Total: ${calculateTotal().toFixed(2)}
                </div>
                <button
                    onClick={navigatePayment}
                    className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-opacity-90 transition-colors
                    disabled:opacity-50"
                    disabled={cartItems.length === 0}
                >
                    Checkout
                </button>
            </div>
        </div>
    );
};

export default ShoppingCart;