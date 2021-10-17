import { createContext } from 'react';
const userContext = createContext({
    currUser: {}, 
    setCurrUser: () => {},
});

export default userContext;
