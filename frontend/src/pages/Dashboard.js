import { CircularProgress, Backdrop } from "@mui/material";
import { useAuthContext } from "../contexts/auth-context";
import Box from "@mui/material/Box";
import { Outlet, useNavigation } from "react-router-dom";
import { Fragment } from "react";
import DashboardMenu from "../components/DashboardMenu";

const Dashboard = () => {

    const ctx = useAuthContext()
    const navigation = useNavigation();

    return (
        <Fragment>
            <Backdrop sx={{ zIndex: 9000 }} open={navigation.state === 'loading'}>
                <CircularProgress color="inherit"/>
            </Backdrop>
            <Box sx={{ display: 'flex' }}>
                <DashboardMenu />
                <Box component="main" maxWidth="lg" sx={{ flexGrow: 1 }}>
                    <Outlet/>
                </Box>
            </Box>
        </Fragment>
    )
}

export default Dashboard