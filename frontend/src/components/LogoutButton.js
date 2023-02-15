import Button from "@mui/material/Button";
import { useAuthContext } from "../store/auth-context";
import { ListItemButton, ListItemText } from "@mui/material";

const LogoutButton = () => {
    const authCtx = useAuthContext()
    return <ListItemText onClick={authCtx.logoutHandler}>Logout</ListItemText>
}

export default LogoutButton