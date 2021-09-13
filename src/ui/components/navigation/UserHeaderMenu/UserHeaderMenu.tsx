import React, { useRef } from 'react';
import { Button, Divider } from '@material-ui/core';
import { UserHeaderMenuContainer, UserMenu } from './UserHeaderMenu.style';
import UserProfileAvatar from 'ui/components/data-display/UserProfileAvatar/UserProfileAvatar';
import Link from 'ui/components/navigation/Link/Link';
import { UserInterface } from 'data/@types/UserInterface';

export interface UserHeaderMenuProps {
    children?: React.ReactNode;
    user: UserInterface;
    isMenuOpen: boolean;
    onClick?: (event: React.MouseEvent) => void;
    onMenuClick?: (event: React.MouseEvent) => void;
    onMenuClose?: (event: React.MouseEvent) => void;
    onLogout?: () => void;
}

const UserHeaderMenu: React.FC<UserHeaderMenuProps> = (props) => {
    const containerRef = useRef(null);

    return (
        <UserHeaderMenuContainer ref={containerRef}>
            <Button variant={'contained'} onClick={props.onClick}>
                {props.user.nome}
            </Button>

            <UserMenu
                open={props.isMenuOpen}
                anchorEl={containerRef.current}
                onClose={props.onMenuClose}
                onClick={props.onMenuClick}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <li>
                    <Link href={'/alterar-cadastro'} mui={{ color: 'inherit' }}>
                        Alterar dados
                    </Link>
                </li>
                <li>
                    <Link
                        href={''}
                        onClick={props.onLogout}
                        mui={{ color: 'inherit' }}
                    >
                        Sair
                    </Link>
                </li>
            </UserMenu>
        </UserHeaderMenuContainer>
    );
};

export default UserHeaderMenu;
