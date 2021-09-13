import { styled } from '@material-ui/core/styles';
import { Menu } from '@material-ui/core';

// import { UserHeaderMenuProps } from './UserHeaderMenu';

export const UserHeaderMenuContainer = styled('div')`
    display: inline-block;
    i {
        font-size: ${({ theme }) => theme.typography.pxToRem(8)};
        vertical-align: middle;
    }
`;

export const UserMenu = styled(Menu)`
    .MuiMenu-paper {
        border: 2px solid ${({ theme }) => theme.palette.grey[200]};
    }

    .MuiList-root {
        padding: 0;
    }

    li {
        box-sizing: border-box;
        padding: ${({ theme }) => theme.spacing(2) + ' ' + theme.spacing(4)};
        text-align: center;
        &:hover {
            background-color: ${({ theme }) => theme.palette.grey[200]};
        }
        a {
            text-decoration: none;
        }
    }
`;
