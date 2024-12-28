import './App.css'
import {Route, Routes} from "react-router-dom";
import NotFound from "./components/not-found/NotFound.jsx";
import LoginPage from "./components/login/LoginPage.jsx";
import SignupPage from "./components/signup/SignupPage.jsx";
import LandingPage from "./components/home/LandingPage.jsx";

function App() {

    return (
        <div>
            <div>
                <Routes>
                    <Route path="/" element={<LandingPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/sign-up" element={<SignupPage/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </div>
        </div>
    )
}

export default App
