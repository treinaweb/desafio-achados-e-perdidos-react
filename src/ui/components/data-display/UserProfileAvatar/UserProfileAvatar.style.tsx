import { styled } from '@mui/material/styles';
import { Avatar } from '@mui/material';
import { UserProfileAvatarProps } from './UserProfileAvatar';

export const UserAvatar = styled(Avatar)`
    border: 2px solid currentColor;
`;

export const AvatarIcon = styled('i')<UserProfileAvatarProps>`
    font-size: ${({ theme }) => theme.typography.pxToRem(8)};
    vertical-align: middle;
    display: ${({ user }) => (user?.nome ? 'initial' : 'none')};
`;
