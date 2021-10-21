const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const auth = require("./Middleware/auth");

require('dotenv').config();

app.use(express.json());
app.use(cors());

const dbConnection = process.env.DB_Connection;
mongoose.connect(dbConnection);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log(`We're connected to MongoDB!`)
})

const goalsRouter = require('./Routes/goals');
const stepsRouter = require('./Routes/steps');
const usersRouter = require('./Routes/users');

app.use('/goals', auth, goalsRouter);
app.use('/steps', auth, stepsRouter);
app.use('/users', usersRouter);

app.listen(process.env.port, () => {
    console.log(`listening on port ${process.env.port}`);
})