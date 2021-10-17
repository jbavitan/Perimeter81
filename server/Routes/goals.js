const router = require('express').Router();
const Goal = require('../Models/goal.model');
const { formatObjDate, formatListDate } = require('../Services/dateService');

// Get all goals
router.get('/all/:user', async (req, res) => {
    try {
        const { user } = req.params;
        let goals = await Goal.find({ user });
        goals = [...(formatListDate(goals))];
        res.json(goals);
    } catch (error) {
        res.status(400).json(`Error occured: ${error}`);
    }
})

// Get specific goal
router.get('/single/:id/:user', async (req, res) => {
    try {
        const { id, user } = req.params;
        const goal = await Goal.findOne({ _id: id, user });
        goal._doc = formatObjDate(goal._doc);
        res.json(goal);
    } catch (error) {
        res.status(400).json(`Error occured: ${error}`);
    }
})

// Create Goal
router.post('/add', async (req, res) => {
    try {
        const { name, description, dueDate, completed, steps, user } = req.body;

        const newGoal = new Goal({
            name,
            description,
            completed,
            dueDate: Date.parse(dueDate),
            steps: steps.map(step => {
                step.dueDate = Date.parse(step.dueDate);
                return step;
            }),
            user
        });

        const savedGoal = await newGoal.save();
        res.json(savedGoal);
    } catch (error) {
        res.status(400).json(`Error occured: ${error}`);
    }
});

// Delete goal
router.delete('/:id', async (req, res) => {
    try {
        await Goal.findOneAndDelete({ _id: req.params.id});
        res.json('The step has been deleted.');
    } catch (error) {
        res.status(400).json(`Error occured: ${error}`);
    }
})

// Update goal
router.post('/update', async (req, res) => {
    try {
        const { _id, name, description, dueDate, completed, steps, user } = req.body;

        goalToUpdate = {
            _id,
            name,
            description,
            dueDate: Date.parse(dueDate),
            completed,
            steps: steps.map(step => {
                step.dueDate = Date.parse(step.dueDate)
                return step;
            }),
            user
        }

        const updatedGoal = await Goal.findOneAndUpdate({ _id, user: req.body.user }, goalToUpdate);
        res.json(updatedGoal);
    } catch (error) {
        res.status(400).json(`Error occured: ${error}`);
    }
});

// Complete goal
router.post('/complete/:id/:user', async (req, res) => {
    try {
        const { id, user } = req.params;
        await Goal.findOneAndUpdate({ _id: id, user }, { completed: true });
        res.json('The goal has been completed. Great Job!');
    } catch (error) {
        res.status(400).json(`Error occured: ${error}`);
    }
});

module.exports = router;