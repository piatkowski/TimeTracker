import React from "react";
import { Container, Toolbar, TableRow, TableCell, TableContainer, Table, TableBody } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useLoaderData } from "react-router-dom";

const Teams = () => {

    const teams = useLoaderData();

    let Items = [];
    if (Array.isArray(teams) && teams.length > 0) {
        for (const team of teams) {
            const Item = <TableRow key={team._id}>
                <TableCell variant="head" component="th">
                    {team.name}
                </TableCell>
                <TableCell>
                    {team.leader.name}
                </TableCell>
            </TableRow>;
            Items.push(Item);
        }
    }

    return (
        <React.Fragment>
            <Toolbar>
                <Typography variant="h5">Teams</Typography>
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

export default Teams