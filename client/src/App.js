import './App.css';
import React, { useState } from 'react';
import { Router, Route, Redirect } from 'react-router-dom';
import GoalList from './components/GoalList';
import CreateGoal from './components/CreateGoal';
import GoalDetails from './components/GoalDetails';
import history from './history';
import NextSteps from './components/NextSteps';
import Navbar from './components/Navbar';
import UserLogin from './components/UserLogin';
import userContext from './userContex';

const App = () => {
  const [goalSelected, setGoalSelected] = useState({});
  const [currUser, setCurrUser] = useState({});

  return (
    <userContext.Provider value={{ currUser, setCurrUser }}>
      <div>{currUser.fullName && <Navbar />}</div>
      <Router history={history}>
        <br /><br /><br />
        <Route path="/goals" exact >
          <GoalList setGoalSelected={setGoalSelected} />
        </ Route>
        <Route path="/goal/:id" exact >
          <GoalDetails goal={goalSelected} />
        </ Route>
        <Route path="/newGoal/:id?" component={CreateGoal} />
        <Route path="/nextSteps" component={NextSteps} />
        <Route path="/userLogin" >
          <UserLogin />
        </ Route>
        <Route exact path="/">
          <Redirect to="/userLogin" />
        </Route>
      </Router>
    </userContext.Provider >
  );
}

export default App;
