import axios from "axios";

const appPermissions = {
    Admin: ['manage:users'],
    TeamLeader: [],
    TeamMember: [],
    User: []
}

const ApiService = {
    loginHandler: async (ctx, username = undefined, password = undefined) => {
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

        ctx.setIsLoggedIn(isAuth);

        if (isAuth) {
            ctx.setUser(userData);
            if (userData.type) {
                grantedPermissions = [...new Set([...appPermissions[userData.type], ...appPermissions[userData.role]])];
                ctx.setPermissions(grantedPermissions);
            } else {
                ctx.setPermissions([])
            }
        }
        return { isAuth, userData, grantedPermissions };
    },

    logoutHandler: async (ctx) => {

        let isLoggedOut = false;

        try {
            const res = await axios.post(process.env.REACT_APP_BACKEND_URL + '/logout', {}, { withCredentials: true })
            isLoggedOut = res.status === 200;

        } catch (err) {
            if (err.name !== 'AxiosError') {
                console.log('AuthContext Error', err);
            }
        }

        if (isLoggedOut) {
            ctx.setIsLoggedIn(false);
            ctx.setPermissions([]);
        }
    },

    get: async (endpoint) => {
        const res = await axios.get(process.env.REACT_APP_BACKEND_URL + '/' + endpoint, { withCredentials: true });
        return res.data;
    },

    post: async (endpoint, payload) => {
        const res = await axios.post(process.env.REACT_APP_BACKEND_URL + '/' + endpoint, payload, { withCredentials: true });
        return res.data;
    }
}

const fetchAuth = (username, password) => {
    if (username === undefined || password === undefined) {
        return axios.post(process.env.REACT_APP_BACKEND_URL + '/auth', {}, { withCredentials: true });
    }
    return axios.post(process.env.REACT_APP_BACKEND_URL + '/token', {}, {
        withCredentials: true,
        auth: { username, password }
    });
}

export default ApiService;