import {ThemeProvider, createTheme} from '@mui/material/styles';
import Login from './pages/Login'
import {isUserLoggedIn} from "./controllers/auth";
import React, {useEffect, useState} from "react";
import {CssBaseline} from "@mui/material";

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

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isInitialChecked, setIsInitialChecked] = useState(false)

    useEffect(() => {
        const checkUserLoggedIn = async () => {
            setIsLoggedIn(await isUserLoggedIn())
            setIsInitialChecked(true)
        }
        checkUserLoggedIn().catch(err => console.error(err))
    }, [])

    return <ThemeProvider theme={theme}>
        <CssBaseline/>
        { isInitialChecked && !isLoggedIn && <Login setIsLoggedIn={setIsLoggedIn} /> }
        { isInitialChecked && isLoggedIn && <div>Welcome!</div> }
    </ThemeProvider>;
}

export default App
