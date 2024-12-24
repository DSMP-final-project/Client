import './App.css'
import NavBar from "./components/nav-bar/NavBar.jsx";
import {Route, Routes} from "react-router-dom";
import Home from "./components/home/Home.jsx";
import Footer from "./components/footer/Footer.jsx";
import NotFound from "./components/not-found/NotFound.jsx";

function App() {

    return (
        <div>
            <div>
                <NavBar/>
            </div>
            <div>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    )
}

export default App
