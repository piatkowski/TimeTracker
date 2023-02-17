import React, { useState, useContext, useCallback } from "react";

export const AuthContext = React.createContext({});

export const useAuthContext = () => useContext(AuthContext);

const AuthContextProvider = props => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({})
    const [permissions, setPermissions] = useState([])

    const userCan = useCallback(permission => {
        return permissions.includes(permission)
    }, [permissions])

    const context = {
        isLoggedIn,
        user,
        permissions,
        userCan,
        setIsLoggedIn,
        setUser,
        setPermissions
    }

    return (
        <AuthContext.Provider value={context}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;