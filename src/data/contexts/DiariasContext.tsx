import {
    DiariaReducerInterface,
    initialState,
    useDiariaReducer,
} from 'data/reducers/DiariasReducer';
import React, { createContext } from 'react';

const initialValue: DiariaReducerInterface = {
    diariaState: initialState,
    diariaDispatch: () => {
        /**/
    },
};

export interface DiariaProviderProps {
    children: React.ReactNode;
}

export const DiariaContext = createContext(initialValue);

export const DiariaProvider: React.FC<DiariaProviderProps> = ({ children }) => {
    const reducer = useDiariaReducer();
    return (
        <DiariaContext.Provider value={reducer}>
            {children}
        </DiariaContext.Provider>
    );
};
