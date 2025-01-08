import {createContext, useContext, useEffect, useState} from "react";

const AuthContext=createContext();

export const AuthProvider = ({children}) => {
    const [isLoggIn, setIsLoggIn]=useState(false);

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        if(token){
            setIsLoggIn(true)
        }
    }, []);

    const login = () => {
        setIsLoggIn(true);
    }

    const logout = () => {
        setIsLoggIn(false);
    }

    return(
        <AuthContext.Provider value={{isLoggIn,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth=()=>{
    return useContext(AuthContext);
}