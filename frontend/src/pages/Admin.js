import Container from "@mui/material/Container";
import { Divider, Drawer, List, ListItemButton, Toolbar } from "@mui/material";
import LogoutButton from "../components/LogoutButton";

const Admin = () => {

    return (
        <Container>
            <Drawer variant="permanent">
                <Toolbar>
                    TimeTracker
                </Toolbar>
                <Divider />
                <List component="nav">
                    <ListItemButton>
                        <LogoutButton />
                    </ListItemButton>
                </List>
            </Drawer>
        </Container>
    )
}

export default Admin