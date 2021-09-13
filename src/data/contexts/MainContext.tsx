import React from 'react';

import { ExternalServicesProvider } from './ExternalServicesContext';
import { UserProvider } from './UserContext';

export interface MainProviderProps {
    children: React.ReactNode;
}

export const MainProvider: React.FC<MainProviderProps> = ({ children }) => {
    return (
        <>
            <ExternalServicesProvider>
                <UserProvider>{children}</UserProvider>
            </ExternalServicesProvider>
        </>
    );
};
