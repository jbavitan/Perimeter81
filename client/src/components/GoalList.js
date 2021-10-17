import React, { useContext, useEffect, useState } from 'react';
import Goal from './Goal';
import { getGoals } from '../Api/goalsApi';
import history from '../history';
import { Button, Grid } from '@material-ui/core';
import userContext from '../userContex';

const GoalList = (props) => {
    const { currUser } = useContext(userContext);
    const { setGoalSelected } = props;
    const [goals, setGoals] = useState([]);

    useEffect(() => {
        getGoalList();
    }, []);

    const getGoalList = async () => {
    try {
        const goalsFromServer = await getGoals(currUser);
        setGoals(goalsFromServer.data);
    } catch (error) {
        alert('Error occured while fetching goals')
    }
    }

    const handleSelection = (goal) => {
        setGoalSelected(goal);
        history.push(`/goal/${goal._id}`)
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <h1 style={{ borderBottom: '1px solid black', display: 'inline' }}>Goals</h1>
                </ Grid>
                {goals?.length ? goals.map(goal => {
                    return <>
                        <Grid item xs={6}>
                            <Goal goalDetails={goal} />
                            <Button style={{ marginTop: '1.5%', backgroundColor: 'lightGrey' }} onClick={() => handleSelection(goal)}>
                                More Details
                            </Button>
                        </Grid>
                    </>
                }) : <Grid item xs={12}><h2 style={{ color: 'grey' }}>No Goals</ h2></Grid>}
            </Grid>
        </ div >
    )
}

export default GoalList;