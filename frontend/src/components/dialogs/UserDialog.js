import {
    Alert,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormControl, InputLabel,
    MenuItem,
    Select
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React, { useCallback, useEffect, useState } from "react";
import ApiService from "../../services/api-service";

const UserDialog = ({ state, onClose }) => {

    const [form, setForm] = useState({
        name: '',
        password: '',
        firstName: '',
        lastName: '',
        type: 'User',
        role: 'TeamMember',
        team: ''
    });
    const handleForm = (name, value) => {
        setForm((prevForm) => ({ ...prevForm, [name]: value }))
    }

    const [error, setError] = useState('')

    const handleAddUser = (event) => {
        for (const name in form) {
            if (form[name] === '') {
                setError('Please fill in all required fields');
                return false;
            }
        }
        setError('');

        postData(form).then(res => {
            if (res.success) {
                setError('');
                onClose(event, { needReload: true });
            } else {
                setError(res.error)
            }
        });

    }

    const postData = useCallback(async (form) => {
        try {
            const res = await ApiService.post('users', form);
            return res
        } catch (e) {
            console.error(e.message);
        }
        return { error: 'Something went wrong! Please try again.' }
    }, []);

    const [availableTeams, setAvailableTeams] = useState([]);

    useEffect(() => {
        ApiService.get('teams').then(teams => {
            setAvailableTeams(teams);
        })
    }, [])

    return (
        <Dialog open={state.open}>
            <DialogTitle>{state.payload.mode === 'edit' ? 'Edit User' : 'Add User'}</DialogTitle>
            <DialogContent>
                {error && <Alert severity="warning">{error}</Alert>}
                <form>
                    <TextField
                        margin="dense"
                        id="name"
                        label="Username"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={e => handleForm('name', e.target.value)}
                        required
                        value={state.payload.name ?? ''}
                    />
                    <TextField
                        margin="dense"
                        id="password"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="standard"
                        onChange={e => handleForm('password', e.target.value)}
                        required
                    />
                    <TextField
                        margin="dense"
                        id="firstName"
                        label="First Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={e => handleForm('firstName', e.target.value)}
                        required
                    />
                    <TextField
                        margin="dense"
                        id="lastName"
                        label="Last Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={e => handleForm('lastName', e.target.value)}
                        required
                    />
                    <FormControl sx={{ mt: 3 }} fullWidth required>
                        <InputLabel htmlFor="user-role">User Role</InputLabel>
                        <Select
                            value={form.role}
                            label="User Role"
                            id="user-role"
                            onChange={e => handleForm('role', e.target.value)}
                        >
                            <MenuItem value={'TeamMember'}>Team Member</MenuItem>
                            <MenuItem value={'TeamLeader'}>Team Leader</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{ mt: 2 }} fullWidth required>
                        <InputLabel htmlFor="user-team">Assign Team</InputLabel>
                        <Select
                            value={form.team}
                            label="Assign Team"
                            id="user-team"
                            onChange={e => handleForm('team', e.target.value)}
                        >
                            {availableTeams.map(team => (
                                <MenuItem key={team._id} value={team._id}>{team.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleAddUser}>{state.payload.mode === 'edit' ? 'Save User' : 'Create User'}</Button>
            </DialogActions>
        </Dialog>
    )
}

export default UserDialog