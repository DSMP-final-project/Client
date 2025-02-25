import React, { useState } from 'react';
import { CreditCard, Lock, DollarSign } from 'lucide-react';

const PaymentInterface = () => {
    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: '',
        cardHolder: '',
        expiryDate: '',
        cvv: '',
        amount: ''
    });

    const [errors, setErrors] = useState({});
    const [isProcessing, setIsProcessing] = useState(false);

    const formatCardNumber = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = (matches && matches[0]) || '';
        const parts = [];

        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }

        if (parts.length) {
            return parts.join(' ');
        } else {
            return value;
        }
    };

    const formatExpiryDate = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        if (v.length >= 2) {
            return v.slice(0, 2) + '/' + v.slice(2, 4);
        }
        return v;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;

        if (name === 'cardNumber') {
            formattedValue = formatCardNumber(value);
        } else if (name === 'expiryDate') {
            formattedValue = formatExpiryDate(value);
        }

        setPaymentDetails(prev => ({
            ...prev,
            [name]: formattedValue
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        // Card number validation
        if (!paymentDetails.cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) {
            newErrors.cardNumber = 'Please enter a valid 16-digit card number';
        }

        // Card holder validation
        if (!paymentDetails.cardHolder.trim()) {
            newErrors.cardHolder = 'Please enter the card holder name';
        }

        // Expiry date validation
        if (!paymentDetails.expiryDate.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)) {
            newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
        }

        // CVV validation
        if (!paymentDetails.cvv.match(/^\d{3,4}$/)) {
            newErrors.cvv = 'Please enter a valid CVV';
        }

        // Amount validation
        if (!paymentDetails.amount || parseFloat(paymentDetails.amount) <= 0) {
            newErrors.amount = 'Please enter a valid amount';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            setIsProcessing(true);

            // Simulate payment processing
            try {
                await new Promise(resolve => setTimeout(resolve, 2000));
                alert('Payment processed successfully!');
                // Here you would typically make an API call to your payment processor
                setPaymentDetails({
                    cardNumber: '',
                    cardHolder: '',
                    expiryDate: '',
                    cvv: '',
                    amount: ''
                });
            } catch (error) {
                alert('Payment processing failed. Please try again.');
            } finally {
                setIsProcessing(false);
            }
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-primary rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Payment Details</h2>
                <Lock className="text-accent w-6 h-6" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Amount Input */}
                <div className="relative">
                    <label className="block text-sm font-medium text-white mb-1">Amount</label>
                    <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-accent w-5 h-5" />
                        <input
                            type="number"
                            name="amount"
                            value={paymentDetails.amount}
                            onChange={handleChange}
                            placeholder="0.00"
                            className={`pl-10 w-full p-3 border rounded-lg bg-primary text-white placeholder-gray-300 ${
                                errors.amount ? 'border-red-500' : 'border-gray-700'
                            }`}
                            step="0.01"
                            min="0"
                        />
                    </div>
                    {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
                </div>

                {/* Card Number Input */}
                <div>
                    <label className="block text-sm font-medium text-white mb-1">Card Number</label>
                    <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-accent w-5 h-5" />
                        <input
                            type="text"
                            name="cardNumber"
                            value={paymentDetails.cardNumber}
                            onChange={handleChange}
                            placeholder="0000 0000 0000 0000"
                            className={`pl-10 w-full p-3 border rounded-lg bg-primary text-white placeholder-gray-300 ${
                                errors.cardNumber ? 'border-red-500' : 'border-gray-700'
                            }`}
                            maxLength="19"
                        />
                    </div>
                    {errors.cardNumber && (
                        <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
                    )}
                </div>

                {/* Card Holder Input */}
                <div>
                    <label className="block text-sm font-medium text-white mb-1">Card Holder Name</label>
                    <input
                        type="text"
                        name="cardHolder"
                        value={paymentDetails.cardHolder}
                        onChange={handleChange}
                        placeholder="JOHN DOE"
                        className={`w-full p-3 border rounded-lg bg-primary text-white placeholder-gray-300 ${
                            errors.cardHolder ? 'border-red-500' : 'border-gray-700'
                        }`}
                    />
                    {errors.cardHolder && (
                        <p className="text-red-500 text-sm mt-1">{errors.cardHolder}</p>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {/* Expiry Date Input */}
                    <div>
                        <label className="block text-sm font-medium text-white mb-1">Expiry Date</label>
                        <input
                            type="text"
                            name="expiryDate"
                            value={paymentDetails.expiryDate}
                            onChange={handleChange}
                            placeholder="MM/YY"
                            className={`w-full p-3 border rounded-lg bg-primary text-white placeholder-gray-300 ${
                                errors.expiryDate ? 'border-red-500' : 'border-gray-700'
                            }`}
                            maxLength="5"
                        />
                        {errors.expiryDate && (
                            <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>
                        )}
                    </div>

                    {/* CVV Input */}
                    <div>
                        <label className="block text-sm font-medium text-white mb-1">CVV</label>
                        <input
                            type="password"
                            name="cvv"
                            value={paymentDetails.cvv}
                            onChange={handleChange}
                            placeholder="•••"
                            className={`w-full p-3 border rounded-lg bg-primary text-white placeholder-gray-300 ${
                                errors.cvv ? 'border-red-500' : 'border-gray-700'
                            }`}
                            maxLength="4"
                        />
                        {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-accent text-white py-3 rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                >
                    {isProcessing ? (
                        <span className="flex items-center justify-center">Processing...</span>
                    ) : (
                        <span className="flex items-center justify-center">Pay Now</span>
                    )}
                </button>
            </form>

            <div className="mt-6 flex items-center justify-center text-sm text-white">
                <Lock className="w-4 h-4 mr-2 text-accent" />
                Your payment info is secure and encrypted
            </div>
        </div>
    );
};

export default PaymentInterface;