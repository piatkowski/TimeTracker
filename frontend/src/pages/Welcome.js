import React from "react";
import Typography from "@mui/material/Typography";
import { Toolbar } from "@mui/material";
import Container from "@mui/material/Container";

const Welcome = () => {
    return (
        <React.Fragment>
            <Toolbar>
                <Typography variant="h5">Welcome</Typography>
            </Toolbar>
            <Container>
                Welcome to Time Tracker App.
            </Container>
        </React.Fragment>
    )
}

export default Welcome