import Footer from "../footer/Footer.jsx";
import Home from "./Home.jsx";
import NavBar from "../nav-bar/NavBar.jsx";
import { useState,useEffect} from "react";

const LandingPage = (props) => {
    const [cartCount, setCartCount] = useState(0);
    const [productId,setProductId]=useState();

    const readProductId=(id)=>{
        setProductId(id);
    }

    useEffect(() => {
        if(productId){
            console.log(productId)
        }
    }, [productId]);


    return (
        <div className="w-full">
            <NavBar cartCount={cartCount}/>
            <Home setCartCount={setCartCount} readProductId={readProductId}/>
            <Footer/>
        </div>
    )
}

export default LandingPage;