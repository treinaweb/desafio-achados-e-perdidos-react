import React, { useContext, useEffect } from 'react';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import Head from 'next/head';
import { CircularProgress, Container, ThemeProvider } from '@material-ui/core';

import '@styles/globals.css';
import { AppContainer } from '@styles/pages/_app.styled';
import useRouterGuard, { privateRoutes } from 'data/hooks/useRouterGuard.hook';
import theme from 'ui/themes/theme';
import Header from 'ui/components/surfaces/Header/Header';
import { UserContext } from 'data/contexts/UserContext';
import { MainProvider } from 'data/contexts/MainContext';
import { LoginService } from 'data/services/LoginService';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
    const { userState } = useContext(UserContext);
    const router = useRouterGuard(userState.user, userState.isLogging);

    useEffect(() => {
        // Remove the server-side injected CSS.
        document.querySelector('#jss-server-side')?.remove();
    }, []);

    function canShow(): boolean {
        if (privateRoutes.includes(router.pathname)) {
            if (userState.isLogging) {
                return false;
            } else {
                return userState.user?.nome?.length > 0;
            }
        }
        return true;
    }

    function onLogout() {
        LoginService.logout();
        window.location.reload();
    }

    return (
        <>
            <Head>
                <title>
                    Achados e Perdidos{' '}
                    {pageProps?.title && `- ${pageProps?.title}`}
                </title>
            </Head>
            <ThemeProvider theme={theme}>
                <AppContainer>
                    <Header user={userState.user} onLogout={onLogout} />
                    <main>
                        {canShow() ? (
                            <Component {...pageProps} />
                        ) : (
                            <Container sx={{ textAlign: 'center', my: 10 }}>
                                <CircularProgress />
                            </Container>
                        )}
                    </main>
                </AppContainer>
            </ThemeProvider>
        </>
    );
};

const AppProviderContainer: React.FC<AppProps> = (props) => {
    return (
        <MainProvider>
            <App {...props} />
        </MainProvider>
    );
};

export default AppProviderContainer;
