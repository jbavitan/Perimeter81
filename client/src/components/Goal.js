import React from 'react';
import { FormLabel } from '@material-ui/core';

const Goal = (props) => {
    const { goalDetails } = props;

    return (
        <ul style={{textAlign: 'center', listStyle: 'none', padding: '0'}}>
            <li>
                <h2>{goalDetails.name}</h2>
            </ li>
            <li>
                <FormLabel style={{ fontWeight: 'bold' }}>Due Date: </FormLabel>
                <span>{goalDetails.dueDate}</span>
            </ li>
        </ul >
    )
}

export default Goal;