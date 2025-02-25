import {useEffect, useState} from "react";
import axiosFetch from "../auth/Auth.js";
import {Navigate, Outlet} from "react-router-dom";

const PrivateRoute = ({allowedRoles}) => {
    const [userRoles, setUserRoles] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRoles = async () => {
        try {
            const response = await axiosFetch.get('auth/userdata');
            const roleNames = response?.data?.object.map(role => role.roleName);
            setUserRoles(roleNames);
        } catch (error) {
            console.error("Error fetching user roles:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRoles();
    }, []);

    if (loading) return <div>Loading...</div>;

    return userRoles.some((role) => allowedRoles.includes(role)) ? (
        <Outlet/>
    ) : (
        <Navigate to="/unauthorized" replace/>
    );
};

export default PrivateRoute;
