import React, { createContext } from 'react';
import {
    useExternalServicesReducer,
    initialState,
    ExternalServiceReducerInterface,
} from 'data/reducers/ExternalServicesReducer';

const initialValue: ExternalServiceReducerInterface = {
    externalServicesState: initialState,
    externalServicesDispatch: () => {
        /**/
    },
};

export interface ExternalServicesProviderProps {
    children: React.ReactNode;
}

export const ExternalServicesContext = createContext(initialValue);

export const ExternalServicesProvider: React.FC<ExternalServicesProviderProps> = ({
    children,
}) => {
    const reducer = useExternalServicesReducer();
    return (
        <ExternalServicesContext.Provider value={reducer}>
            {children}
        </ExternalServicesContext.Provider>
    );
};
