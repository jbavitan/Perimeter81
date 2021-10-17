import axios from 'axios';
import { serverUrl } from '../CONSTS';
const usersEndpoint = '/users';


const registerUser = async (userToRegister) => {
    return await axios.post(`${serverUrl}${usersEndpoint}/register`, userToRegister);
}

const userLogin = async (user) => {
    return await axios.post(`${serverUrl}${usersEndpoint}/login`, user);
}

const getUsers = async (goalToUpdate) => {
    return await axios.post(`${serverUrl}${usersEndpoint}/`);
}

const getUser = async (fullName) => {
    return await axios.post(`${serverUrl}${usersEndpoint}/${fullName}`);
}

export {
    registerUser,
    userLogin,
    getUser,
    getUsers
}