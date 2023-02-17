import React from "react";
import { Container, Toolbar, TableRow, TableCell, TableContainer, Table, TableBody } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useLoaderData } from "react-router-dom";

const Projects = () => {

    const projects = useLoaderData();

    let Items = [];
    if (Array.isArray(projects) && projects.length > 0) {
        for (const project of projects) {
            const Item = <TableRow key={project._id}>
                <TableCell variant="head" component="th">
                    {project.name}
                </TableCell>
                <TableCell>
                    {project.client}
                </TableCell>
            </TableRow>;
            Items.push(Item);
        }
    }

    return (
        <React.Fragment>
            <Toolbar>
                <Typography variant="h5">Projects</Typography>
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

export default Projects