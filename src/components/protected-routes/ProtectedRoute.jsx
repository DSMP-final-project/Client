import WarningPopup from "../warning/WarningPopup.jsx";
import Cookies from "js-cookie";

const ProtectedRoute = ({children}) => {
    const cookie = Cookies.get("token");

    return cookie ? children : <WarningPopup/>
}

export default ProtectedRoute;
