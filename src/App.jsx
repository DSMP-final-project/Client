import './App.css'
import {Route, Routes} from "react-router-dom";
import NotFound from "./components/not-found/NotFound.jsx";
import LoginPage from "./components/login/LoginPage.jsx";
import SignupPage from "./components/signup/SignupPage.jsx";
import LandingPage from "./components/home/LandingPage.jsx";
import {useEffect, useState} from "react";
import ShoppingCart from "./components/cart/Cart.jsx";
import UserProfile from "./components/profile/Profile.jsx";
import PaymentInterface from "./components/payment/Payment.jsx";
import ProtectedRoute from "./components/protected-routes/ProtectedRoute.jsx";
import ProductDetails from "./components/product-details/ProductDetails.jsx";
import ReviewPopup from "./review/ReviewPopup.jsx";


function App() {
    const [productId, setProductId] = useState();

    const readProductId = (id) => {
        setProductId(id);
    }

    useEffect(() => {
        if (productId) {
            console.log(productId)
        }
    }, [productId]);

    return (
        <div>
            <div>
                <Routes>

                    <Route path="/" element={<LandingPage readProductId={readProductId}/>}/>

                    <Route path="/cart" element={
                        <ProtectedRoute>
                            <ShoppingCart productId={productId}/>
                        </ProtectedRoute>
                    }
                    />
                    <Route path="/profile" element={
                        <ProtectedRoute>
                            <UserProfile/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/cart/payment" element={<PaymentInterface/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/sign-up" element={<SignupPage/>}/>
                    <Route path="*" element={<NotFound/>}/>
                    <Route path="/product/:id" element={<ProductDetails/>}/>
                    <Route path="product/review/:id" element={<ReviewPopup/>}/>
                </Routes>
            </div>
        </div>
    )
}

export default App
