import React, { useEffect, useState } from 'react';
import { Checkbox, FormLabel, Grid, FormControl, InputLabel, Input, FormControlLabel } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider, } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const CreateStep = (props) => {
    const { step, setGoal } = props;

    // useEffect(() => {
    //     setStepToCreate(step)
    // }, [step])

    // if (stepToCreate) setSteps((prev) => {
    //     const foundIndex = prev.findIndex(step => step.stepIndex == stepToCreate.stepIndex);
    //     if (foundIndex !== -1) prev[foundIndex] = stepToCreate;
    //     return prev;
    // })

    const setField = (field, value) => {
        setGoal((prev) => {
            let tempSteps = [...prev.steps];
            const foundIndex = tempSteps.findIndex((currStep) => currStep.stepIndex === step.stepIndex);
            tempSteps[foundIndex][field] = value;
            prev.steps = [...tempSteps];
            return prev;
        })
    }

    return (
        <>
            {step && <Grid container spacing={1} style={{ padding: '5%' }}>
                <Grid item xs={4}>
                    <FormControl>
                        <InputLabel >Name</InputLabel>
                        <Input value={step.name} onChange={(event) => setField('name', event.target.value)} />
                    </FormControl>
                </Grid>
                <Grid item xs={7}>
                    <FormControl style={{ width: '90%' }}>
                        <InputLabel >Description</InputLabel>
                        <Input value={step.description} onChange={(event) => setField('description', event.target.value)} />
                    </FormControl>
                </Grid>
                <Grid item xs={5} style={{ marginTop: '4%' }}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <FormControlLabel
                            labelPlacement='start'
                            label="Due Date"
                            control={<DatePicker style={{ marginLeft: '2%' }} value={step.dueDate} onChange={(event) => setField('dueDate', event)} />}
                        />
                    </ MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={4} style={{ marginTop: '4%' }}>
                    <FormControlLabel
                        labelPlacement='start'
                        control={<Checkbox checked={step.completed} onChange={(event) => setField('completed', event.target.checked)} />}
                        label="Completed"
                    />
                </Grid>
            </Grid>}
        </>
    )
}

export default CreateStep;