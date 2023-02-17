import React, { useState } from "react";
import {
    Container,
    Toolbar,
    TableRow,
    TableCell,
    TableContainer,
    Table,
    TableBody,
    TableHead
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { useLoaderData, useNavigate, useNavigation } from "react-router-dom";
import Button from "@mui/material/Button";
import UserDialog from "../components/dialogs/UserDialog";

const Users = () => {

    const navigate = useNavigate();

    const users = useLoaderData();
    const [stateUserDialog, setStateUserDialog] = useState({
        open: false,
        payload: {}
    });

    const handleUserDialog = (event, payload = stateUserDialog.payload) => {
        if (payload.needReload) {
            navigate(window.location.pathname);
        }
        setStateUserDialog(prevState => {
            return { open: !prevState.open, payload: payload }
        })
    }

    let Items = [];

    if (Array.isArray(users) && users.length > 0) {
        for (const user of users) {
            const Item = (
                <TableRow key={user._id}>
                    <TableCell>
                        {user.name}
                    </TableCell>
                    <TableCell>
                        {user.firstName} {user.lastName}
                    </TableCell>
                    <TableCell>
                        {user.role}
                    </TableCell>
                    <TableCell>
                        {user.team ? user.team.name : ' - '}
                    </TableCell>
                    <TableCell>
                        <Button
                            size="small"
                            variant="contained"
                            value={user._id}
                            onClick={e => confirm('Sure?') && console.log(e.target.value)}
                        >
                            Delete
                        </Button>
                    </TableCell>
                </TableRow>
            );
            Items.push(Item);
        }
    }

    return (
        <React.Fragment>
            <UserDialog open={stateUserDialog.open} state={stateUserDialog} onClose={handleUserDialog}/>
            <Toolbar>
                <Typography variant="h5" sx={{ mr: 2 }}>Users</Typography>
                <Button
                    onClick={e => handleUserDialog(e, { mode: 'add' })}
                    size="small"
                    variant="contained"
                >New User
                </Button>
                <Button
                    onClick={e => handleUserDialog(e, { mode: 'edit', name: 'hello' })}
                    size="small"
                    variant="contained"
                >New User
                </Button>
            </Toolbar>
            <Container>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Username
                                </TableCell>
                                <TableCell>
                                    Name
                                </TableCell>
                                <TableCell>
                                    Role
                                </TableCell>
                                <TableCell>
                                    Team Name
                                </TableCell>
                                <TableCell>
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Items}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </React.Fragment>
    )
}

export default Users