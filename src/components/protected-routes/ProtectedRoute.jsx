import WarningPopup from "../warning/WarningPopup.jsx";

const ProtectedRoute=({children})=>{
    const token=localStorage.getItem("jwtToken");

    return token ? children : <WarningPopup/>
}

export default ProtectedRoute;
