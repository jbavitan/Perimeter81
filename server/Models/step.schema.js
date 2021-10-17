const mongoose = require('mongoose');
const Goal = require('./goal.model');

const stepSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: false
    },
    description: {
        type: String,
        required: true,
        unique: false
    },
    dueDate: {
        type: Date,
        required: true,
        unique: false
    },
    completed: {
        type: Boolean,
        required: true,
        unique: false
    },
    stepIndex: {
        type: Number,
        required: true,
        unique: false
    },
    // goal: {
    //     type: Schema.Types.ObjectId,
    //     ref: Goal
    // }
})

module.exports = stepSchema;