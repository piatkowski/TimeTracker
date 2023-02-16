import {
    Divider,
    Drawer,
    List,
    ListItemButton,
    Toolbar,
    CircularProgress,
    Backdrop
} from "@mui/material";
import { useAuthContext } from "../store/auth-context";
import Box from "@mui/material/Box";

import {
    NavLink, Outlet, useNavigation
} from "react-router-dom";
import { Fragment } from "react";

const Dashboard = () => {

    const ctx = useAuthContext()
    const navigation = useNavigation();

    return (
        <Fragment>
            <Backdrop sx={{ zIndex: 9000 }} open={navigation.state === 'loading'} >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Box sx={{ display: 'flex' }}>
                <Drawer variant="permanent" sx={{ minWidth: 200, '& .MuiPaper-root': { position: 'relative' } }}>
                    <Toolbar>
                        Hello {ctx.user.name} !
                    </Toolbar>
                    <Divider/>
                    <List component="nav">
                        {ctx.userCan('manage:users') &&
                            <ListItemButton component={NavLink} to="/users">Users</ListItemButton>}
                        {ctx.userCan('view:teams') &&
                            <ListItemButton component={NavLink} to="/teams">Teams</ListItemButton>}
                        <ListItemButton onClick={ctx.logoutHandler}>Logout</ListItemButton>
                    </List>
                </Drawer>
                <Box component="main" maxWidth="lg" sx={{ flexGrow: 1 }}>
                    <Outlet />
                </Box>
            </Box>
        </Fragment>
    )
}

export default Dashboard