import React, { useState, useContext, useCallback } from "react";
import axios from "axios";

export const AuthContext = React.createContext({});

export const useAuthContext = () => useContext(AuthContext);

const appPermissions = {
    Admin: ['general', 'manage:users', 'view:teams'],
    TeamLeader: ['general'],
    TeamMember: ['general'],
    User: ['general', 'view:teams']
}

const fetchAuth = (username, password) => {
    if (username === undefined || password === undefined) {
        return axios.post('http://localhost/auth', {}, { withCredentials: true });
    }

    return axios.post('http://localhost/token', {}, {
        withCredentials: true,
        auth: { username, password }
    });

}

const AuthContextProvider = props => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({})
    const [permissions, setPermissions] = useState([])

    const loginHandler = useCallback(async (username = undefined, password = undefined) => {

        let isAuth = false;
        let userData = {};
        let grantedPermissions = [];

        try {
            const res = await fetchAuth(username, password);
            isAuth = res.status === 200 && res.data.auth === true;
            userData = res.data.user ?? {};

        } catch (err) {
            if (err.name !== 'AxiosError') {
                console.log('AuthContext Error', err);
            }
        }

        setIsLoggedIn(isAuth);
        setUser(userData);
        if (userData.type) {
            grantedPermissions = [...new Set([...appPermissions[userData.type], ...appPermissions[userData.role]])];
            setPermissions(grantedPermissions);
        } else {
            setPermissions([])
        }
        return { isAuth, userData, grantedPermissions };

    }, [])

    const logoutHandler = useCallback(async () => {

        let isLoggedOut = false;

        try {
            const res = await axios.post('http://localhost/logout', {}, { withCredentials: true })
            isLoggedOut = res.status === 200;

        } catch (err) {
            if (err.name !== 'AxiosError') {
                console.log('AuthContext Error', err);
            }
        }

        if (isLoggedOut) {
            setIsLoggedIn(false);
            setPermissions([]);
        }
    }, []);

    const userCan = useCallback(permission => {
        return permissions.includes(permission)
    }, [permissions])

    const context = {
        isLoggedIn,
        user,
        permissions,
        loginHandler,
        logoutHandler,
        userCan
    }

    return (
        <AuthContext.Provider value={context}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;