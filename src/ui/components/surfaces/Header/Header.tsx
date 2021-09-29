import React, { useState, useEffect } from 'react';
import {
    IconButton,
    Toolbar,
    Container,
    MenuList,
    MenuItem,
    Divider,
    Button,
    useTheme,
    useMediaQuery,
    Box
} from '@mui/material';
import {
    HeaderAppBar,
    HeaderLogo,
    HeaderDrawer,
    ButtonsContainer,
} from './Header.style';
import Link from 'ui/components/navigation/Link/Link';
import UserHeaderMenu from 'ui/components/navigation/UserHeaderMenu/UserHeaderMenu';
import UserProfileAvatar from 'ui/components/data-display/UserProfileAvatar/UserProfileAvatar';
import { UserInterface } from 'data/@types/UserInterface';
import useIsMobile from 'data/hooks/useIsMobile';

export interface HeaderProps {
    children?: React.ReactNode;
    user: UserInterface;
    onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = (props) => {
    const [isMenuOpen, setMenuOpen] = useState(false),
        hasUser = props.user?.nome?.length > 0,
        isMobile = useIsMobile();

    useEffect(() => {
        if (!hasUser) {
            setMenuOpen(false);
        }
    }, [hasUser]);

    return (
        <HeaderAppBar>
            <Toolbar component={Container}>
                <Link href="/">
                    <HeaderLogo
                        src={'/img/logos/logo.svg'}
                        alt={'Achados e Perdidos'}
                    />
                </Link>

                {hasUser ? (
                    <UserHeaderMenu
                        user={{ ...props.user }}
                        isMenuOpen={isMenuOpen}
                        onClick={() => setMenuOpen(true)}
                        onMenuClick={() => setMenuOpen(false)}
                        onMenuClose={() => setMenuOpen(false)}
                        onLogout={props.onLogout}
                    />
                ) : (
                    <Box sx={{ display: 'flex' }}>
                        <Link
                            href={'/login'}
                            Component={Button}
                            mui={{
                                size: isMobile ? 'small' : 'medium',
                            }}
                        >
                            Login
                        </Link>
                        <Link
                            href={'/cadastro-usuario'}
                            Component={Button}
                            mui={{
                                color: 'primary',
                                variant: 'contained',
                                size: isMobile ? 'small' : 'medium',
                            }}
                        >
                            Cadastrar-se
                        </Link>
                    </Box>
                )}
            </Toolbar>
        </HeaderAppBar>
    );
};

export default Header;
