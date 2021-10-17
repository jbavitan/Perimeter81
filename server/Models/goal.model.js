const mongoose = require('mongoose');
const Step = require('./step.schema');
const User = require('./user.model');

const goalSchema = new mongoose.Schema({
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
    steps: {
        type: [Step],
        required: true,
        unique: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true,
        unique: false
    }
})

const Goal = mongoose.model('goals', goalSchema);

module.exports = Goal;