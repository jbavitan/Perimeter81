import React, { useContext, useEffect, useState } from 'react';
import history from '../history';
import { Grid, Button } from '@material-ui/core';
import Step from './Step';
import { getNextSteps } from '../Api/stepsApi';
import userContext from '../userContex';

const NextSteps = () => {
    const { currUser } = useContext(userContext);
    const [nextSteps, setNextSteps] = useState([]);

    useEffect(() => {
        getNextStepsList();
    }, []);

    const getNextStepsList = async () => {
        try {
            const stepsFromServer = await getNextSteps(currUser);
            setNextSteps(stepsFromServer.data);
        } catch (error) {
            alert('Error occured while fetching next steps')
        }
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <Grid container justifyContent='center' spacing={1}>
                <Grid item xs={12}>
                    <h1 style={{ borderBottom: '1px solid black', display: 'inline' }}>Next Steps To Complete</h1>
                </ Grid>
                {nextSteps?.map(step => {
                    return <Grid item xs={6} key={step.goal._id}>
                        <h2>{step.goal.name}</ h2>
                        <Step stepDetails={step.nextStep} />
                        <Button style={{ marginTop: '1.5%', backgroundColor: 'lightGrey' }} onClick={() => history.push(`/goal/${step.goal.id}`)}>
                            More Details
                        </Button>
                    </ Grid>
                })}
            </ Grid>
        </ div>
    )
}

export default NextSteps;