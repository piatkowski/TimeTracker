import React, { useCallback, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import Login from './pages/Login'
import { useAuthContext } from "./store/auth-context";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from "@mui/material";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Users from "./pages/Users";
import Teams from "./pages/Teams";
import axios from "axios";

const theme = createTheme({
    palette: {
        primary: {
            main: '#3f51b5',
            primary: '#3f51b5',
            secondary: '#ab003c'
        },
    },
});

const createLoader = (endpoint) => async () => {
    const res = await axios.get('http://localhost/' + endpoint, { withCredentials: true });
    return res.data
}

const App = () => {

    const authCtx = useAuthContext();

    useEffect(() => {
        void authCtx.loginHandler();
    }, [])

    const createRouter = useCallback(() => createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" errorElement={<div>Error page</div>} element={authCtx.isLoggedIn ? <Dashboard/> : <Login/>}>
                {authCtx.isLoggedIn ? (
                    <React.Fragment>
                        <Route path="users" loader={createLoader('users')} element={<Users/>}/>
                        <Route path="teams" loader={createLoader('teamsx')} element={<Teams/>}/>
                    </React.Fragment>
                ) : <Route path="*" element={<Login/>}/>}
            </Route>
        )
    ), [authCtx.isLoggedIn]);


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <RouterProvider router={createRouter()}/>
        </ThemeProvider>
    );
}

export default App
