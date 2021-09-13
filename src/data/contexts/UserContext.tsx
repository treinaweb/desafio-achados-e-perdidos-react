import React, { createContext } from 'react';
import {
    useUserReducer,
    initialState,
    UserReducerInterface,
} from 'data/reducers/UserReducer';

const initialValue: UserReducerInterface = {
    userState: initialState,
    userDispatch: () => {
        /**/
    },
};

export interface UserProviderProps {
    children: React.ReactNode;
}

export const UserContext = createContext(initialValue);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const reducer = useUserReducer();
    return (
        <UserContext.Provider value={reducer}>{children}</UserContext.Provider>
    );
};
