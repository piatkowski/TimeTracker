import { Divider, Drawer, List, ListItemButton, Toolbar } from "@mui/material";
import { NavLink } from "react-router-dom";
import ApiService from "../services/api-service";
import { useAuthContext } from "../contexts/auth-context";

const DashboardMenu = () => {
    const ctx = useAuthContext();

    const logoutHandler = () => {
        void ApiService.logoutHandler(ctx)
    }

    return (
        <Drawer variant="permanent"
                sx={{
                    minHeight: '100vh',
                    minWidth: 200,
                    '& .MuiPaper-root': { position: 'relative' }
                }}>
            <Toolbar>
                Hello {ctx.user.name} !
            </Toolbar>
            <Divider/>
            <List component="nav">

                {ctx.userCan('manage:users') && <ListItemButton component={NavLink} to="/users">Users</ListItemButton>}
                <ListItemButton component={NavLink} to="/teams">Teams</ListItemButton>
                <ListItemButton component={NavLink} to="/projects">Projects</ListItemButton>
                <ListItemButton component={NavLink} to="/tasks">Tasks</ListItemButton>

                <ListItemButton onClick={logoutHandler}>Logout</ListItemButton>
            </List>
        </Drawer>
    )
}

export default DashboardMenu;