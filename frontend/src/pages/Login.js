import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {login} from "../controllers/auth";
import {useState} from "react";
import {Alert} from "@mui/material";

const Login = (props) => {

    const [ error, setError ] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        login(data.get('username'), data.get('password')).then(isLogged => {
            if (isLogged) {
                setError('')
                props.setIsLoggedIn(true)
            } else {
                setError('Invalid username or password')
            }
        })
    };

    const clearError = () => {
        setError('')
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Time Tracker App
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="User Name"
                        name="username"
                        autoFocus
                        onFocus={clearError}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        onFocus={clearError}
                    />
                    { error && <Alert severity="error">{error}</Alert>}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        sx={{mt: 2}}
                    >SIGN IN</Button>
                </Box>
            </Box>
        </Container>
    );
}

export default Login
