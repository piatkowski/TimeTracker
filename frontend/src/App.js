import React from "react";
import { useAuthContext } from "./contexts/auth-context";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { createRouter } from "./router";

const theme = createTheme({
    palette: {
        primary: {
            main: '#3f51b5',
            primary: '#3f51b5',
            secondary: '#ab003c'
        },
    },
    components: {
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    background: "#3f51b5",
                    color: "#FFFFFF"
                }
            }
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    '&.active': { background: '#223491' }
                }
            }
        }
    }
});

const App = () => {

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <RouterProvider router={createRouter(useAuthContext())}/>
        </ThemeProvider>
    );
}

export default App
