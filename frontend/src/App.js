import React, { useEffect } from "react";
import Admin from "./pages/Admin";
import Login from './pages/Login'
import { useAuthContext } from "./store/auth-context";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: '#3f51b5',
            primary: '#3f51b5',
            secondary: '#ab003c'
        },
    },
});

const App = () => {

    const authCtx = useAuthContext();

    useEffect(() => {
        authCtx.autoLoginHandler();
    }, [])

    let app;

    if (authCtx.isLoggedIn) {
        app = (
            <React.Fragment>
                <Admin />
            </React.Fragment>
        );
    } else {
        app = (
            <Login/>
        )
    }


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            {app}
        </ThemeProvider>
    );
}

export default App
