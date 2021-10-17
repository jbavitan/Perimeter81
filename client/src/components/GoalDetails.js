import React, { useContext, useEffect, useState } from 'react';
import { getGoal } from '../Api/goalsApi';
import { FormLabel, Grid, FormControl, Button } from '@material-ui/core';
import Step from './Step';
import { useParams } from "react-router-dom";
import history from '../history';
import userContext from '../userContex';

const GoalDetails = (props) => {
    const { currUser } = useContext(userContext);
    const { goalSelected } = props;
    const { id } = useParams();
    const [goal, setGoal] = useState({});

    useEffect(() => {
        goalSelected ? setGoal(goalSelected) : getGoalFromServer();
    }, []);

    const getGoalFromServer = async () => {
        try {
            let goalFromServer = await getGoal(id, currUser);
            setGoal(goalFromServer.data);
        } catch (error) {
            alert('Error occured while fetching the goal details')
        }
    }

    const goToEditPage = () => {
        history.push(`/newGoal/${id}`);
    }

    return (
        goal ? <>
            <Button onClick={goToEditPage} style={{ backgroundColor: 'grey', position: 'fixed', top: '13%', right: '6%' }}>Edit</Button>
            <h1 style={{ paddingLeft: '6%' }}>{goal.name}</h1>
            {goal && <Grid container spacing={1} style={{ padding: '5%' }}>
                <Grid item xs={4}>
                    <FormControl>
                        <FormLabel style={{ fontWeight: 'bold' }}>Name: </FormLabel>
                        <span>{goal.name}</span>
                    </FormControl>
                </Grid>
                <Grid item xs={7}>
                    <FormControl style={{ width: '90%' }}>
                        <FormLabel style={{ fontWeight: 'bold' }}>Descripion: </FormLabel>
                        <span>{goal.description}</span>
                    </FormControl>
                </Grid>
                <Grid item xs={4} style={{ marginTop: '4%' }}>
                    <FormLabel style={{ fontWeight: 'bold' }}>Due Date: </FormLabel>
                    <span>{goal.dueDate}</span>
                </Grid>
                <Grid item xs={4} style={{ marginTop: '4%' }}>
                    <FormLabel style={{ fontWeight: 'bold' }}>Completed: </FormLabel>
                    <span>{goal.completed ? 'Yes' : 'No'}</span>
                </Grid>
                <Grid item xs={9} style={{ marginTop: '4%' }}>
                    <FormControl style={{ width: '90%' }}>
                        <FormLabel style={{ fontWeight: 'bold' }}>Steps:</FormLabel>
                        <Grid container spacing={1}>
                            {goal.steps?.map(step => {
                                return <Grid item xs={6}>
                                    <Step key={step._id} stepDetails={step} />
                                </ Grid>
                            })}
                        </ Grid>
                    </FormControl>
                </Grid>
            </Grid>}
        </> : <h3>NO GOAL FOUND</h3>
    )
}

export default GoalDetails;