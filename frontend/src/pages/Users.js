import React from "react";
import { Container, Toolbar, TableRow, TableCell, TableContainer, Table, TableBody } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useLoaderData } from "react-router-dom";

const Users = () => {

    const users = useLoaderData();

    let Items = [];
    if (Array.isArray(users) && users.length > 0) {
        for (const user of users) {
            const Item = <TableRow key={user._id}>
                <TableCell variant="head" component="th">
                    {user.name}
                </TableCell>
                <TableCell>
                    {user.role}
                </TableCell>
            </TableRow>;
            Items.push(Item);
        }
    }

    return (
        <React.Fragment>
            <Toolbar>
                <Typography variant="h5">Users</Typography>
            </Toolbar>
            <Container>
                <TableContainer>
                    <Table>
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