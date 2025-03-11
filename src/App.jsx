import './App.css'
import {Route, Routes} from "react-router-dom";
import NotFound from "./components/not-found/NotFound.jsx";
import LoginPage from "./components/login/LoginPage.jsx";
import SignupPage from "./components/signup/SignupPage.jsx";
import LandingPage from "./components/home/LandingPage.jsx";
import ShoppingCart from "./components/cart/Cart.jsx";
import UserProfile from "./components/profile/Profile.jsx";
import PaymentInterface from "./components/payment/Payment.jsx";
import ProtectedRoute from "./components/utils/protected-routes/ProtectedRoute.jsx";
import ProductDetails from "./components/product-details/ProductDetails.jsx";
import ReviewPopup from "./components/review/ReviewPopup.jsx";


function App() {
    return (
        <div>
            <div>
                <Routes>

                    <Route path="/" element={<LandingPage/>}/>

                    <Route path="/cart" element={
                        <ProtectedRoute>
                            <ShoppingCart/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/cart/payment" element={
                        <ProtectedRoute>
                            <PaymentInterface/>
                        </ProtectedRoute>
                    }/>

                    <Route path="/product/:id" element={<ProductDetails/>}/>
                    <Route path="product/review/:id" element={
                        <ProtectedRoute>
                            <ReviewPopup/>
                        </ProtectedRoute>
                    }/>

                    <Route path="/profile" element={
                        <ProtectedRoute>
                            <UserProfile/>
                        </ProtectedRoute>
                    }/>

                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/sign-up" element={<SignupPage/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </div>
        </div>
    )
}

export default App;
