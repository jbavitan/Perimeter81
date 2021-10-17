import { serverUrl, stepsEndpoint } from '../CONSTS';
import customAxios from '../customAxios';

const getNextSteps = async (user) => {
    return await customAxios(user.token).get(`${serverUrl}${stepsEndpoint}/nextSteps/${user._id}`);
}

export {
    getNextSteps
}