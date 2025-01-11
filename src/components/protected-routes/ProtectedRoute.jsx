import {Navigate} from "react-router-dom";

const ProtectedRoute=({children})=>{
    const token=localStorage.getItem("jwtToken");

    return token ? children : <Navigate to="/warn" replace/>
}

export default ProtectedRoute;
