import React, { useState, useContext } from "react";
import { getAuthCookie, checkIsUserAuth, logoutUser } from "../controllers/auth";

export const AuthContext = React.createContext({});

export const useAuthContext = () => useContext(AuthContext);

const AuthContextProvider = props => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({})

    const logoutHandler = () => {
        logoutUser().then(isLoggedOut => {
            if(isLoggedOut) {
                setIsLoggedIn(false);
            }
        })
    }

    const loginHandler = (username, password) => {
        return getAuthCookie(username, password).then(({ isAuth, user }) => {
            setIsLoggedIn(isAuth);
            setUser(user);
            return isAuth
        })
    }

    const autoLoginHandler = () => {
        checkIsUserAuth().then(({ isAuth, user }) => {
            setIsLoggedIn(isAuth);
            setUser(user)
        })
    }

    const context = {
        isLoggedIn,
        user,
        loginHandler,
        logoutHandler,
        autoLoginHandler
    }

    return (
        <AuthContext.Provider value={context}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;