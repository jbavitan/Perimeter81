import React, { useContext, useState } from 'react';
import { Grid, FormControl, InputLabel, Input, Button } from '@material-ui/core';
import history from '../history';
import { userLogin } from '../Api/usersApi';
import userContext from '../userContex';

const UserLogin = (props) => {
    const { setCurrUser } = useContext(userContext);
    const [loginUser, setLoginUser] = useState({
        fullName: '',
        password: ''
    });

    const setField = (field, value) => {
        setLoginUser((prev) => {
            return {
                ...prev,
                [field]: value
            }
        })
    }

    const handleLogonSubmit = async () => {
        try {
            if (loginUser.fullName && loginUser.password) {
                const user = await userLogin(loginUser);
                if (user) {
                    setCurrUser(user.data);
                    history.push('/nextSteps');
                } else {
                    alert('Cannot login with current credentials. Please try again')
                }
            } else {
                alert('All credentials must be submitted');
            }
        } catch (error) {
            alert('Cannot login with current credentials. Please try again')
        }
    }

    return (
        <>
            <h2 style={{ padding: '0% 5% 0% 5%' }}>User Login</h2>
            <Grid container spacing={1} style={{ padding: '5%' }}>
                <Grid item xs={4}>
                    <FormControl>
                        <InputLabel >Full Name</InputLabel>
                        <Input value={loginUser.name} onChange={(event) => setField('fullName', event.target.value)} />
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                    <FormControl>
                        <InputLabel >Password</InputLabel>
                        <Input value={loginUser.password} onChange={(event) => setField('password', event.target.value)} />
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                    <Button style={{ backgroundColor: 'grey' }} onClick={handleLogonSubmit} disabled={!loginUser.fullName || !loginUser.password}>Login</Button>
                </Grid>
            </Grid>
        </>
    )
}

export default UserLogin;