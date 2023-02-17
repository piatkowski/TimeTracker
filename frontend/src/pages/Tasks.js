import React from "react";
import { Container, Toolbar, TableRow, TableCell, TableContainer, Table, TableBody } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useLoaderData } from "react-router-dom";

const Tasks = () => {

    const tasks = useLoaderData();

    let Items = [];
    if (Array.isArray(tasks) && tasks.length > 0) {
        for (const task of tasks) {
            const Item = <TableRow key={task._id}>
                <TableCell variant="head" component="th">
                    {task.name}
                </TableCell>
                <TableCell>
                    {task.client}
                </TableCell>
            </TableRow>;
            Items.push(Item);
        }
    }

    return (
        <React.Fragment>
            <Toolbar>
                <Typography variant="h5">Tasks</Typography>
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

export default Tasks