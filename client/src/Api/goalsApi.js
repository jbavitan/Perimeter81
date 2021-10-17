import { createEndpoint, goalsEndpoint, serverUrl, updateEndpoint } from '../CONSTS';
import customAxios from '../customAxios';

const getGoals = async (user) => {
    try {
        return await customAxios(user.token).get(`${serverUrl}${goalsEndpoint}/all/${user._id}`);
    } catch (error) {
        throw new Error(error)
    }
}

const getGoal = async (goalId, user) => {
    try {
        return await customAxios(user.token).get(`${serverUrl}${goalsEndpoint}/single/${goalId}/${user._id}`);
    } catch (error) {
        throw new Error(error)
    }
}

const addGoal = async (goalToAdd, user) => {
    try {
        return await customAxios(user.token).post(`${serverUrl}${goalsEndpoint}/${createEndpoint}`, goalToAdd);
    } catch (error) {
        throw new Error(error)
    }
}

const updateGoal = async (goalToUpdate, user) => {
    try {
        return await customAxios(user.token).post(`${serverUrl}${goalsEndpoint}${updateEndpoint}`, goalToUpdate);
    } catch (error) {
        throw new Error(error)
    }
}

export {
    getGoals,
    getGoal,
    addGoal,
    updateGoal
}