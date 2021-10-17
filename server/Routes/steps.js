const router = require('express').Router();
const mongoose = require('mongoose');
const Goal = require('../Models/goal.model');
const Step = require('../Models/step.schema');
const { formatListDate } = require('../Services/dateService');

// Get next uncompleted step for each goal
router.get('/nextSteps/:user', async (req, res) => {
    try {
        let goals = await Goal.aggregate([
            { $match: { user: new mongoose.Types.ObjectId(req.params.user) } },
            { $unwind: "$steps" },
            { $match: { "steps.completed": false } }
        ]);

        goals = [...(formatListDate(goals))];
        let tempGoals = {};
        for (const goal of goals) {
            if (tempGoals[goal._id]) {
                if (tempGoals[goal._id].stepIndex > goal.steps.stepIndex) {
                    tempGoals[goal._id].step = goal.steps
                }
            } else {
                const temp = await Goal.findOne({ _id: goal._id }).select('_id name');
                tempGoals[goal._id] = { name: temp._doc.name, step: goal.steps }
            }
        };
        let uncompletedList = [];
        Object.keys(tempGoals).forEach(key => {
            uncompletedList = [...uncompletedList, { goal: { id: key, name: tempGoals[key].name }, nextStep: tempGoals[key].step }]
        })

        res.json(uncompletedList);
    } catch (error) {
        res.status(400).json(`Error occured: ${error}`);
    }
})

// Create Step
router.post('/addStep/:id', async (req, res) => {
    try {
        const { name, description, dueDate, completed, stepIndex } = req.body;

        const newStep = {
            name,
            description,
            completed,
            dueDate: Date.parse(dueDate),
            stepIndex
        };

        await Goal.findOneAndUpdate({ _id: req.params.id }, { $push: { steps: newStep } });
        res.json(newStep);
    } catch (error) {
        res.status(400).json(`Error occured: ${error}`);
    }
});

// Update step
router.post('/updateStep/:id/:stepIndex', async (req, res) => {
    try {
        const { name, description, dueDate, completed, stepIndex } = req.body;

        const updatedStep = {
            name,
            description,
            completed,
            dueDate: Date.parse(dueDate),
            stepIndex
        };

        await Goal.findOneAndUpdate({ _id: req.params.id, "steps.stepIndex": req.params.stepIndex },
            { $set: { "steps.$": updatedStep } });
        res.json(updatedStep);
    } catch (error) {
        res.status(400).json(`Error occured: ${error}`);
    }
});

// Complete step
router.post('/completeStep/:id/:stepIndex', async (req, res) => {
    try {
        await Goal.findOneAndUpdate({ _id: req.params.id, "steps.stepIndex": req.params.stepIndex },
            { $set: { "steps.$.completed": true } });
        res.json('The Step has been successfully completed');
    } catch (error) {
        res.status(400).json(`Error occured: ${error}`);
    }
});

// router.route('/').get(async (req, res) => {
//     try {
//         const steps = await Step.find().populate('goal', 'name');
//         res.json(steps);
//     } catch (error) {
//         res.status(400).json(`Error occured: ${error}`);
//     }
// })

// router.route('/:id').get(async (req, res) => {
//     try {
//         const step = await Step.findById(req.params.id).populate('goal', 'name');
//         res.json(step);
//     } catch (error) {
//         res.status(400).json(`Error occured: ${error}`);
//     }
// })

// router.route('/byGoalId/:goal').get(async (req, res) => {
//     try {
//         const steps = await Step.find({ goal: req.params.goal });
//         res.json(steps);
//     } catch (error) {
//         res.status(400).json(`Error occured: ${error}`);
//     }
// })

// router.route('/nextStep/:goal').get(async (req, res) => {
//     try {
//         const stepCompleted = await Step.find({ completed: false, goal: req.params.goal }).sort({ stepIndex: 1 }).limit(1).populate('goal', 'name');
//         res.json(stepCompleted[0]);
//     } catch (error) {
//         res.status(400).json(`Error occured: ${error}`);
//     }
// })

// router.route('/add').post(async (req, res) => {
//     try {
//         const { name, description, dueDate, completed, goal, stepIndex } = req.body;

//         const newStep = new Step({
//             name,
//             description,
//             completed,
//             goal,
//             stepIndex,
//             dueDate: Date.parse(dueDate)
//         });

//         const savedStep = await newStep.save();
//         res.json(savedStep);
//     } catch (error) {
//         res.status(400).json(`Error occured: ${error}`);
//     }
// });

// router.route('/:id').delete(async (req, res) => {
//     try {
//         await Step.findByIdAndDelete(req.params.id);
//         res.json('The step has been deleted.');
//     } catch (error) {
//         res.status(400).json(`Error occured: ${error}`);
//     }
// })

// router.route('/update/:id').post(async (req, res) => {
//     try {
//         const stepToUpdate = await Step.findById(req.params.id);
//         const { name, description, dueDate, completed, goal, stepIndex } = req.body;

//         stepToUpdate.name = name;
//         stepToUpdate.description = description;
//         stepToUpdate.dueDate = Date.parse(dueDate);
//         stepToUpdate.completed = completed;
//         stepToUpdate.goal = goal;
//         stepToUpdate.stepIndex = stepIndex;

//         const updatedStep = await stepToUpdate.save();
//         res.json(updatedStep);
//     } catch (error) {
//         res.status(400).json(`Error occured: ${error}`);
//     }
// });

// router.route('/complete/:id').post(async (req, res) => {
//     try {
//         await Step.findByIdAndUpdate({ _id: req.params.id }, { completed: true });
//         res.json('The step has been completed. Great Job!');
//     } catch (error) {
//         res.status(400).json(`Error occured: ${error}`);
//     }
// });

module.exports = router;