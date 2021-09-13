import React from 'react';
import { Button, Grid, Typography, Skeleton } from '@material-ui/core';
import { UserAvatar, AvatarIcon } from './UserProfileAvatar.style';
import { UserInterface } from 'data/@types/UserInterface';

export interface UserProfileAvatarProps {
    children?: React.ReactNode;
    user: UserInterface;
    onClick?: (event: React.MouseEvent) => void;
}

const UserProfileAvatar: React.FC<UserProfileAvatarProps> = (props) => {
    const hasUser = props.user?.nome?.length > 0;
    return (
        <Button color={'inherit'} onClick={props.onClick}>
            <Grid container spacing={1} wrap="nowrap">
                <Grid item>
                    {hasUser ? (
                        <UserAvatar alt={props.user.nome} src={''}>
                            {props.user.nome.substring(0, 1)}
                        </UserAvatar>
                    ) : (
                        <Skeleton
                            variant={'circular'}
                            width={40}
                            height={40}
                            animation={'wave'}
                        />
                    )}
                </Grid>
                <Grid item container spacing={1} alignItems={'center'}>
                    <Grid item>
                        {hasUser ? (
                            <Typography variant={'body2'} noWrap>
                                {props.user.nome}
                            </Typography>
                        ) : (
                            <Skeleton
                                variant={'text'}
                                width={100}
                                animation={'wave'}
                            />
                        )}
                    </Grid>
                    <Grid item>
                        <AvatarIcon className="twf-caret-down" {...props} />
                    </Grid>
                </Grid>
            </Grid>
        </Button>
    );
};

export default UserProfileAvatar;
