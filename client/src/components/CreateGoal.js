import React, { useContext, useEffect, useState } from 'react';
import { addGoal, getGoal, updateGoal } from '../Api/goalsApi';
import { Checkbox, IconButton, Grid, FormControl, InputLabel, Input, FormControlLabel, Button } from '@material-ui/core';
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
        completed: false,
        stepIndex: undefined,
    }

    useEffect(() => {
        if (id) getGoalForEdit();
    }, [id])

    const getGoalForEdit = async () => {
        try {
            const goalFromServer = await getGoal(id, currUser);
            if (goalFromServer.data.steps?.length) setGoalToCreate(prev => {
                prev.steps = [...goalFromServer.data.steps];
                return prev
            })
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
        setGoalToCreate((prev) => {
            return {
                ...prev,
                [field]: value
            }
        })
    }

    const addStep = () => {
        let index = 0;
        if (goalToCreate.steps?.length) {
            const nextIndex = goalToCreate.steps.reduce((prev, curr) => (+prev.id > +curr.id) ? prev : curr);
            index = nextIndex;
        }
        const newStep = { ...initialStep, stepIndex: index };
        setGoalToCreate(prev => {
            prev.steps = [...prev.steps, newStep]
            return prev
        })
    }

    return (
        <div style={{ position: 'relative' }}>
            <Grid container spacing={1} style={{ padding: '5%' }}>
                <Grid item xs={6} justifyContent='flex-start' >
                    <h1 style={{ paddingLeft: '6%' }}>{id ? 'Edit' : 'New'} Goal</h1>
                </ Grid>
                <Grid item xs={6} style={{ textAlign: 'right' }}>
                    <Button onClick={saveGoal} style={{ backgroundColor: 'lightGreen' }}>Save</Button>
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
                <Grid item xs={9} style={{ marginTop: '4%' }}>
                    <IconButton onClick={addStep} style={{ width: '50px', backgroundColor: 'grey' }}>+</ IconButton>
                    {goalToCreate?.steps?.length ?
                        <FormControl style={{ width: '90%' }}>
                            <InputLabel style={{ marginLeft: '2%' }}>Steps</InputLabel>
                            {goalToCreate.steps.map((step, index) => {
                                return <CreateStep key={step?._id ? step._id : index} step={id ? step : undefined} setGoal={setGoalToCreate} />
                            })}
                        </FormControl> : <span>NO STEPS</ span>}
                </Grid>
            </Grid>
        </ div>
    )
}

export default CreateGoal;