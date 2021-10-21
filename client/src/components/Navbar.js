import React, { useContext } from 'react';
import history from '../history';
import { Button, Grid } from '@material-ui/core';
import userContext from '../userContex';

const Navbar = () => {
    const { currUser } = useContext(userContext);

    return (
        <Grid container spacing={1} alignItems="center" style={{ backgroundColor: 'lightgrey', position: 'fixed', zIndex: '1000' }}>
            <Grid item xs={3}><span style={{ fontWeight: 'bold', marginLeft: '2%' }}>Welcome {currUser.fullName.split(' ')[0]}</ span></Grid>
            <Grid item xs={2} >
                <Button style={{ backgroundColor: 'grey', marginTop: '4%', width: '95%' }} onClick={() => history.push(`/goals`)}>
                    Goals
                </Button>
            </ Grid>
            <Grid item xs={2} >
                <Button style={{ backgroundColor: 'grey', marginTop: '4%', width: '95%' }} onClick={() => history.push(`/nextSteps`)}>
                    Next Steps
                </Button>
            </ Grid>
            <Grid item xs={2} >
                <Button style={{ backgroundColor: 'grey', marginTop: '4%', width: '95%' }} onClick={() => history.push(`/newGoal`)}>
                    New Goal +
                </Button>
            </ Grid>
            <Grid item xs={3} style={{ textAlign: 'right' }}>
                <Button style={{ backgroundColor: 'lightGrey', border: '1px solid black', marginTop: '2%', width: '50%' }} onClick={() => history.push(`/userLogin`)}>
                    User Login
                </Button>
            </ Grid>
        </ Grid>
    )
}

export default Navbar;