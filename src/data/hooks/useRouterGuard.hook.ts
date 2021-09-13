import { useEffect } from 'react';
import { useRouter, NextRouter } from 'next/router';
import { UserInterface } from 'data/@types/UserInterface';
import { useCallback } from 'react-transition-group/node_modules/@types/react';

export const privateRoutes = [
    '/alterar-cadastro',
    '/cadastro-objeto',
    '/devolucao',
    '/gerenciamento-objetos',
];

export const annonymousRoutes = ['/cadastro-usuario', '/login', '/'];

export default function useRouterGuard(
    user: UserInterface,
    isLogging: boolean
): NextRouter {
    const router = useRouter();
    const isLogged = user?.nome?.length > 0;

    useEffect(() => {
        handleNavigation(router.route);

        router.events.on('routeChangeStart', handleNavigation);

        return () => {
            router.events.off('routeChangeStart', handleNavigation);
        };
    }, [router, isLogged, isLogging]);

    function handleNavigation(url: string) {
        if (!isLogging) {
            if (privateRoutes.includes(url) && !isLogged) {
                router.replace('/login');
                return;
            }
            if (annonymousRoutes.includes(url) && isLogged) {
                router.replace('/gerenciamento-objetos');
                return;
            }
        }
    }

    return router;
}
