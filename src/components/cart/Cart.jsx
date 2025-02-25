import React, { useState } from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import {useNavigate} from "react-router-dom";

const ShoppingCart = (props) => {
    // Sample initial cart items - in real app, this would likely come from props or context
    const navigate=useNavigate();
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Product 1', price: 29.99, quantity: 1, image: '/api/placeholder/100/100' },
        { id: 2, name: 'Product 2', price: 39.99, quantity: 2, image: '/api/placeholder/100/100' },
    ]);

    const updateQuantity = (itemId, change) => {
        setCartItems(items =>
            items.map(item => {
                if (item.id === itemId) {
                    const newQuantity = Math.max(0, item.quantity + change);
                    return { ...item, quantity: newQuantity };
                }
                return item;
            }).filter(item => item.quantity > 0)
        );
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const navigatePayment=()=>{
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
                        <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-700 rounded-lg">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded"
                            />
                            <div className="flex-grow">
                                <h3 className="font-medium text-white">{item.name}</h3>
                                <p className="text-white">${item.price.toFixed(2)}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => updateQuantity(item.id, -1)}
                                    className="p-1 rounded-full hover:bg-gray-700 text-accent"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-8 text-center text-white">{item.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(item.id, 1)}
                                    className="p-1 rounded-full hover:bg-gray-700 text-accent"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => updateQuantity(item.id, -item.quantity)}
                                    className="p-1 rounded-full hover:bg-gray-700 text-red-500"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="w-24 text-right text-white">
                                ${(item.price * item.quantity).toFixed(2)}
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
                    className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-50"
                    disabled={cartItems.length === 0}
                >
                    Checkout
                </button>
            </div>
        </div>
    );
};

export default ShoppingCart;