import React from 'react';
import { FormLabel } from '@material-ui/core';

const Step = (props) => {
    const { stepDetails } = props;

    return (
        stepDetails && <ul style={{ textAlign: 'left', listStyle: 'none' }}>
            <li>
                <h4>{stepDetails.name}</h4>
            </ li>
            <li>
                <FormLabel style={{ fontWeight: 'bold' }}>Descripion: </FormLabel>
                <span>{stepDetails.description}</span>
            </ li>
            <li>
                <FormLabel style={{ fontWeight: 'bold' }}>Due Date: </FormLabel>
                <span>{stepDetails.dueDate}</span>
            </ li>
            <li>
                <FormLabel style={{ fontWeight: 'bold' }}>Completed: </FormLabel>
                <span>{stepDetails.completed ? 'Yes' : 'No'}</span>

            </ li>
        </ul >
    )
}

export default Step;