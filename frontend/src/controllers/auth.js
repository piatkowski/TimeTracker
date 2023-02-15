import axios from "axios";

export const login = async (username, password) => {
    try {
        const res = await axios.post('http://localhost/token', {}, {
            withCredentials: true,
            auth: {
                username,
                password
            }
        })
        return res.status === 200 && res.data.success === true;
    } catch (err) {
        return false;
    }
}

export const isUserLoggedIn = async () => {
    try {
        const res = await axios.post('http://localhost/auth', {}, {
            withCredentials: true
        })
        return res.status === 200 && res.data.auth === true;
    } catch (err) {
        return false;
    }
}