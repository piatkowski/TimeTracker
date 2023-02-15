import axios from "axios";

export const getAuthCookie = async (username, password) => {
    try {
        const res = await axios.post('http://localhost/token', {}, {
            withCredentials: true,
            auth: {
                username,
                password
            }
        });
        return {
            isAuth: res.status === 200 && res.data.auth === true,
            user: res.data.user ?? {}
        }
    } catch (err) {
        return {
            isAuth: false,
            user: {}
        };
    }
}

export const checkIsUserAuth = async () => {
    try {
        const res = await axios.post('http://localhost/auth', {}, {
            withCredentials: true
        })
        return {
            isAuth: res.status === 200 && res.data.auth === true,
            user: res.data.user ?? {}
        }
    } catch (err) {
        return {
            isAuth: false,
            user: {}
        };
    }
}

export const logoutUser = async () => {
    try {
        const res = await axios.post('http://localhost/logout', {}, {
            withCredentials: true
        })
        return res.status === 200;
    } catch (err) {
        return false;
    }
}