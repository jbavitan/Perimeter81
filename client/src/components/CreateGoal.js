import React, { useContext, useEffect, useState } from 'react';
import { addGoal, getGoal, updateGoal } from '../Api/goalsApi';
import { Checkbox, IconButton, Grid, FormControl, Input, FormControlLabel, Button } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider, } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import CreateStep from './CreateStep';
import { useParams } from "react-router-dom";
import history from '../history';
import userContext from '../userContex';

const CreateGoal = () => {
    const { currUser } = useContext(userContext);
    const [goalToCreate, setGoalToCreate] = useState({
        description: '',
        name: '',
        dueDate: new Date(),
        completed: false,
        steps: [],
        user: currUser._id
    });
    const { id } = useParams();
    const initialStep = {
        description: '',
        name: '',
        dueDate: new Date(),
        completed: false
    }

    useEffect(() => {
        if (id) getGoalForEdit();
    }, [id])

    const getGoalForEdit = async () => {
        try {
            const goalFromServer = await getGoal(id, currUser);
            setGoalToCreate(goalFromServer.data);
        } catch (error) {
            alert('Error occured while fetching the goal details');
        }
    }

    const saveGoal = async () => {
        try {
            !id ? await addGoal(goalToCreate, currUser) : await updateGoal(goalToCreate, currUser);
            history.push(`/goals`);
            alert('The goal was successfully saved')
        } catch (error) {
            alert('An error has occured while trying to save the goal. Please try again');
        }
    }

    const setField = (field, value) => {
        setGoalToCreate({ ...goalToCreate, [field]: value });
    }

    const addStep = () => {
        let index = 0;
        if (goalToCreate.steps?.length) {
            const goalWithGreatestIndex = goalToCreate.steps.reduce((prev, curr) => (+prev.id > +curr.id) ? prev : curr);
            index = goalWithGreatestIndex.stepIndex + 1;
        }
        const newStep = { ...initialStep, stepIndex: index };
        setGoalToCreate(prev => {
            const currGoal = { ...prev };
            currGoal.steps = [...currGoal.steps, newStep];
            return currGoal;
        })
    }

    return (
        <div style={{ position: 'relative' }}>
            <Grid container spacing={1} style={{ padding: '5%' }}>
                <Grid item xs={6} justifyContent='flex-start' >
                    <h1 style={{ padding: '0% 6% 6% 06%' }}>{id ? 'Edit' : 'New'} Goal</h1>
                </ Grid>
                <Grid item xs={6} style={{ textAlign: 'right' }}>
                    <Button onClick={saveGoal} style={{ backgroundColor: 'lightGreen', position: 'fixed', right: '5%' }}>Save</Button>
                </Grid>
                <Grid item xs={4}>
                    <FormControlLabel
                        labelPlacement='start'
                        label="Name"
                        control={<Input style={{ marginLeft: '2%' }} value={goalToCreate.name} onChange={(event) => setField('name', event.target.value)} />}
                    />
                </Grid>
                <Grid item xs={4}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <FormControlLabel
                            labelPlacement='start'
                            label="Due Date"
                            control={<DatePicker style={{ marginLeft: '2%' }} value={goalToCreate.dueDate} onChange={(event) => setField('dueDate', event)} />}
                        />
                    </ MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={4}>
                    <FormControlLabel
                        labelPlacement='start'
                        control={<Checkbox checked={goalToCreate.completed} onChange={(event) => setField('completed', event.target.checked)} />}
                        label="Completed"
                    />
                </Grid>
                <Grid item xs={7} style={{ marginTop: '5%' }}>
                    <FormControlLabel
                        labelPlacement='start'
                        control={<Input style={{ marginLeft: '2%', width: '67vw' }} value={goalToCreate.description} onChange={(event) => setField('description', event.target.value)} />}
                        label="Description"
                    />
                </Grid>
                <Grid item xs={12} style={{ marginTop: '4%' }}>
                    <IconButton onClick={addStep} style={{ width: '50px', backgroundColor: 'grey' }}>+</ IconButton>
                    {goalToCreate?.steps?.length ?
                        <FormControl style={{ width: '90%' }}>
                            <h3 style={{ marginLeft: '2%' }}>Steps</h3>
                            {goalToCreate.steps.map((step, index) => {
                                return <CreateStep key={step._id ? step._id : index} step={step} setGoal={setGoalToCreate} />
                            })}
                        </FormControl> : <span>NO STEPS</ span>}
                </Grid>
            </Grid>
        </ div>
    )
}

export default CreateGoal;